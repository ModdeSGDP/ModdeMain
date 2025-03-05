import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RetailerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extract user from request
    const { retailerId } = request.body; // Extract retailerId from request body

    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException(`Only admins can perform this action. ${user.role}`);
    }

    if (!retailerId || user.retailerId !== retailerId) {
      throw new UnauthorizedException('You are not allowed to modify this retailer\'s inventory.');
    }

    return true;
  }
}
