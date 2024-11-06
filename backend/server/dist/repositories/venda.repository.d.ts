import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class VendaRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getVendaAll(taskId: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        usersId: number;
        valor_total: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    getByIdVenda(id: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        usersId: number;
        valor_total: import("@prisma/client/runtime/library").Decimal;
    }>;
    createVenda(data: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        usersId: number;
        valor_total: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateVenda(id: any, data: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        usersId: number;
        valor_total: import("@prisma/client/runtime/library").Decimal;
    }>;
    deleteVenda(id: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        usersId: number;
        valor_total: import("@prisma/client/runtime/library").Decimal;
    }>;
    createManyVenda(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyTaskSubSub(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
