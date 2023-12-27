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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { User } from '@app/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Logout } from './guards/logout.guard';
import { JwtService } from '@nestjs/jwt';
import { createHash } from '../../utils/hash';
import { AccountService } from '@app/mail';
import { AccountActivateDto } from './dto/activate.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly usersService: UsersService,
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
        'Looks like you have an account already! Please log in.',
      );

    Object.assign(createUserDto, {
      password: await createHash(createUserDto.password),
    });

    const token = await this.jwtService.signAsync(
      { ...createUserDto },
      { expiresIn: '5m' },
    );

    const payload = pick(createUserDto, ['name', 'email']);

    await this.accountService.sendConfirmationEmail({ ...payload, token });

    return `Account activation link sent to your email address: ${payload.email}`;
  }

  @ApiOperation({ summary: 'Activate account' })
  @ApiCreatedResponse({ description: 'Account activated successfully' })
  @Post('activate')
  async activate(
    @Body() { token }: AccountActivateDto,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: any,
  ) {
    const payload: CreateUserDto = await this.jwtService.verifyAsync(token);

    const user = await this.usersService.create(payload);

    // Create session
    session.passport = { user };

    return `Welcome ${user.name}! Your account has been activated successfully`;
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'User logged out successfully' })
  @UseGuards(Logout)
  @Delete('logout')
  async logout() {
    return 'Logged out successfully';
  }
}
