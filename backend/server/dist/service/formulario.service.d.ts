import { FormularioDinamicoRepository } from 'src/repositories/formulario-dinamico.repository';
import { FormularioAskRepository } from 'src/repositories/formulario-ask.repository';
import { TaskRepository } from 'src/repositories/task.repository';
export declare class FormularioService {
    private taskRepository;
    private formularioDinamicoRepository;
    private formularioAskRepository;
    constructor(taskRepository: TaskRepository, formularioDinamicoRepository: FormularioDinamicoRepository, formularioAskRepository: FormularioAskRepository);
    atualizarFormularioDinamico(data: any): Promise<{
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    }>;
    getAllFormularioDinamico(empresa_configId: any): Promise<({
        form_ask: {
            id: number;
            created_at: Date;
            updated_at: Date;
            json: import("@prisma/client/runtime/library").JsonValue;
            formulario_dinamicoId: number;
        }[];
    } & {
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    })[]>;
    createFormularioDinamico(data: any): Promise<{
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    }>;
    deleteFormularioDinamico(data: any): Promise<{
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    }>;
    updateFormularioAsk(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
    getByURLFormularioDinamico(url: any): Promise<{
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    }>;
    getByURLFormularioDinamicoOpen(url: any): Promise<{
        form: boolean;
        id: number;
        title: string;
        created_at: Date;
        updated_at: Date;
        taskId: string;
        empresa_configId: number;
        projetoId: number;
        processoId: number;
        publico: boolean;
        url_formulario: string;
        json: import("@prisma/client/runtime/library").JsonValue;
        nome_campanha: string;
        link_redirect: string;
        logo: string;
        logo_width: string;
        logo_height: string;
    } | {
        form: boolean;
    }>;
    getByIdFormularioAsk(empresa_configId: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
    createFormularioAsk(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
    deleteFormularioAsk(data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
}
