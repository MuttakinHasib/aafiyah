import { ConfigurationService } from '@app/common';
import { SendConfirmationEmail } from '@app/types';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async sendConfirmationEmail(payload: SendConfirmationEmail): Promise<void> {
    const link = `${this.configurationService.WEB_URL}/account?token=${payload.token}`;

    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Confirm your email address',
      template: 'email-verification',
      context: {
        name: payload.name,
        link,
      },
    });
  }
}
