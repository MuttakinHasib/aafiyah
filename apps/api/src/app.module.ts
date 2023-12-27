import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConfigurationModule,
  ConfigurationService,
  DatabaseModule,
  RolesGuard,
} from '@app/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { MailModule } from '@app/mail';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressesModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    MailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configurationService: ConfigurationService) => ({
        secret: configurationService.JWT_SECRET_KEY,
        signOptions: { expiresIn: '180s' },
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule],
})
export class AppModule {}
