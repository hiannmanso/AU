import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.enableCors({
    origin: 'http://localhost:3001', // Substitua com a origem do seu cliente (por exemplo, frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true, // Permitir credenciais (por exemplo, cookies)
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
}
bootstrap();
