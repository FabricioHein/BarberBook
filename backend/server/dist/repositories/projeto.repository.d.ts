import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ProjetoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getProjetoAll(empresa_configId: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }[]>;
    getByIdProjeto(id: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    getByIdProjetoEtapa(id: any): Promise<{
        processo: {
            id: string;
            title: string;
        }[];
    } & {
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    createProjeto(data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    updateProjeto(id: any, data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    deleteProjeto(id: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    createManyProjeto(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyProjeto(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
