import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        POSTGRES_DB_URL: Joi.string().required(),
        SESSION_SECRET_KEY: Joi.string().required(),
        WEB_URL: Joi.string().required(),
        NEXT_PUBLIC_API_URL: Joi.string().required(),
        // CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        // CLOUDINARY_API_KEY: Joi.string().required(),
        // CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
