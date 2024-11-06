import { PrismaService } from 'src/base/relacional/PrismaService';
export declare class PageLinkRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getPageLinkAll(empresa_configId: any): Promise<{
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }[]>;
    getNomeLInkExiste(nome_link: any): Promise<{
        links: {
            id: number;
            icon: string;
            label: string;
            href: string;
            page_linkId: string;
        }[];
    } & {
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
    getByIdPageNome(nome_link: any): Promise<{
        links: {
            id: number;
            icon: string;
            label: string;
            href: string;
            page_linkId: string;
        }[];
    } & {
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
    getByIdPageLink(id: any): Promise<{
        links: {
            id: number;
            icon: string;
            label: string;
            href: string;
            page_linkId: string;
        }[];
    } & {
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
    createPageLink(data: any): Promise<{
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
    updatePageLink(data: any): Promise<{
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
    deletePageLink(id: any): Promise<{
        id: string;
        clientId: number;
        profileText: string;
        nome_link: string;
        linkProfile: string;
        public: boolean;
        backgroundColor1: string;
        backgroundColor2: string;
        colorText1: string;
        colorText2: string;
        backgroundImage: string;
        buttonColor: string;
        showProfilePicture: boolean;
        showShareLink: boolean;
    }>;
}
