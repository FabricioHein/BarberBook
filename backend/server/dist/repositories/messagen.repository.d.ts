import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class MessagesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getAllChatMsgm(id: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }[]>;
    getByChatUuidMessages(uuid: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }[]>;
    getByChatUuidMessagesLast(uuid: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }[]>;
    createMessages(data: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }>;
    updateeMessage(id: any, data: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }>;
    deleteMessage(id: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }>;
    deleteMessageChatId(id: any): Promise<{
        created_at: Date;
        updated_at: Date;
        type: string;
        chat_id: number;
        message_id: number;
        username: string;
        text: string;
        whatsapp_id: string;
        atendimento: boolean;
    }>;
}
