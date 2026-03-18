import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('COURSE-APP-API')
    .setDescription(`Build time ${new Date().toISOString()}`)
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'COURSE-APP API Docs',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
