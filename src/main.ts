import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const app = async ()=> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  logger.log(`Conectado a la base de datos por el puerto ${process.env.POSTGRES_PORT}`)

  await app.listen(process.env.PORT || 3001);
  logger.log(`🚀 Application is running on port: ${process.env.PORT || 3001}`);
}
 
app();
