import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule, DatabaseModule } from '@aafiyah/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
