import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Включаем CORS для всех доменов
    await app.listen(3001); // Или любой другой порт, который вы используете для бэкенда
}
bootstrap();