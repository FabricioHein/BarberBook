import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ArquivosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getArquivosAll(taskId: any): Promise<{
        id: number;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        link: string;
        empresa_configId: number;
        messagesMessage_id: number;
    }[]>;
    getByIdArquivos(id: any): Promise<{
        id: number;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        link: string;
        empresa_configId: number;
        messagesMessage_id: number;
    }>;
    createArquivos(data: any): Promise<{
        id: number;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        link: string;
        empresa_configId: number;
        messagesMessage_id: number;
    }>;
    updateArquivos(id: any, data: any): Promise<{
        id: number;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        link: string;
        empresa_configId: number;
        messagesMessage_id: number;
    }>;
    deleteArquivos(id: any): Promise<{
        id: number;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        link: string;
        empresa_configId: number;
        messagesMessage_id: number;
    }>;
    createManyArquivos(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyTaskSubSub(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
