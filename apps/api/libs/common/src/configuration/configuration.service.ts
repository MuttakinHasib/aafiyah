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

  get ADMIN_URL() {
    return this.configService.get<string>('ADMIN_URL');
  }

  get POSTGRES_DB_URL() {
    return this.configService.get<string>('POSTGRES_DB_URL');
  }

  get SESSION_SECRET_KEY() {
    return this.configService.get<string>('SESSION_SECRET_KEY');
  }

  get JWT_SECRET_KEY() {
    return this.configService.get<string>('JWT_SECRET_KEY');
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

  get EMAIL_USER() {
    return this.configService.get<string>('EMAIL_USER');
  }

  get ADMIN_EMAIL_USER() {
    return this.configService.get<string>('ADMIN_EMAIL_USER');
  }

  get EMAIL_APP_PASSWORD() {
    return this.configService.get<string>('EMAIL_APP_PASSWORD');
  }

  get GOOGLE_CLIENT_ID() {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }

  get GOOGLE_CLIENT_SECRET() {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  }

  get GOOGLE_REFRESH_TOKEN() {
    return this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
  }
}
