import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class FormularioDinamicoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getFormularioDinamicoAll(empresa_configId: any): Promise<({
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
    getByURLFormularioDinamico(url_formulario: any): Promise<{
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
    getByURLFormularioDinamicoOpen(url_formulario: any): Promise<{
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
    getByIdFormularioDinamico(id: any): Promise<{
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
    updateFormularioDinamico(id: any, data: any): Promise<{
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
    deleteFormularioDinamico(id: any): Promise<{
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
}