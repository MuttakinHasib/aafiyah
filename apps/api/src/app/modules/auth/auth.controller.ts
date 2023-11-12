import { pick } from 'lodash';
import {
  Body,
  ConflictException,
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
import { JwtService } from '@nestjs/jwt';
import { createHash } from '../../utils/hash';
import { AccountService } from '@aafiyah/mail';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
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
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne({
      where: { email: createUserDto.email },
    });

    if (user)
      throw new ConflictException(
        'Looks like you have an account already! Please log in.'
      );

    Object.assign(createUserDto, {
      password: await createHash(createUserDto.password),
    });

    const token = await this.jwtService.signAsync({ ...createUserDto });

    const payload = pick(createUserDto, ['name', 'email']);

    await this.accountService.sendConfirmationEmail({ ...payload, token });

    return `Account activation link sent to your email address: ${payload.email}`;
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'User logged out successfully' })
  @UseGuards(Logout)
  @Delete('logout')
  async logout() {
    return 'Logged out successfully';
  }
}
