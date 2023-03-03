/**
 * startApp.
 *
 *
 * @file   This file defines the startApp function who manage the bootstrap of the application.
 * @author Gonzalo Gorgojo.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanEnv, num, str } from 'envalid';
import { AppModule } from './app.module';

async function startApp() {
  const logger = new Logger(startApp.name);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Required env variables checking
  cleanEnv(process.env, {
    APP_PORT: num(),
    APP_ENV: str(),
    APP_JWTSECRET: str(),

    //Admin user env variables
    ADMIN_USER: str(),
    ADMIN_PASSWORD: str(),

    //Postgres
    DB_USER: str(),
    DB_PASS: str(),
    DB_NAME: str(),
  });

  // Swagger integration
  const config = new DocumentBuilder()
    .setTitle('Users experience and education API')
    .setDescription(
      'API documentation for the Users experience and education microservice.',
    )
    .setVersion('1.0')
    .addTag(
      'Auth',
      'Auth Api. Related with authorization and authentication endpoints',
    )
    .addTag('Users', 'Users Api. Related with the Admin and Users resources')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);
  logger.log('Swagger configured at /api-documentation');

  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
  logger.log(
    `Nest portfolio backend listen on http(s)://localhost:${process.env.APP_PORT} - Environment: ${process.env.APP_ENV}`,
  );
}
startApp();
