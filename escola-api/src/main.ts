
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //!configuração swagger
  const config = new DocumentBuilder()
    .setTitle('API escola')
    .setDescription('API para gerenciamento de alunos')
    .setVersion('1.0')
    .addTag('alunos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  const logger = new Logger();
  logger.log(`Servidor rodando na porta ${process.env.PORT ?? 3000}`);
}

await bootstrap();

