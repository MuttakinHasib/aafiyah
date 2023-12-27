import { CoreEntity } from '@app/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address extends CoreEntity {
  @ApiProperty({ example: 'Muttakin Islam Hasib' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'muttakinislamhasib@gmail.com' })
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+8801315873250' })
  @Column()
  @IsPhoneNumber('BD')
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'Aafiyah' })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: 'Bangladesh' })
  @Column()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '715 Fake Street' })
  @Column()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiPropertyOptional({ example: 'Floor: #12' })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  apartment?: string;

  @ApiProperty({ example: 'Mirpur' })
  @Column()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Dhaka' })
  @Column()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 1234 })
  @Column()
  @IsNumberString()
  @IsNotEmpty()
  postcode: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { nullable: false })
  @JoinTable({ name: 'userId' })
  user: User;
}
