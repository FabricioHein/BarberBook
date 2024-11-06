import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class AnotacaoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getAnotacaoAll(taskId: any): Promise<{
        id: number;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        date: Date;
        is_fav: boolean;
        tag: string;
    }[]>;
    getByIdAnotacao(id: any): Promise<{
        id: number;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        date: Date;
        is_fav: boolean;
        tag: string;
    }>;
    createAnotacao(data: any): Promise<{
        id: number;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        date: Date;
        is_fav: boolean;
        tag: string;
    }>;
    updateAnotacao(id: any, data: any): Promise<{
        id: number;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        date: Date;
        is_fav: boolean;
        tag: string;
    }>;
    deleteAnotacao(id: any): Promise<{
        id: number;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        date: Date;
        is_fav: boolean;
        tag: string;
    }>;
    createManyAnotacao(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyTaskSubSub(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
