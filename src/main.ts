import 'reflect-metadata';
import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  console.log(process.env.DB_USERNAME)
  await app.listen(PORT);
  Logger.log('Serveris running... on http://localhost:3000', 'Server')
}
bootstrap();
