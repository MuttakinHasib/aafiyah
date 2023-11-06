import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<string> {
    const existingDefaultAddress = await this.findOne({ default: true });

    if (existingDefaultAddress) {
      existingDefaultAddress.default = false;
      await this.addressRepository.save(existingDefaultAddress);
    }

    await this.addressRepository.save(createAddressDto);
    return 'Address has been successfully created.';
  }

  findAll() {
    return `This action returns all addresses`;
  }

  async findOne(where: FindOptionsWhere<Address>) {
    return await this.addressRepository.findOne({ where });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
