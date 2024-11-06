import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ServicoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getServicoAll(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        operador: string;
        empresa_configId: number;
        codigo: string;
        detalhamento: string;
        ativo: boolean;
        valor_hora: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    getByIdServico(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        operador: string;
        empresa_configId: number;
        codigo: string;
        detalhamento: string;
        ativo: boolean;
        valor_hora: import("@prisma/client/runtime/library").Decimal;
    }>;
    createServico(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        operador: string;
        empresa_configId: number;
        codigo: string;
        detalhamento: string;
        ativo: boolean;
        valor_hora: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateServico(id: any, data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        operador: string;
        empresa_configId: number;
        codigo: string;
        detalhamento: string;
        ativo: boolean;
        valor_hora: import("@prisma/client/runtime/library").Decimal;
    }>;
    deleteServico(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        operador: string;
        empresa_configId: number;
        codigo: string;
        detalhamento: string;
        ativo: boolean;
        valor_hora: import("@prisma/client/runtime/library").Decimal;
    }>;
}
