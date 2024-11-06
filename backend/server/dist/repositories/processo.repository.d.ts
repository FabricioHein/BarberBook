import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ProcessoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getProcessoAll(id: any): Promise<{
        id: string;
        title: string;
        task: ({
            agenda: {
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
            }[];
        } & {
            id: string;
            title: string;
            description: string;
            status: string;
            created_at: Date;
            updated_at: Date;
            empresa: string;
            cpf: string;
            operador: string;
            metasId: number;
            valor_Inicial: import("@prisma/client/runtime/library").Decimal;
            valor_Final: import("@prisma/client/runtime/library").Decimal;
            desconto: import("@prisma/client/runtime/library").Decimal;
            emailId: number;
            anotacoesId: number;
            contactsId: number;
            usersId: number;
            vendaId: number;
            motivosId: number;
            produtoId: number;
            contato_nome: string;
            contato_numero: string;
            processoId: string;
            marcar_venda: boolean;
            previsao_fechamento: Date;
            arquivado: boolean;
        })[];
        color: string;
        etapa: number;
    }[]>;
    getByIdProcesso(id: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        color: string;
        etapa: number;
        projetoId: string;
    }>;
    createProcesso(data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        color: string;
        etapa: number;
        projetoId: string;
    }>;
    updateProcesso(id: any, data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        color: string;
        etapa: number;
        projetoId: string;
    }>;
    deleteProcesso(id: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        color: string;
        etapa: number;
        projetoId: string;
    }>;
    createManyProcesso(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyProcesso(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
