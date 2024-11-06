import { ProjetoRepository } from 'src/repositories/projeto.repository';
import { TaskRepository } from 'src/repositories/task.repository';
export declare class ProjetoService {
    private projetoRepository;
    private taskRepository;
    constructor(projetoRepository: ProjetoRepository, taskRepository: TaskRepository);
    atualizarProjeto(data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    getAllProjeto(id: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }[]>;
    getAllProjetoById(id: any): Promise<{
        processo: {
            id: string;
            title: string;
        }[];
    } & {
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    createProjeto(data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
    deleteProjeto(data: any): Promise<{
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        operador: string;
        empresa_configId: number;
        tipo_projetoId: number;
    }>;
}
