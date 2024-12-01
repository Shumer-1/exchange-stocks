// src/brokers/brokers.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
    constructor(private brokersService: BrokersService) {}

    // Получить всех брокеров
    @Get()
    getAllBrokers() {
        return this.brokersService.getAllBrokers();
    }

    // Получить брокера по ID
    @Get(':id')
    getBrokerById(@Param('id') id: string) {
        return this.brokersService.getBrokerById(id);
    }

    // Добавить нового брокера
    @Post()
    addBroker(@Body() newBroker: { id: string; name: string; balance: number }) {
        return this.brokersService.addBroker(newBroker);
    }

    // Удалить брокера
    @Delete(':id')
    deleteBroker(@Param('id') id: string) {
        return this.brokersService.deleteBroker(id);
    }

    // Обновить данные брокера
    @Patch(':id')
    updateBroker(
        @Param('id') id: string,
        @Body() updatedData: { name?: string; balance?: number },
    ) {
        return this.brokersService.updateBroker(id, updatedData);
    }
}
