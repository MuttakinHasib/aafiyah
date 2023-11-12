import { ConfigurationService } from '@aafiyah/common';
import { Global, Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (
        configurationService: ConfigurationService
      ): Promise<MailerOptions> => {
        return {
          transport: {
            service: 'gmail',
            auth: {
              user: configurationService.EMAIL_USER,
              pass: configurationService.EMAIL_APP_PASSWORD,
            },
          },
          defaults: {
            from: `"${configurationService.APP_NAME}" <${configurationService.EMAIL_USER}>`,
          },
          template: {
            dir: join(__dirname, 'assets', 'templates'),
            adapter: new HandlebarsAdapter(),

            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigurationService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MailModule {}
