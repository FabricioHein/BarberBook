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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetoRepository = void 0;
const PrismaService_1 = require("../base/relacional/PrismaService");
const common_1 = require("@nestjs/common");
let ProjetoRepository = class ProjetoRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProjetoAll(empresa_configId) {
        return await this.prisma.projeto.findMany({
            where: {
                empresa_configId: empresa_configId,
            },
        });
    }
    async getByIdProjeto(id) {
        return await this.prisma.projeto.findFirst({
            where: {
                id: id,
            },
        });
    }
    async getByIdProjetoEtapa(id) {
        return await this.prisma.projeto.findFirst({
            where: {
                id: id,
            },
            include: {
                processo: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    }
    async createProjeto(data) {
        return await this.prisma.projeto.create({
            data: data,
        });
    }
    async updateProjeto(id, data) {
        return await this.prisma.projeto.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async deleteProjeto(id) {
        return await this.prisma.projeto.delete({
            where: {
                id: id,
            },
        });
    }
    async createManyProjeto(data) {
        return await this.prisma.projeto.createMany({
            data: data,
        });
    }
    async deleteManyProjeto(id) {
        return await this.prisma.projeto.deleteMany({
            where: {
                id: id,
            },
        });
    }
};
ProjetoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], ProjetoRepository);
exports.ProjetoRepository = ProjetoRepository;
//# sourceMappingURL=projeto.repository.js.map