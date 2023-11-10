import { CoreEntity } from '@aafiyah/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Dimension } from './dimension.entity';
import { Brand } from '../../brands/entities/brand.entity';

class VariationOption {
  @ApiProperty({ example: 'Red' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '#f36' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

class Variation {
  @ApiProperty({ example: 'Color' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [VariationOption] })
  @IsArray()
  @ValidateNested({ each: true })
  options: VariationOption[];
}

export enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

@Entity()
export class Product extends CoreEntity {
  @ApiProperty({ example: 'Product 1' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product 1 description' })
  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  slug: string;

  @ApiProperty({
    type: () => [Category],
    example: [
      { id: 1, name: 'Tech' },
      { id: 2, name: 'Smartphone' },
    ],
  })
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @ApiPropertyOptional({ type: [String], example: ['Tech', 'Smartphone'] })
  @Column('simple-array')
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    type: [Variation],
    example: [{ name: 'Size', options: [{ name: 'S', value: 'Small' }] }],
  })
  @Column('jsonb')
  @IsArray()
  @ValidateNested({ each: true })
  variations: Variation[];

  @ApiProperty({ example: 'ABC123' })
  @Column()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 100 })
  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  countInStock: number;

  @ApiProperty({ example: 49.99 })
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 39.99, required: false })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  sale_price?: number;

  @ApiPropertyOptional({
    type: Dimension,
    example: { height: 1, width: 2, length: 1 },
  })
  @Column({ type: 'json', nullable: true })
  @ValidateNested({ each: true })
  @IsOptional()
  dimensions?: Dimension;

  @ApiProperty({ type: Brand, example: { id: 1, name: 'Brand 1' } })
  @ManyToOne(() => Brand, { eager: true, nullable: true })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ApiProperty({ example: 'product.jpg' })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: [String], example: ['image1.jpg', 'image2.jpg'] })
  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  gallery?: string[];

  @ApiProperty({
    type: [String],
    example: ['Great product!', 'Highly recommended'],
  })
  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  reviews?: string[];

  @ApiProperty({ example: ProductStatus.DRAFT })
  @Column({ enum: ProductStatus, default: ProductStatus.DRAFT })
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
