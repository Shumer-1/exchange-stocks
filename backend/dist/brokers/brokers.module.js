"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersModule = void 0;
const common_1 = require("@nestjs/common");
const brokers_service_1 = require("./brokers.service");
const brokers_controller_1 = require("./brokers.controller");
let BrokersModule = class BrokersModule {
};
BrokersModule = __decorate([
    (0, common_1.Module)({
        controllers: [brokers_controller_1.BrokersController],
        providers: [brokers_service_1.BrokersService],
    })
], BrokersModule);
exports.BrokersModule = BrokersModule;
