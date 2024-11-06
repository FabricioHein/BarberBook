import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ConfigRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getByIdUserConfig(id: any): Promise<any>;
    getByIdUserEmpresa(id: any): Promise<any>;
    getPermissaoModulos(id: any): Promise<any>;
    getPermissaoSubModulos(id: any): Promise<any>;
    getModulosSistema(): Promise<({
        subModulo: {
            id: number;
            created_at: Date;
            updated_at: Date;
            nome: string;
            ativo: boolean;
            url: string;
            ordem: number;
            icon: string;
            moduloId: number;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        nome: string;
        ativo: boolean;
        url: string;
        ordem: number;
        icon: string;
    })[]>;
    getPermissaoDepartamento(): Promise<string>;
    getPermissaoSecretaria(): Promise<string>;
}
