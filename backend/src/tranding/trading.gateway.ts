import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import path from "path";
import {Stock} from "../stocks/stocks.interface";
import {readFileSync} from "fs";

@WebSocketGateway({ cors: { origin: '*' } })
export class TradingGateway {
    @WebSocketServer()
    server: Server | undefined;
    shift: number | undefined;

    private filePath = path.join(__dirname, '../../data/stocks.json');

    private readStocks(): Stock[] {
        const data = readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    private stocks = this.filterStocks(this.readStocks());
    private interval: NodeJS.Timeout | undefined;

    private filterStocks(stocks: any[]) {
        stocks.map((stock: any) => {stock.price = stock.historicalData[0].open})
        return stocks.filter(stock => stock.participatesInTrading);
    }

    private getShiftedDate = (n: number | undefined) => {
        const today = new Date(); // Текущая дата
        today.setDate(today.getDate() + n!); // Сдвигаем дату на n дней вперед или назад

        const day = String(today.getDate()).padStart(2, '0'); // День с ведущим нулем
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяц (месяцы начинаются с 0)
        const year = today.getFullYear(); // Год

        return `${day}/${month}/${year}`;
    };

    @SubscribeMessage('loadPage')
    handleLoadPage( ){
        this.stocks = this.filterStocks(this.readStocks());
    }

    @SubscribeMessage('startTrading')
    handleStartTrading(@MessageBody() data: { speed: any }) {
        const { speed } = data;
        console.log(data.speed);
        this.shift = 0;

        // Устанавливаем интервал обновления цен
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.updatePrices();
            // @ts-ignore
            this.server.emit('stockUpdate', this.stocks); // Отправляем данные клиентам
        }, speed * 1000);

        return { message: 'Trading started', interval: speed };
    }

    @SubscribeMessage('stopTrading')
    handleStopTrading() {
        if (this.interval) clearInterval(this.interval);
        this.stocks = this.filterStocks(this.readStocks());
        this.shift = 0;
        // @ts-ignore
        this.server.emit('stockUpdate', this.stocks);
        return { message: 'Trading stopped' };
    }

    private updatePrices() {
        this.stocks = this.stocks.map(stock => ({
            ...stock,
            price: + (stock.price * (1 + (Math.random() * 2 - 1) * 0.01)).toFixed(2), // Случайное изменение ±1%
        }));
        this.stocks = this.stocks.map(stock => ({
            ...stock,
            date: this.getShiftedDate(this.shift), // Случайное изменение ±1%
        }));
        // @ts-ignore
        this.shift++;
    }

    @SubscribeMessage('getStocks')
    handleGetStocks(client: any) {
        console.log("Stocks: ", this.stocks);
        // @ts-ignore
        this.server.emit('stockUpdate', this.stocks); // Отправляем данные клиентам
    }
}
