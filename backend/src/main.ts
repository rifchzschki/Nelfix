import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import './helpers/pagination.helpers';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Authorization, Content-Type',
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'frontend', 'views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      layoutsDir: join(__dirname, '..', '..', 'frontend', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', '..', 'frontend', 'views', 'partials'),
    }),
  );
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Nelfix')
    .setDescription('Api documentation for Nelfix app')
    .setVersion('1.0')
    .addTag('Nelfix')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  const port = 3000;
  await app.listen(port);
  console.log(`app running at http://localhost:${port}/`);
}
bootstrap();
