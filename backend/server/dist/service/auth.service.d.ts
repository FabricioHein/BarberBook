import { ConfigService } from 'src/service/config.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from 'src/repositories/usuario.repository';
export declare class AuthService {
    private usuarioRepository;
    private configService;
    private jwtService;
    constructor(usuarioRepository: UsuarioRepository, configService: ConfigService, jwtService: JwtService);
    getGoogleCalendarEvents(accessToken: string): Promise<any>;
    validateUser(username: string, pass: string): Promise<any>;
    validarTokenGoogle(token: string): Promise<boolean>;
    validaEmail(uuid: any): Promise<{
        msg: string;
        status: number;
    }>;
    loginAcessoGoogle(data: any): Promise<{
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
    loginAcesso(data: any): Promise<{
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
