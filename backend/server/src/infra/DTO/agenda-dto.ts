class AgendaRetornoModel {
    id: number | string;
    title: string;
    description: string;
    className: string;
    start: string;
    end: string;
    status: string;
    agenda_cliente: any[];
    Users: any[];

    constructor(data: { id: any; title: any; description: any; className: any; date_start: any; date_end: any; status: string; agenda_cliente: any[]; Users: any }) {
        this.id = data.id ? Number(data.id) : ''; // Convertendo para número ou string vazia
        this.title = String(data.title || ''); // Garantindo que será string
        this.description = String(data.description || '');
        this.className = String(data.className || '');
        this.status = String(data.status || '');
        this.start = this.formatDate(data.date_start); // Formatando a data de início
        this.end = this.formatDate(data.date_end);     // Formatando a data de término
        this.agenda_cliente = data.agenda_cliente || []; // Garantindo array vazio se não existir
        this.Users = data.Users || [];                 // Garantindo array vazio se não existir
    }

    // Método privado para formatar a data no formato esperado
    private formatDate(date: Date | string): string {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return '';  // Verifica se a data é inválida

        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const hours = String(parsedDate.getHours()).padStart(2, '0');
        const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

export default AgendaRetornoModel;
