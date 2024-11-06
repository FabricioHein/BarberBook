import { FileHelper } from 'src/helper/file.helper';
import { PageLinkRepository } from 'src/repositories/pageLink.repository';
export declare class PageLinkService {
    private pageLinkRepository;
    private fileHelper;
    constructor(pageLinkRepository: PageLinkRepository, fileHelper: FileHelper);
    imagePageLink(data: any): Promise<string>;
    atualizarPageLink(data: any): Promise<{
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
    getNomeLInkExiste(nome_link: any): Promise<{
        msg: string;
        error: boolean;
    }>;
    getPageLinkByNome_link(nome_link: any): Promise<{
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
    getPageLinkById(id: any): Promise<{
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
    getAllPageLink(empresa_configId: any): Promise<{
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
    createPageLink(data: any): Promise<{
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
    deletePageLink(data: any): Promise<{
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
