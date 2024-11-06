declare class AgendaRetornoModel {
    id: number | string;
    title: string;
    description: string;
    className: string;
    start: string;
    end: string;
    status: string;
    agenda_cliente: any[];
    Users: any[];
    constructor(data: {
        id: any;
        title: any;
        description: any;
        className: any;
        date_start: any;
        date_end: any;
        status: string;
        agenda_cliente: any[];
        Users: any;
    });
    private formatDate;
}
export default AgendaRetornoModel;
