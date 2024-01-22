/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // lo que se envia a travez de una peticion http vinculado con un dto que contiene el class validator, se va a castear automaticamente a esa clase, va a ser un objeto de esa clase.
    whitelist:true, // buena practica usarla
    forbidNonWhitelisted:true, // opcional.
    transformOptions: {
      enableImplicitConversion: true, // con esto nos aseguramos que lso tipos de ts van a ser siempre correctos (number//string ej)
    }
  }))

  await app.listen(AppModule.port);
}
bootstrap();
