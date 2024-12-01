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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersController = void 0;
// src/brokers/brokers.controller.ts
const common_1 = require("@nestjs/common");
const brokers_service_1 = require("./brokers.service");
let BrokersController = class BrokersController {
    constructor(brokersService) {
        this.brokersService = brokersService;
    }
    // Получить всех брокеров
    getAllBrokers() {
        return this.brokersService.getAllBrokers();
    }
    // Получить брокера по ID
    getBrokerById(id) {
        return this.brokersService.getBrokerById(id);
    }
    // Добавить нового брокера
    addBroker(newBroker) {
        return this.brokersService.addBroker(newBroker);
    }
    // Удалить брокера
    deleteBroker(id) {
        return this.brokersService.deleteBroker(id);
    }
    // Обновить данные брокера
    updateBroker(id, updatedData) {
        return this.brokersService.updateBroker(id, updatedData);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getAllBrokers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getBrokerById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "addBroker", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "deleteBroker", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "updateBroker", null);
BrokersController = __decorate([
    (0, common_1.Controller)('brokers'),
    __metadata("design:paramtypes", [brokers_service_1.BrokersService])
], BrokersController);
exports.BrokersController = BrokersController;
