"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
let StocksService = class StocksService {
    constructor() {
        this.filePath = path.join(__dirname, '../../data/stocks.json');
    }
    readStocks() {
        const data = (0, fs_1.readFileSync)(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    writeStocks(stocks) {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(stocks, null, 2));
    }
    getAllStocks() {
        return this.readStocks();
    }
    getStockByTicker(ticker) {
        const stocks = this.readStocks();
        const stock = stocks.find(s => s.ticker === ticker);
        if (!stock) {
            throw new common_1.NotFoundException('Stock not found');
        }
        return stock;
    }
    addStock(newStock) {
        const stocks = this.readStocks();
        stocks.push(newStock);
        this.writeStocks(stocks);
        return newStock;
    }
    updateStock(ticker, updatedData) {
        const stocks = this.readStocks();
        const index = stocks.findIndex(s => s.ticker === ticker);
        if (index === -1) {
            throw new common_1.NotFoundException('Stock not found');
        }
        stocks[index] = Object.assign(Object.assign({}, stocks[index]), updatedData);
        this.writeStocks(stocks);
        return stocks[index];
    }
    deleteStock(ticker) {
        const stocks = this.readStocks();
        const filteredStocks = stocks.filter(s => s.ticker !== ticker);
        this.writeStocks(filteredStocks);
    }
};
StocksService = __decorate([
    (0, common_1.Injectable)()
], StocksService);
exports.StocksService = StocksService;
