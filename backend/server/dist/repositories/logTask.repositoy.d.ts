import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class LogTasksRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getLogTasksAll(taskId: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        chave: string;
        valor: string;
    }[]>;
    getByIdLogTasks(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        chave: string;
        valor: string;
    }>;
    createLogTasks(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        chave: string;
        valor: string;
    }>;
    updateLogTasks(id: any, data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        chave: string;
        valor: string;
    }>;
    deleteLogTasks(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        chave: string;
        valor: string;
    }>;
    createManyLogTasks(data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteManyTaskSubSub(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
