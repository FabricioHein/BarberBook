import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class HistoricoClienteRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getHistoricoCliente(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        chave: string;
        valor: string;
    }>;
    getByIdHistoricoCliente(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        chave: string;
        valor: string;
    }>;
    createHistoricoCliente(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        chave: string;
        valor: string;
    }>;
    updateHistoricoCliente(id: any, data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        chave: string;
        valor: string;
    }>;
    deleteHistoricoCliente(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        chave: string;
        valor: string;
    }>;
}
