import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres',
        url: configurationService.POSTGRES_DB_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
