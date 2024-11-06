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
exports.AgendaRepository = void 0;
const PrismaService_1 = require("../base/relacional/PrismaService");
const agenda_dto_1 = require("../infra/DTO/agenda-dto");
const date_fns_1 = require("date-fns");
const common_1 = require("@nestjs/common");
let AgendaRepository = class AgendaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getHorariosDisponiveis(barbeiroId, dia, uuid) {
        const diaDate = new Date(dia);
        const agora = new Date();
        let horarioInicio = new Date(diaDate);
        horarioInicio.setHours(8, 0, 0, 0);
        const horarioFim = new Date(diaDate);
        horarioFim.setHours(22, 0, 0, 0);
        if ((0, date_fns_1.isToday)(diaDate)) {
            if ((0, date_fns_1.isBefore)(agora, horarioFim)) {
                const minutos = agora.getMinutes();
                const arredondarMinutos = minutos < 30 ? 30 : 60;
                horarioInicio = (0, date_fns_1.setMinutes)(agora, arredondarMinutos);
                horarioInicio = (0, date_fns_1.setSeconds)(horarioInicio, 0);
                horarioInicio = (0, date_fns_1.setMilliseconds)(horarioInicio, 0);
                if (horarioInicio.getMinutes() === 60) {
                    horarioInicio = (0, date_fns_1.addMinutes)(horarioInicio, -60);
                    horarioInicio.setHours(horarioInicio.getHours() + 1);
                }
            }
        }
        const userAgendas = await this.prisma.agenda.findMany({
            where: {
                Users: {
                    some: {
                        id: Number(barbeiroId)
                    }
                },
                AND: [
                    {
                        date_start: {
                            gte: horarioInicio
                        }
                    },
                    {
                        date_end: {
                            lte: horarioFim
                        }
                    }
                ]
            }
        });
        const horariosOcupados = userAgendas.map(agenda => ({
            inicio: new Date(agenda.date_start),
            fim: new Date(agenda.date_end)
        }));
        const estaOcupado = (inicio, fim) => {
            return horariosOcupados.some(ocupado => {
                return ((0, date_fns_1.isBefore)(inicio, ocupado.fim) && (0, date_fns_1.isAfter)(fim, ocupado.inicio));
            });
        };
        const horariosDisponiveis = [];
        let intervaloAtual = new Date(horarioInicio);
        while ((0, date_fns_1.isBefore)(intervaloAtual, horarioFim)) {
            const proximoIntervalo = (0, date_fns_1.addMinutes)(intervaloAtual, 30);
            if (!estaOcupado(intervaloAtual, proximoIntervalo)) {
                horariosDisponiveis.push((0, date_fns_1.format)(intervaloAtual, 'HH:mm'));
            }
            intervaloAtual = proximoIntervalo;
        }
        return horariosDisponiveis;
    }
    async getAgendaByDataUsuario(atendimentoId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        console.log(atendimentoId, startOfDay, endOfDay);
        const userAgendas = await this.prisma.agenda.findMany({
            where: {
                AND: [
                    {
                        date_start: {
                            gte: startOfDay,
                            lte: endOfDay
                        }
                    },
                    {
                        Users: {
                            some: {
                                id: atendimentoId
                            }
                        }
                    }
                ]
            },
            include: {
                Users: true
            }
        });
        const formattedAgendas = userAgendas.map(agendaData => {
            const formattedData = new agenda_dto_1.default(Object.assign(Object.assign({}, agendaData), { date_start: new Date(agendaData.date_start), date_end: new Date(agendaData.date_end), Users: agendaData.Users, agenda_cliente: agendaData.agenda_cliente || [] }));
            return formattedData;
        });
        return formattedAgendas;
    }
    ;
    async getDataAgendamento(uuid) {
        const userAgendas = await this.prisma.agenda.findMany({
            where: {
                Users: {
                    some: {
                        Users: {
                            empresa_config: {
                                uuid: uuid
                            }
                        }
                    }
                }
            },
            include: {
                Users: true
            }
        });
        const formattedAgendas = userAgendas.map(agendaData => {
            const formattedData = new agenda_dto_1.default(Object.assign(Object.assign({}, agendaData), { date_start: new Date(agendaData.date_start), date_end: new Date(agendaData.date_end), Users: agendaData.Users, agenda_cliente: agendaData.agenda_cliente || [] }));
            return formattedData;
        });
        return formattedAgendas;
    }
    async getAgendaAllEmpresa(empresa_configId) {
        const userAgendas = await this.prisma.agenda.findMany({
            where: {
                Users: {
                    some: {
                        Users: {
                            empresa_configId: empresa_configId
                        }
                    }
                }
            },
            include: {
                Users: true
            }
        });
        const formattedAgendas = userAgendas.map(agendaData => {
            const formattedData = new agenda_dto_1.default(Object.assign(Object.assign({}, agendaData), { date_start: new Date(agendaData.date_start), date_end: new Date(agendaData.date_end), Users: agendaData.Users, agenda_cliente: agendaData.agenda_cliente || [] }));
            return formattedData;
        });
        return formattedAgendas;
    }
    async getAgendaAll(empresa_configId) {
        const userAgendas = await this.prisma.agenda.findMany({
            where: {
                Users: {
                    some: {
                        Users: {
                            empresa_configId: empresa_configId
                        }
                    }
                }
            },
            include: {
                Users: {
                    select: {
                        userId: true
                    }
                },
                agenda_cliente: {
                    select: {
                        clienteId: true
                    }
                }
            }
        });
        const formattedAgendas = userAgendas.map(agendaData => {
            const formattedData = new agenda_dto_1.default(Object.assign(Object.assign({}, agendaData), { date_start: new Date(agendaData.date_start), date_end: new Date(agendaData.date_end), Users: agendaData.Users, agenda_cliente: agendaData.agenda_cliente || [] }));
            return formattedData;
        });
        return formattedAgendas;
    }
    async getByIdAgenda(id) {
        return await this.prisma.agenda.findFirst({
            where: {
                id: id,
            },
        });
    }
    async createAgenda(data) {
        let params = {
            title: data.title,
            description: data.description,
            className: data.className,
            status: data.status,
            date_start: data.date_start,
            date_end: data.date_end
        };
        if (data.taskId) {
            params['taskId'] = data.taskId;
        }
        const newAgenda = await this.prisma.agenda.create({
            data: params
        });
        if (data.clienteIds && data.clienteIds.length > 0) {
            const validClienteIds = await this.prisma.cliente.findMany({
                where: {
                    id: { in: data.clienteIds }
                },
                select: {
                    id: true
                }
            });
            await Promise.all(validClienteIds.map(async (cliente) => {
                await this.prisma.agenda_cliente.create({
                    data: {
                        agendaId: newAgenda.id,
                        clienteId: cliente.id
                    },
                });
            }));
        }
        if (data.userIds && data.userIds.length > 0) {
            await Promise.all(data.userIds.map(async (userId) => {
                await this.prisma.agenda_usuario.create({
                    data: {
                        agendaId: newAgenda.id,
                        userId: userId
                    },
                });
            }));
        }
        return newAgenda;
    }
    async updateAgenda(id, data) {
        let params = {
            title: data.title,
            description: data.description,
            className: data.className,
            status: data.status,
            date_start: data.date_start,
            date_end: data.date_end
        };
        if (data.taskId) {
            params['taskId'];
        }
        ;
        const updatedAgenda = await this.prisma.agenda.update({
            where: { id: id },
            data: Object.assign(Object.assign({}, params), { Users: {
                    deleteMany: {
                        agendaId: id
                    },
                    create: data.userIds.map(userId => ({
                        Users: {
                            connect: { id: userId }
                        }
                    }))
                } }),
            include: {
                Users: true
            }
        });
        return updatedAgenda;
    }
    async deleteAgenda(id) {
        await this.prisma.agenda.update({
            where: { id: id },
            data: {
                Users: {
                    deleteMany: {
                        agendaId: id
                    }
                }
            }
        });
        return await this.prisma.agenda.delete({
            where: {
                id: id,
            },
        });
    }
    async createManyAgenda(data) {
        return await this.prisma.agenda.createMany({
            data: data,
        });
    }
    async deleteManyTaskSubSub(id) {
        return await this.prisma.agenda.deleteMany({
            where: {
                id: id,
            },
        });
    }
};
AgendaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], AgendaRepository);
exports.AgendaRepository = AgendaRepository;
//# sourceMappingURL=agenda.repository.js.map