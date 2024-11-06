import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class MotivosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getMotivosAll(empresa_configId: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        empresa_configId: number;
        descricao: string;
        codigo: string;
    }[]>;
    getByIdMotivos(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        empresa_configId: number;
        descricao: string;
        codigo: string;
    }>;
    createMotivos(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        empresa_configId: number;
        descricao: string;
        codigo: string;
    }>;
    updateMotivos(id: any, data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        empresa_configId: number;
        descricao: string;
        codigo: string;
    }>;
    deleteMotivos(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        empresa_configId: number;
        descricao: string;
        codigo: string;
    }>;
    createManyMotivos(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyMotivosProcesso(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
