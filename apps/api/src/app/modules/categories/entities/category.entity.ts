import { CoreEntity } from '@aafiyah/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category extends CoreEntity {
  @ApiProperty({ example: 'Category 1' })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Category 1' })
  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ unique: true })
  slug: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  @IsOptional()
  parent?: Category;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];
}
