/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Darsoft')
  .setDescription('The Darsoft API description')
  .setVersion('1.0')
  .addTag('Darsoft-Assignment')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService =  app.get(ConfigService);
  const port = configService.get<number>("SERVER_PORT");
  await app.listen(port).then(()=>{
    console.log(`serrver running on port ${port}`)
  });

}
bootstrap();
