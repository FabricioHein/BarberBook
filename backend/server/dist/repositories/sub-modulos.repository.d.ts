import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class SubModulosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getAllSubModulos(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        ativo: boolean;
        url: string;
        ordem: number;
        icon: string;
        moduloId: number;
    }[]>;
}
