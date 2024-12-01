import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { Stock } from './stocks.interface';

@Injectable()
export class StocksService {
    private filePath = path.join(__dirname, '../../data/stocks.json');

    private readStocks(): Stock[] {
        const data = readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    private writeStocks(stocks: Stock[]): void {
        writeFileSync(this.filePath, JSON.stringify(stocks, null, 2));
    }

    getAllStocks(): Stock[] {
        return this.readStocks();
    }

    getStockByTicker(ticker: string): Stock {
        const stocks = this.readStocks();
        const stock = stocks.find(s => s.ticker === ticker);
        if (!stock) {
            throw new NotFoundException('Stock not found');
        }
        return stock;
    }

    addStock(newStock: Stock): Stock {
        const stocks = this.readStocks();
        stocks.push(newStock);
        this.writeStocks(stocks);
        return newStock;
    }

    updateStock(ticker: string, updatedData: Partial<Stock>): Stock {
        const stocks = this.readStocks();
        const index = stocks.findIndex(s => s.ticker === ticker);
        if (index === -1) {
            throw new NotFoundException('Stock not found');
        }
        stocks[index] = { ...stocks[index], ...updatedData };
        this.writeStocks(stocks);
        return stocks[index];
    }

    deleteStock(ticker: string): void {
        const stocks = this.readStocks();
        const filteredStocks = stocks.filter(s => s.ticker !== ticker);
        this.writeStocks(filteredStocks);
    }
}
