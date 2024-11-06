import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ModulosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getAllModulos(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        ativo: boolean;
        url: string;
        ordem: number;
        icon: string;
    }[]>;
}
