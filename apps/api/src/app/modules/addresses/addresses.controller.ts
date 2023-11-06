import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { User } from '@aafiyah/common';
import { UsersService } from '../users/users.service';

@ApiTags('Address')
@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly userService: UsersService
  ) {}

  @ApiOperation({ summary: 'Create address' })
  @ApiCreatedResponse({ description: 'Address has been successfully created.' })
  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @User() { id }: User
  ) {
    const user = await this.userService.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    createAddressDto.user = user;

    return await this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
