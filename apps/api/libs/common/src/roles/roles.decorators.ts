import { SetMetadata } from '@nestjs/common';
import { Role } from '.';

export const Permission = (...roles: Role[]) => SetMetadata('roles', roles);
