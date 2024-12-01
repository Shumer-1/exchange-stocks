// src/app.module.ts
import { Module } from '@nestjs/common';
import { BrokersModule } from './brokers/brokers.module';
import { StocksModule } from './stocks/stocks.module';
import {TradingModule} from "./tranding/trading.module";

@Module({
    imports: [
        BrokersModule,   // Импортируем модуль брокеров
        StocksModule,    // Импортируем модуль акций
        TradingModule,  // Импортируем модуль биржи
    ],
    controllers: [],   // Контроллеры для обработки HTTP-запросов (если есть, обычно это все контроллеры)
    providers: [],     // Провайдеры, сервисы и другие компоненты, доступные в приложении
})

export class AppModule {}
