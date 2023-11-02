import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get APP_NAME() {
    return this.configService.get<string>('APP_NAME');
  }

  get API_URL() {
    return this.configService.get<string>('NEXT_PUBLIC_API_URL');
  }

  get WEB_URL() {
    return this.configService.get<string>('WEB_URL');
  }

  get POSTGRES_DB_URL() {
    return this.configService.get<string>('POSTGRES_DB_URL');
  }

  get SESSION_SECRET_KEY() {
    return this.configService.get<string>('SESSION_SECRET_KEY');
  }

  get CLOUDINARY_CLOUD_NAME() {
    return this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
  }

  get CLOUDINARY_API_KEY() {
    return this.configService.get<string>('CLOUDINARY_API_KEY');
  }

  get CLOUDINARY_API_SECRET() {
    return this.configService.get<string>('CLOUDINARY_API_SECRET');
  }
}
