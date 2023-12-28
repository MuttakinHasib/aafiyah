import '@colors/colors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigurationService, NestHttpExceptionFilter } from '@app/common';
import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import session from 'express-session';
import PostgresStore from 'connect-pg-simple';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { shouldSendSameSiteNone } from 'should-send-same-site-none';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const pgSession = PostgresStore(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configurationService =
    app.get<ConfigurationService>(ConfigurationService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new NestHttpExceptionFilter());
  app.enableCors({
    credentials: true,
    origin: [configurationService.WEB_URL, configurationService.ADMIN_URL],
  });

  app.use(helmet());

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle(
      `${configurationService.APP_NAME} - An Islamic E-Commerce Web Application`,
    )
    .setDescription(`${configurationService.APP_NAME} API description`)
    .setVersion('1.0')
    .addServer(configurationService.API_URL)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(shouldSendSameSiteNone);

  app.use(
    session({
      secret: configurationService.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      store: new pgSession({
        conString: process.env.POSTGRES_DB_URL,
        createTableIfMissing: true,
      }),
    }),
  );

  app.set('trust proxy', 1);

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Alhamdulillah! Application is running on: ${await app.getUrl()}`.bgCyan
      .black,
  );
}

bootstrap();
