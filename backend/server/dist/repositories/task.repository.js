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
exports.TaskRepository = void 0;
const PrismaService_1 = require("../base/relacional/PrismaService");
const common_1 = require("@nestjs/common");
let TaskRepository = class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTaskAll() {
        return await this.prisma.task.findMany();
    }
    async getVisaoGeralTask(filter) {
        return await this.prisma.task.findMany({
            where: filter,
        });
    }
    async countTasksByEmpresa(empresa_configId) {
        const count = await this.prisma.task.count({
            where: {
                processo: {
                    projeto: {
                        empresa_config: {
                            id: empresa_configId
                        }
                    }
                },
                OR: [{
                        marcar_venda: null
                    }, {
                        marcar_venda: false
                    }]
            },
        });
        return count;
    }
    async sumTasksByEmpresaValorInicial(empresa_configId) {
        var _a;
        try {
            const result = await this.prisma.task.aggregate({
                _sum: {
                    valor_Inicial: true,
                },
                where: {
                    processo: {
                        projeto: {
                            empresa_config: {
                                id: empresa_configId
                            }
                        }
                    },
                    OR: [{
                            marcar_venda: null
                        }, {
                            marcar_venda: false
                        }]
                },
            });
            const valorInicialSum = (_a = result._sum.valor_Inicial) !== null && _a !== void 0 ? _a : 0;
            return valorInicialSum;
        }
        catch (error) {
            console.error('Erro ao calcular a soma dos valores iniciais:', error);
            return 0;
        }
    }
    async sumTasksByEmpresaValorFinal(empresa_configId) {
        var _a;
        try {
            const result = await this.prisma.task.aggregate({
                _sum: {
                    valor_Final: true,
                },
                where: {
                    processo: {
                        projeto: {
                            empresa_config: {
                                id: empresa_configId
                            }
                        }
                    },
                    OR: [{
                            marcar_venda: null
                        }, {
                            marcar_venda: false
                        }]
                },
            });
            const valorInicialSum = (_a = result._sum.valor_Final) !== null && _a !== void 0 ? _a : 0;
            return valorInicialSum;
        }
        catch (error) {
            console.error('Erro ao calcular a soma dos valores iniciais:', error);
            return 0;
        }
    }
    async getByIdTask(id) {
        return await this.prisma.task.findFirst({
            where: {
                id: id,
            },
            include: {
                processo: {
                    select: {
                        title: true,
                        projeto: true,
                    },
                },
                anotacoes: true,
                arquivos: true,
                Contacts: true,
                Users: true
            },
        });
    }
    async createTask(data) {
        return await this.prisma.task.create({
            data: data,
            include: {
                processo: {
                    select: {
                        projeto: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
    }
    async updateTask(id, data) {
        return await this.prisma.task.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async deleteTask(id) {
        return await this.prisma.task.delete({
            where: {
                id: id,
            },
        });
    }
    async createManyTask(data) {
        return await this.prisma.task.createMany({
            data: data,
        });
    }
    async deleteManyTaskProcesso(id) {
        return await this.prisma.task.deleteMany({
            where: {
                processoId: id,
            },
        });
    }
};
TaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map