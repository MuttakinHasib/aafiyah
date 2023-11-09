import { PartialType } from '@nestjs/swagger';
import { Address } from '../entities/address.entity';

export class UpdateAddressDto extends PartialType(Address) {}
