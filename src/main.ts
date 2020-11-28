import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
 const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useStaticAssets(join(__dirname, '..', 'static'));

 const options = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('The Chat API description please visit https://amritb.github.io/socketio-client-tool/# to test chat app')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/', app, document);

 await app.listen(process.env.SERVER_PORT);
}
bootstrap();
