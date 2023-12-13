import { Module, forwardRef } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
