import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { createHash } from '../../utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) throw new ConflictException('User already exists');

    createUserDto.password = await createHash(createUserDto.password);

    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto)
    );

    delete user.password;
    return user;
  }

  async findOne(options: FindOneOptions<User>) {
    return await this.userRepository.findOneOrFail(options);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.save({ id, ...updateUserDto });
    return 'User profile has been updated';
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return 'User has been deleted';
  }
}
