import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParcer from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParcer());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
