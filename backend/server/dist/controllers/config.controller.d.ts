import { ConfigService } from '../service/config.service';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: ConfigService);
    atualizarConfig(req: any): Promise<{
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
    getDashboard(empresa_configId: any): Promise<any>;
}
