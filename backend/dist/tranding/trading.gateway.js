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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
let TradingGateway = class TradingGateway {
    constructor() {
        this.filePath = path_1.default.join(__dirname, '../../data/stocks.json');
        this.stocks = this.filterStocks(this.readStocks());
        this.getShiftedDate = (n) => {
            const today = new Date(); // Текущая дата
            today.setDate(today.getDate() + n); // Сдвигаем дату на n дней вперед или назад
            const day = String(today.getDate()).padStart(2, '0'); // День с ведущим нулем
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяц (месяцы начинаются с 0)
            const year = today.getFullYear(); // Год
            return `${day}/${month}/${year}`;
        };
    }
    readStocks() {
        const data = (0, fs_1.readFileSync)(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    filterStocks(stocks) {
        stocks.map((stock) => { stock.price = stock.historicalData[0].open; });
        return stocks.filter(stock => stock.participatesInTrading);
    }
    handleLoadPage() {
        this.stocks = this.filterStocks(this.readStocks());
    }
    handleStartTrading(data) {
        const { speed } = data;
        console.log(data.speed);
        this.shift = 0;
        // Устанавливаем интервал обновления цен
        if (this.interval)
            clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.updatePrices();
            // @ts-ignore
            this.server.emit('stockUpdate', this.stocks); // Отправляем данные клиентам
        }, speed * 1000);
        return { message: 'Trading started', interval: speed };
    }
    handleStopTrading() {
        if (this.interval)
            clearInterval(this.interval);
        this.stocks = this.filterStocks(this.readStocks());
        this.shift = 0;
        // @ts-ignore
        this.server.emit('stockUpdate', this.stocks);
        return { message: 'Trading stopped' };
    }
    updatePrices() {
        this.stocks = this.stocks.map(stock => (Object.assign(Object.assign({}, stock), { price: +(stock.price * (1 + (Math.random() * 2 - 1) * 0.01)).toFixed(2) })));
        this.stocks = this.stocks.map(stock => (Object.assign(Object.assign({}, stock), { date: this.getShiftedDate(this.shift) })));
        // @ts-ignore
        this.shift++;
    }
    handleGetStocks(client) {
        console.log("Stocks: ", this.stocks);
        // @ts-ignore
        this.server.emit('stockUpdate', this.stocks); // Отправляем данные клиентам
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], TradingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('loadPage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TradingGateway.prototype, "handleLoadPage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startTrading'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TradingGateway.prototype, "handleStartTrading", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTrading'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TradingGateway.prototype, "handleStopTrading", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getStocks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TradingGateway.prototype, "handleGetStocks", null);
TradingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], TradingGateway);
exports.TradingGateway = TradingGateway;
