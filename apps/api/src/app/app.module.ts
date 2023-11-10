import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule, DatabaseModule } from '@aafiyah/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
