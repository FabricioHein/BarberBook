"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AgendaRetornoModel {
    constructor(data) {
        this.id = data.id ? Number(data.id) : '';
        this.title = String(data.title || '');
        this.description = String(data.description || '');
        this.className = String(data.className || '');
        this.status = String(data.status || '');
        this.start = this.formatDate(data.date_start);
        this.end = this.formatDate(data.date_end);
        this.agenda_cliente = data.agenda_cliente || [];
        this.Users = data.Users || [];
    }
    formatDate(date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime()))
            return '';
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const hours = String(parsedDate.getHours()).padStart(2, '0');
        const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}
exports.default = AgendaRetornoModel;
//# sourceMappingURL=agenda-dto.js.map