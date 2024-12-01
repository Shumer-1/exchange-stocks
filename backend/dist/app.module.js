"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const common_1 = require("@nestjs/common");
const brokers_module_1 = require("./brokers/brokers.module");
const stocks_module_1 = require("./stocks/stocks.module");
const trading_module_1 = require("./tranding/trading.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            brokers_module_1.BrokersModule,
            stocks_module_1.StocksModule,
            trading_module_1.TradingModule, // Импортируем модуль биржи
        ],
        controllers: [],
        providers: [], // Провайдеры, сервисы и другие компоненты, доступные в приложении
    })
], AppModule);
exports.AppModule = AppModule;
