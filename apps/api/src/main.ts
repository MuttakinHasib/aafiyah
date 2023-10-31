import 'colors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigurationService } from '@aafiyah/common';
import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import session from 'express-session';
import PostgresStore from 'connect-pg-simple';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const pgSession = PostgresStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService =
    app.get<ConfigurationService>(ConfigurationService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors({
    credentials: true,
    origin: [configurationService.WEB_URL],
  });

  app.use(helmet());

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle(
      `${configurationService.APP_NAME} - An Islamic E-Commerce Web Application`
    )
    .setDescription(`${configurationService.APP_NAME} API description`)
    .setVersion('1.0')
    .addServer(configurationService.API_URL)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    session({
      secret: configurationService.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
      store: new pgSession({
        conString: process.env.POSTGRES_DB_URL,
        createTableIfMissing: true,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Alhamdulillah! Application is running on: ${await app.getUrl()}`.bgCyan
      .black
  );
}

bootstrap();
