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
import { Column, Entity } from 'typeorm';

class VariationOption {
  @ApiProperty({ example: 'Color' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Red' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

class Variation {
  @ApiProperty({ example: 'Size' })
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

  @ApiPropertyOptional({ example: 'dfgdfgwerw23' })
  @Column()
  @IsString()
  @IsOptional()
  slug: string;

  // @ApiProperty({ example: 'physical' })
  // @Column()
  // @IsString()
  // @IsNotEmpty()
  // type: string;

  // @ApiProperty({ type: [String], example: ['Electronics', 'Gadgets'] })
  // @Column('simple-array')
  // @IsArray()
  // categories: string[];

  // @ApiProperty({ type: [String], example: ['Tech', 'Smartphone'] })
  // @Column('simple-array')
  // @IsArray()
  // tags: string[];

  @ApiProperty({
    type: [Variation],
    example: [{ name: 'Size', options: [{ name: 'S', value: 'Small' }] }],
  })
  @Column('jsonb')
  @IsArray()
  @ValidateNested({ each: true })
  variations: Variation[];

  @ApiProperty({
    type: [VariationOption],
    example: [{ name: 'Color', value: 'Red' }],
  })
  @Column('jsonb')
  @IsArray()
  @ValidateNested({ each: true })
  variation_options: VariationOption[];

  @ApiProperty({ example: 'Online Shop' })
  @Column()
  @IsString()
  @IsNotEmpty()
  shop: string;

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

  @ApiProperty({ type: [Number], example: [10, 20, 30], required: false })
  @Column({ type: 'simple-array', nullable: true })
  @IsOptional()
  @IsArray()
  dimensions?: number[];

  @ApiProperty({ example: 'Nike' })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'product.jpg' })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    type: [String],
    example: ['Great product!', 'Highly recommended'],
  })
  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  reviews?: string[];

  @ApiProperty({ type: [String], example: ['image1.jpg', 'image2.jpg'] })
  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  gallery?: string[];

  @ApiProperty({ example: ProductStatus.DRAFT })
  @Column({ enum: ProductStatus, default: ProductStatus.DRAFT })
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
