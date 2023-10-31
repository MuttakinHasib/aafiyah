import { CoreEntity } from '@aafiyah/common';
import { Column } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class User extends CoreEntity {
  @Column()
  @IsUrl()
  @IsOptional()
  avatar: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
