import { ConfigRepository } from '../repositories/config.repository';
import { EnumRepository } from 'src/repositories/enum.repository';
import { ConfigClienteRepository } from 'src/repositories/configCliente.repository';
import { ClientesRepository } from 'src/repositories/clientes.repository';
import { TaskRepository } from 'src/repositories/task.repository';
import { ChatRepository } from 'src/repositories/chat.repository';
export declare class ConfigService {
    private configRepository;
    private configClienteRepository;
    private enumRepository;
    private clientesRepository;
    private taskRepository;
    private chatRepository;
    constructor(configRepository: ConfigRepository, configClienteRepository: ConfigClienteRepository, enumRepository: EnumRepository, clientesRepository: ClientesRepository, taskRepository: TaskRepository, chatRepository: ChatRepository);
    getDashboard(empresa_configId: any): Promise<{
        totalCliente: number;
        totalLeads: number;
        totalPotencialNegocioInicial: number | import("@prisma/client/runtime/library").Decimal;
        totalPotencialNegocioFinal: number | import("@prisma/client/runtime/library").Decimal;
        chatAtivos: number;
        naochatsAtivos: number;
    }>;
    atualizarConfig(data: any): Promise<{
        id: number;
        email: string;
        telefone: string;
        responsavel: string;
        cep: string;
        logradouro: string;
        bairro: string;
        estado: string;
        cidade: string;
        pais: string;
        complemento: string;
        numero: string;
        created_at: Date;
        updated_at: Date;
        logo_link: string;
        cover_link: string;
        nome_empresa: string;
        nome_fantasia: string;
        cnpj_cpf: string;
        departamento: string;
        setor: string;
        currentPlanId: number;
        uuid: string;
    }>;
    getConfig(id: Number, token: string): Promise<{
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
    }>;
}
