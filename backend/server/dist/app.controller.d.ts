import { AuthService } from './service/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
        usuario: any;
        sistema: {
            permissao: any[];
            modulos: ({
                subModulo: {
                    id: number;
                    nome: string;
                    created_at: Date;
                    updated_at: Date;
                    ativo: boolean;
                    url: string;
                    ordem: number;
                    icon: string;
                    moduloId: number;
                }[];
            } & {
                id: number;
                nome: string;
                created_at: Date;
                updated_at: Date;
                ativo: boolean;
                url: string;
                ordem: number;
                icon: string;
            })[];
            enum: {
                opcao: {
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    descricao: string;
                    Opcao: boolean;
                }[];
                sexo: {
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    descricao: string;
                }[];
                tipoUsuario: {
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    descricao: string;
                }[];
            };
        };
        cliente: any;
        erro?: undefined;
    } | {
        erro: string;
        token?: undefined;
        usuario?: undefined;
        sistema?: undefined;
        cliente?: undefined;
    } | {
        msg: string;
        status: number;
    }>;
}
