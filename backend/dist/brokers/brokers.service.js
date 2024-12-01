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
exports.BrokersService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
let BrokersService = class BrokersService {
    constructor() {
        this.brokersFilePath = path.join(__dirname, '../../data/brokers.json');
    }
    // Получить всех брокеров
    getAllBrokers() {
        return this.readBrokersFromFile();
    }
    // Получить брокера по ID
    getBrokerById(id) {
        const brokersData = this.readBrokersFromFile();
        return brokersData.find((broker) => broker.id === id);
    }
    // Добавить нового брокера
    addBroker(newBroker) {
        const brokersData = this.readBrokersFromFile();
        brokersData.push(newBroker);
        this.writeBrokersToFile(brokersData);
        return newBroker;
    }
    // Удалить брокера
    deleteBroker(id) {
        const brokersData = this.readBrokersFromFile();
        const updatedBrokers = brokersData.filter((broker) => broker.id !== id);
        this.writeBrokersToFile(updatedBrokers);
        return { deleted: true };
    }
    // Обновить брокера (например, баланс)
    updateBroker(id, updatedData) {
        const brokersData = this.readBrokersFromFile();
        const brokerIndex = brokersData.findIndex((broker) => broker.id === id);
        if (brokerIndex === -1) {
            throw new Error('Broker not found');
        }
        // Обновляем данные брокера
        const updatedBroker = Object.assign(Object.assign({}, brokersData[brokerIndex]), updatedData);
        brokersData[brokerIndex] = updatedBroker;
        // Записываем обратно в файл
        this.writeBrokersToFile(brokersData);
        return updatedBroker;
    }
    // Чтение данных брокеров из файла
    readBrokersFromFile() {
        const brokersJson = (0, fs_1.readFileSync)(this.brokersFilePath, 'utf-8');
        return JSON.parse(brokersJson);
    }
    // Запись данных в файл
    writeBrokersToFile(brokersData) {
        (0, fs_1.writeFileSync)(this.brokersFilePath, JSON.stringify(brokersData, null, 2));
    }
};
BrokersService = __decorate([
    (0, common_1.Injectable)()
], BrokersService);
exports.BrokersService = BrokersService;
