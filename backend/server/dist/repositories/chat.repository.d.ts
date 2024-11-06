import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class ChatRepository {
    private prisma;
    constructor(prisma: PrismaService);
    countChatsByEmpresaNaoAtivo(empresa_configId: any): Promise<number>;
    countChatsByEmpresaAtivo(empresa_configId: any): Promise<number>;
    getChatByTelefoneByUuidInfoChat(chat_telefone: any, uuid_chat_info: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }[]>;
    getChatAll(clienteId: any): Promise<({
        chat_info: {
            uuid: string;
        };
    } & {
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    })[]>;
    getChatTelefoneEmail(email: any, telefone: any): Promise<{
        chat_info: {
            uuid: string;
        };
        messages: {
            created_at: Date;
            updated_at: Date;
            type: string;
            chat_id: number;
            message_id: number;
            username: string;
            text: string;
            whatsapp_id: string;
            atendimento: boolean;
        }[];
    } & {
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    getAllChatClose(clienteId: any): Promise<({
        chat_info: {
            uuid: string;
            type: string;
        };
    } & {
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    })[]>;
    getAllChatOpen(clienteId: any): Promise<({
        chat_info: {
            uuid: string;
            type: string;
        };
    } & {
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    })[]>;
    getByUiidChat(uuid: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    getByIdChat(id: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    createChat(data: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    updateChat(id: any, data: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    deleteChat(id: any): Promise<{
        created_at: Date;
        updated_at: Date;
        taskId: string;
        nome: string;
        telefone: string;
        email: string;
        empresa_configId: number;
        uuid: string;
        data_close: Date;
        chat_id: number;
        chat_info_id: number;
        chat_open: boolean;
        nome_usuario_close: string;
        chat_app: string;
    }>;
    deleteChatChatInfo(id: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
