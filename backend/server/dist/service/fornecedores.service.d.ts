import { FornecedorRepository } from 'src/repositories/fornecedor.repository';
export declare class FornecedorService {
    private fornecedorRepositorio;
    constructor(fornecedorRepositorio: FornecedorRepository);
    atualizarFornecedor(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        empresa: string;
        telefone: string;
        operador: string;
        email: string;
        empresa_configId: number;
        cnpj: string;
        link_img: string;
        ativo: boolean;
        nome_responsavel: string;
        celular: string;
        foto: string;
    }>;
    getAllFornecedor(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        empresa: string;
        telefone: string;
        operador: string;
        email: string;
        empresa_configId: number;
        cnpj: string;
        link_img: string;
        ativo: boolean;
        nome_responsavel: string;
        celular: string;
        foto: string;
    }[]>;
    createFornecedor(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        empresa: string;
        telefone: string;
        operador: string;
        email: string;
        empresa_configId: number;
        cnpj: string;
        link_img: string;
        ativo: boolean;
        nome_responsavel: string;
        celular: string;
        foto: string;
    }>;
    deleteFornecedor(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        empresa: string;
        telefone: string;
        operador: string;
        email: string;
        empresa_configId: number;
        cnpj: string;
        link_img: string;
        ativo: boolean;
        nome_responsavel: string;
        celular: string;
        foto: string;
    }>;
}
