import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { Broker } from './broker.interface'; // Импорт интерфейса Broker

@Injectable()
export class BrokersService {
    private brokersFilePath = path.join(__dirname, '../../data/brokers.json');

    // Получить всех брокеров
    getAllBrokers(): Broker[] {
        return this.readBrokersFromFile();
    }

    // Получить брокера по ID
    getBrokerById(id: string): Broker | undefined {
        const brokersData = this.readBrokersFromFile();
        return brokersData.find((broker: Broker) => broker.id === id);
    }

    // Добавить нового брокера
    addBroker(newBroker: Broker): Broker {
        const brokersData = this.readBrokersFromFile();
        brokersData.push(newBroker);
        this.writeBrokersToFile(brokersData);
        return newBroker;
    }

    // Удалить брокера
    deleteBroker(id: string): { deleted: boolean } {
        const brokersData = this.readBrokersFromFile();
        const updatedBrokers = brokersData.filter((broker: Broker) => broker.id !== id);
        this.writeBrokersToFile(updatedBrokers);
        return { deleted: true };
    }

    // Обновить брокера (например, баланс)
    updateBroker(id: string, updatedData: Partial<Broker>): Broker {
        const brokersData = this.readBrokersFromFile();
        const brokerIndex = brokersData.findIndex((broker: Broker) => broker.id === id);

        if (brokerIndex === -1) {
            throw new Error('Broker not found');
        }

        // Обновляем данные брокера
        const updatedBroker = { ...brokersData[brokerIndex], ...updatedData };
        brokersData[brokerIndex] = updatedBroker;

        // Записываем обратно в файл
        this.writeBrokersToFile(brokersData);

        return updatedBroker;
    }

    // Чтение данных брокеров из файла
    private readBrokersFromFile(): Broker[] {
        const brokersJson = readFileSync(this.brokersFilePath, 'utf-8');
        return JSON.parse(brokersJson);
    }

    // Запись данных в файл
    private writeBrokersToFile(brokersData: Broker[]): void {
        writeFileSync(this.brokersFilePath, JSON.stringify(brokersData, null, 2));
    }
}
