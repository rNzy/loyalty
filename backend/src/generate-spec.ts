import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  
  const config = new DocumentBuilder()
    .setTitle('Loyalty Cards API')
    .setDescription('The loyalty cards API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  console.log('OpenAPI spec generated to openapi.json');
  
  await app.close();
}
bootstrap();
