import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class EnumRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getSexo(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        descricao: string;
    }[]>;
    getOpcao(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        descricao: string;
        Opcao: boolean;
    }[]>;
    getUsuario(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        descricao: string;
    }[]>;
    getProcessosCrmLista(): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        color: string;
        etapa: number;
        projetoId: string;
    }[]>;
}
