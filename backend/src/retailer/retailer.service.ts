import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Retailer } from './schemas/retailer.schema';
import { User } from '../user/schemas/user.schema';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class RetailerService {
  constructor(
    @InjectModel(Retailer.name) private readonly retailerModel: Model<Retailer>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createRetailerDto: CreateRetailerDto): Promise<Retailer> {
    const { email } = createRetailerDto;
    const existingRetailer = await this.retailerModel.findOne({ email }).exec();
    if(existingRetailer){
      throw new ConflictException(`Retailer with email ${email} already exists`);
    }
    const newRetailer = new this.retailerModel(createRetailerDto);
    return newRetailer.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Retailer[]; meta: any }> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const data = await this.retailerModel.find().skip(skip).limit(limit).exec();
    const total = await this.retailerModel.countDocuments();

    if(skip >= total){
      throw new BadRequestException('Page number exceeds available data');
    }

    return { 
      data, 
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    }, };
  }

  async findOne(id: string): Promise<Retailer> {
    const retailer = await this.retailerModel.findById(id).exec();
    if (!retailer) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
    return retailer;
  }

  async update(
    id: string,
    updateRetailerDto: UpdateRetailerDto,
  ): Promise<Retailer> {
    const updatedRetailer = await this.retailerModel
      .findByIdAndUpdate(id, updateRetailerDto, { new: true })
      .exec();
    if (!updatedRetailer) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
    return updatedRetailer;
  }

  async createRetailerWithAdmin(createRetailerDto: CreateRetailerDto, adminDto: RegisterUserDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Check if retailer email already exists
      const existingRetailer = await this.retailerModel.findOne({ email: createRetailerDto.email }).session(session);
      if (existingRetailer) {
        throw new ConflictException(`Retailer with email ${createRetailerDto.email} already exists`);
      }

      // Check if admin email already exists
      const existingUser = await this.userModel.findOne({ email: adminDto.email }).session(session);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Create retailer
      const retailer = new this.retailerModel(createRetailerDto);
      await retailer.save({ session });

      // Hash password for admin
      const hashedPassword = await bcrypt.hash(adminDto.password, 10);

      // Create admin user linked to retailer
      const adminUser = new this.userModel({
        email: adminDto.email,
        password: hashedPassword,
        firstName: adminDto.firstName,
        lastName: adminDto.lastName,
        role: 'admin', // Ensure this is handled in your user schema
        address: adminDto.address,
        gender: adminDto.gender,
        retailerId: retailer._id, // Link the admin to the retailer
      });

      await adminUser.save({ session });

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      return {
        message: 'Retailer and admin created successfully',
        retailer,
        adminUser,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }


}
