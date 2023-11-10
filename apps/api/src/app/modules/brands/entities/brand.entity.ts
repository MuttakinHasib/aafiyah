import { CoreEntity } from '@aafiyah/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Brand extends CoreEntity {
  @ApiProperty({ example: 'Brand 1' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @Column()
  @IsUrl()
  @IsNotEmpty()
  logo: string;

  @ApiProperty({ example: 'https://example.com/' })
  @Column()
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
