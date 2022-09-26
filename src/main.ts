import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
  console.log(
    `Nest portfolio backend listen on http(s)://localhost:${process.env.APP_PORT} - Environment: ${process.env.APP_ENV}`,
  );
}
bootstrap();
