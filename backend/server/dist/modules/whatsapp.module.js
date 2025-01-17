"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("../service/whatsapp.service");
const webhook_controller_1 = require("../controllers/webhook.controller");
const chat_repository_1 = require("../repositories/chat.repository");
const PrismaService_1 = require("../base/relacional/PrismaService");
let WhatsappModule = class WhatsappModule {
};
WhatsappModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            webhook_controller_1.WebhookController
        ],
        providers: [whatsapp_service_1.WhatsappService,
            chat_repository_1.ChatRepository,
            PrismaService_1.PrismaService
        ],
    })
], WhatsappModule);
exports.WhatsappModule = WhatsappModule;
//# sourceMappingURL=whatsapp.module.js.map