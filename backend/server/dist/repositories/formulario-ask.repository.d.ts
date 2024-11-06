import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class FormularioAskRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getFormularioAskAll(formulario_dinamicoId: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }[]>;
    getByIdFormularioAsk(id: any): Promise<{
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
    updateFormularioAsk(id: any, data: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
    deleteFormularioAsk(id: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        json: import("@prisma/client/runtime/library").JsonValue;
        formulario_dinamicoId: number;
    }>;
}
