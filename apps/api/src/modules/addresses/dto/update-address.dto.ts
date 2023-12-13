import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Address } from '../entities/address.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(Address) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id?: string;
}
