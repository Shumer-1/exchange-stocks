import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './stocks.interface';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get()
    getAllStocks(): Stock[] {
        return this.stocksService.getAllStocks();
    }

    @Get(':ticker')
    getStockByTicker(@Param('ticker') ticker: string): Stock {
        return this.stocksService.getStockByTicker(ticker);
    }

    @Post()
    addStock(@Body() newStock: Stock): Stock {
        return this.stocksService.addStock(newStock);
    }

    @Patch(':ticker')
    updateStock(@Param('ticker') ticker: string, @Body() updatedData: Partial<Stock>): Stock {
        return this.stocksService.updateStock(ticker, updatedData);
    }

    @Delete(':ticker')
    deleteStock(@Param('ticker') ticker: string): void {
        this.stocksService.deleteStock(ticker);
    }
}
