import { pick } from 'lodash';
import {
  Body,
  Controller,
  Delete,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { User } from '@aafiyah/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Logout } from './guards/logout.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _body: LoginDto, @User() user: User) {
    return `Welcome ${user.name}`;
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Session() session) {
    const data = await this.usersService.create(createUserDto);
    const user = pick(data, [
      'id',
      'avatar',
      'username',
      'name',
      'email',
      'phone',
      'role',
    ]);

    session.passport = { user };
    return `Welcome ${user.name}! 🎉`;
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'User logged out successfully' })
  @UseGuards(Logout)
  @Delete('logout')
  async logout() {
    return 'Logged out successfully';
  }
}
