import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

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
bootstrap();
