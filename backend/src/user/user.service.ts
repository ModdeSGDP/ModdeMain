import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { Mode } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';
import { InviteAdminDto } from './dto/invite-admin.dto';
import { AdminInvite } from './schemas/admin-invite.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AdminInvite.name) private inviteModel: Model<AdminInvite>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password, firstName, lastName, role, address, gender, retailerId } = registerUserDto;

    // Check if the username already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User by this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new this.userModel({ 
      email, 
      password: hashedPassword,
      firstName,
      lastName,
      role,
      address,
      gender,
      retailerId 
    });
    return newUser.save();
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    // If email is being updated, check if it's unique
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({ email: updateUserDto.email });

      // If another user already has this email, and it's not the current user
      if (existingUser && existingUser._id.toString() !== id) {
        throw new ConflictException('Email is already taken');
      }
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  
  async findUserByUsername(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Invite Admin Logic
  async inviteAdmin(inviteAdminDto: InviteAdminDto): Promise<{ message: string }> {
    const { email } = inviteAdminDto;

    

    // Check if an invitation already exists
    const existingInvite = await this.inviteModel.findOne({ email });
    if (existingInvite) {
      throw new ConflictException('An invitation has already been sent to this email.');
    }

    // Generate an invitation token
    const token = this.jwtService.sign({ email }, { expiresIn: '24h' });

    // Store the invite in MongoDB
    await this.inviteModel.create({ email, token });

    // Generate the invite link
    const inviteLink = `https://your-domain.com/admin/accept?token=${token}`;

    // Send the email using EmailService
    const subject = 'Admin Invitation';
    const html = `
      <p>You have been invited to join our admin panel.</p>
      <p>Click the link below to accept your invitation:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await this.emailService.sendEmail(email, subject, undefined, html);

    return { message: 'Admin invitation sent successfully!' };
  }
}

