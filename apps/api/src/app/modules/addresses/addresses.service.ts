import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<string> {
    if (createAddressDto.isDefault) {
      await this.updateExistingDefaultAddress();
    }
    await this.addressRepository.save(createAddressDto);
    return 'Address has been successfully created.';
  }

  async findAll(id: string): Promise<Address[]> {
    return await this.addressRepository.find({
      where: { user: { id } },
      order: { isDefault: 'DESC' },
    });
  }

  async findOne(where: FindOptionsWhere<Address>) {
    return await this.addressRepository.findOne({ where });
  }

  async update(updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({
      where: { id: updateAddressDto.id },
    });

    if (!address) throw new NotFoundException('Address not found');
    if (updateAddressDto.isDefault) {
      await this.updateExistingDefaultAddress();
    }

    Object.assign(address, {
      ...updateAddressDto,
    });

    await this.addressRepository.save(address);

    return 'Address has been successfully updated.';
  }

  async remove(id: string) {
    await this.addressRepository.delete(id);
    return 'Address has been successfully deleted.';
  }

  async updateExistingDefaultAddress() {
    const existingDefaultAddress = await this.findOne({ isDefault: true });

    if (existingDefaultAddress) {
      existingDefaultAddress.isDefault = false;
      await this.addressRepository.save(existingDefaultAddress);
    }
  }
}
