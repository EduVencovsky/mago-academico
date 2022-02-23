import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mikroOrm = app.get(MikroORM);
  await mikroOrm.getMigrator().up();

  await app.listen(3000);
}
bootstrap();
