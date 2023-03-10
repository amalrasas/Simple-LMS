import { NestFactory, Reflector } from '@nestjs/core';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AtGuard } from './guards/at.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }))
  const reflector = new Reflector()
  app.useGlobalGuards(new AtGuard(reflector))
  app.use(cookieParser())
  await app.listen(3000);
}

bootstrap();
function useGlobalPipes(arg0: ValidationPipe) {
  throw new Error('Function not implemented.');
}

