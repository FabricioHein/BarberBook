import { PrismaService } from 'src/base/relacional/PrismaService';
import AgendaRetornoModel from 'src/infra/DTO/agenda-dto';
export declare class AgendaRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getHorariosDisponiveis(barbeiroId: number, dia: Date, uuid: string): Promise<string[]>;
    getAgendaByDataUsuario(atendimentoId: any, date: any): Promise<AgendaRetornoModel[]>;
    getDataAgendamento(uuid: any): Promise<AgendaRetornoModel[]>;
    getAgendaAllEmpresa(empresa_configId: any): Promise<AgendaRetornoModel[]>;
    getAgendaAll(empresa_configId: any): Promise<AgendaRetornoModel[]>;
    getByIdAgenda(id: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    createAgenda(data: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    updateAgenda(id: any, data: any): Promise<{
        Users: {
            id: number;
            userId: number;
            agendaId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    deleteAgenda(id: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    createManyAgenda(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyTaskSubSub(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
