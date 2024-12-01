import { Module } from '@nestjs/common';
import { TradingGateway } from './trading.gateway';

@Module({
    providers: [TradingGateway],
})
export class TradingModule {}
