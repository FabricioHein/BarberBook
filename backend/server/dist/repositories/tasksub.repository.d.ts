import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class TaskSubRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getVisaoGeralTaskSub(where: any): Promise<any>;
    getTaskSubAllTaskId(taskId: any): Promise<any>;
    getByIdTaskSub(id: any): Promise<any>;
    createTaskSub(data: any): Promise<any>;
    updateTaskSub(id: any, data: any): Promise<any>;
    deleteTaskSub(id: any): Promise<any>;
    createManyTaskSub(data: any): Promise<any>;
    deleteManyTaskSubSub(id: any): Promise<any>;
}
