import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class AccountActivateDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
