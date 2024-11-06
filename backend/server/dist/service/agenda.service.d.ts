import { AgendaRepository } from 'src/repositories/agenda.repository';
import { ClientesRepository } from 'src/repositories/clientes.repository';
import { UsuarioRepository } from 'src/repositories/usuario.repository';
import { ConfigClienteRepository } from 'src/repositories/configCliente.repository';
export declare class AgendaService {
    private agenda;
    private clientesRepository;
    private usuarioRepository;
    private configClienteRepository;
    constructor(agenda: AgendaRepository, clientesRepository: ClientesRepository, usuarioRepository: UsuarioRepository, configClienteRepository: ConfigClienteRepository);
    atualizarAgenda(data: any): Promise<{
        Users: {
            id: number;
            userId: number;
            agendaId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    getAgendaByDataUsuario(data: any): Promise<any[]>;
    getAvailableTimes(date_day: any, empresa_configId: any, atendimentoId: any): Promise<void>;
    generateTimes(existingTimes: any): any[];
    getAllClienteAngendaUser(data: any): Promise<{
        usuario: {
            id: number;
            nome: string;
            cpf: string;
        };
        works: {
            id: number;
            nome: string;
        }[];
    }>;
    getAllAgendaAtendimentoUsuario(empresa_configId: any): Promise<import("../infra/DTO/agenda-dto").default[]>;
    getDataAgendamento(uuid: any): Promise<{
        id: number;
        Users: {
            id: number;
            nome: string;
            linkFoto: string;
        }[];
        logo_link: string;
        nome_empresa: string;
        produto: {
            id: number;
            nome: string;
            codigo: string;
            link_img: string;
        }[];
    }>;
    getHorariosDisponiveis(data: any): Promise<string[]>;
    getAllAgenda(empresa_configId: any): Promise<import("../infra/DTO/agenda-dto").default[]>;
    createAgenda(data: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    criarAgendamentoExterno(data: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
    deleteAgenda(data: any): Promise<{
        id: number;
        title: string;
        description: string;
        className: string;
        status: string;
        date_start: Date;
        date_end: Date;
        created_at: Date;
        updated_at: Date;
        taskId: string;
    }>;
}
