import { ServicoRepository } from 'src/repositories/servicos.repository';
export declare class ServicoService {
    private servicoRepository;
    constructor(servicoRepository: ServicoRepository);
    atualizarServico(data: any): Promise<{
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
    getAllServico(): Promise<{
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
    deleteServico(data: any): Promise<{
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
