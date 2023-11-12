import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { contentTypeMiddleware } from './common/middlewares/content.type.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NodeJS API Asessment')
    .setDescription(
      `Teachers need a system where they can perform administrative functions for their students. 
      Teachers and students are identified by their email addresses.`,
    )
    .setVersion('1.0')
    .addTag('dev-assessments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(helmet());
  app.use(contentTypeMiddleware());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
