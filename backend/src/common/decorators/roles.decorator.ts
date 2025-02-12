import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants/roles';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);