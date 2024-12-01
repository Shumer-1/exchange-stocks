"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ExchangeGateway = class ExchangeGateway {
    constructor() {
        this.clients = new Set();
    }
    // Обрабатываем подключение клиента
    handleConnection(client) {
        this.clients.add(client);
        console.log(`Client connected: ${client.id}`);
    }
    // Обрабатываем отключение клиента
    handleDisconnect(client) {
        this.clients.delete(client);
        console.log(`Client disconnected: ${client.id}`);
    }
    // Обрабатываем обновление цен акций
    handleStockPriceUpdate(client, updatedStocks) {
        console.log('Received updated stock prices:', updatedStocks);
        // Отправляем обновления всем подключенным клиентам
        // @ts-ignore
        this.server.emit('stockPricesUpdated', updatedStocks);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ExchangeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateStockPrices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", void 0)
], ExchangeGateway.prototype, "handleStockPriceUpdate", null);
ExchangeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], ExchangeGateway);
exports.ExchangeGateway = ExchangeGateway;
