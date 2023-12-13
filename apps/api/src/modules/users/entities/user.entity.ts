import * as bcrypt from 'bcryptjs';
import { CoreEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class User extends CoreEntity {
  @ApiPropertyOptional()
  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 'Muttakin Islam Hasib' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'MuttakinHasib' })
  @Column({ unique: true, nullable: true })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ example: 'muttakinislamhasib@gmail.com' })
  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: '+8801315873250' })
  @Column({ nullable: true })
  @IsPhoneNumber('BD')
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'customer' })
  @Column({ default: 'customer' })
  @IsString()
  @IsOptional()
  role?: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export class UserWithoutPassword extends OmitType(User, ['password']) {}
