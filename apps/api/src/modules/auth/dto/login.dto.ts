import { PickType } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class LoginDto extends PickType(User, ['email', 'password']) {}
