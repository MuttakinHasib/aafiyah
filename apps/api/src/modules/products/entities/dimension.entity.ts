import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class Dimension {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  length?: number;
}
