import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto extends Category {
  @ApiPropertyOptional({ example: 'a8350a37-8d6c-491b-8439-2951ea4fbbe1' })
  @IsString()
  @IsOptional()
  parentId?: string;
}
