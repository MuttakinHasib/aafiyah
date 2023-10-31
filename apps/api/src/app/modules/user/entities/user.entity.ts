import * as bcrypt from 'bcrypt';
import { CoreEntity } from '@aafiyah/common';
import { Column } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User extends CoreEntity {
  @ApiPropertyOptional()
  @Column()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 'Muttakin Islam Hasib' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

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

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
