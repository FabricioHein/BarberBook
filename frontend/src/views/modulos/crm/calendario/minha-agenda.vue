<template>

    <div class="layout-px-spacing apps-calendar">
        <div class="layout-px-spacing">
            <div class="layout-top-spacing" v-if="usuario">
                <h6>{{ add ? page : 'Minha Agenda' }}</h6>
                <div class="action-btn layout-top-spacing mb-5 d-flex justify-content-end">

                    <button type="button" id="add-list" class="btn btn-primary" title="Adicionar Novo"
                        @click="edit_event()">
                        <i class="bi bi-person-add"></i>
                    </button>
                </div>

                <div class="col">
                    <div class="statbox panel box box-shadow">
                        <div class="calendar-upper-section">
                            <div class="row">
                                <div class="col-md-8 col-12">
                                    <!-- <div class="labels text-md-start text-center">
                                    <p class="label label-primary">Work</p>
                                    <p class="label label-warning">Travel</p>
                                    <p class="label label-success">Personal</p>
                                    <p class="label label-danger">Important</p>
                                </div> -->
                                </div>

                                <div class="col-md-4 col-12">


                                </div>
                            </div>
                        </div>
                        <FullCalendar ref="fullCalendar" :options="options">
                            <template v-slot:eventContent="arg">
                                <div class="fc-event-main-frame">
                                    <div class="fc-event-time">{{ arg.timeText }}</div>
                                    <div class="fc-event-title-container">
                                        <div class="fc-event-title fc-sticky">{{ arg.event.title }}</div>
                                    </div>

                                    <div class="calendar-tlp">
                                        <div class="p-2 bg-dark text-white text-start text-wrap">{{ arg.timeText + ' : '
                                            + arg.event.title }}</div>
                                        <div class="p-2 text-start text-wrap">
                                            {{ arg.event.extendedProps ? arg.event.extendedProps.description : '' }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </FullCalendar>
                    </div>
                </div>

                <!-- The Modal -->
                <div id="addEventsModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md modal-dialog-right">
                        <div class="modal-content mailbox-popup">
                            <div class="modal-header">
                                <h5 class="modal-title">{{ params.id ? 'Editar Agendamento' : 'Add Agendamento' }}</h5>
                                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"
                                    class="btn-close"></button>
                            </div>
                            <div class="modal-body">

                                <!-- Campo de Seleção de Data -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <h6 class="text-center">Selecione o Barbeiro:</h6>
                                        <div class="form-group mb-4">
                                            <div class="d-flex justify-content-center mb-3">
                                                <SelectVue v-model:value="options.selectedBarbeiro"
                                                    :data="options.barbeiros">
                                                </SelectVue>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" v-if="options.selectedBarbeiro != ''">
                                        <h6 class="text-center">Selecione um dia e horário:</h6>

                                        <div class="form-group mb-4">
                                            <div class="d-flex justify-content-center mb-3">
                                                <input :min="options.minDate" type="date" v-model="options.selectedDate"
                                                    class="form-control w-50" @change="setDay(options.selectedDate)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="d-flex flex-wrap justify-content-center"
                                            v-if="options.selectedDate !== ''">
                                            <div v-for="horario in options.horarios" :key="horario" class="p-2">
                                                <button
                                                    :class="['btn', options.selectedHorario === horario ? 'btn-primary' : 'btn-outline-primary']"
                                                    @click="setHorario(horario)">
                                                    {{ horario }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 p-2" v-if="options.selectedHorario != null">
                                        <h6 class="text-center">Busque um Cliente ou CPF</h6>

                                        <div class="form-group mb-4">
                                            <div class="d-flex flex-wrap justify-content-center">
                                                <input type="text" class="form-control w-50"
                                                    placeholder="CPF ou Nome do Cliente"
                                                    v-model="options.cliente_nome_agendamento" @input="findContato()" />

                                            </div>
                                            <div v-if="options.contatosLista.length > 0" class="contatos-lista">
                                                <ul v-for="contato in options.contatosLista" class="contato-item">
                                                    <li @click="setCliente(contato)">
                                                        <span class="nome">{{ contato.nome }} {{ contato.sobrenome
                                                            }}</span>
                                                        <span class="cpf">- {{ contato.cpf }}</span>
                                                        <span class="telefone">- {{ contato.telefone }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>
                            <div class="modal-footer">
                            {{ params }}
                                <button type="button" class="btn btn-danger" data-dismiss="modal"
                                    data-bs-dismiss="modal" @click="cancel()">Cancelar Agendamento</button>

                                <button type="button" class="btn btn-light" data-dismiss="modal" data-bs-dismiss="modal"
                                    @click="getOut()">Sair</button>
                                <button type="button" class="btn btn-success" @click="save_event()">{{ params.id ?
                                    'Atualizar' : 'Add Agendamento' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import '@/assets/sass/apps/calendar.scss';

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import AgendaService from '@/service/agenda-service';
import AgendaModel from './model/agendaModel';
import AgendaRetornoModel from './model/agendaRetornoModel';
//flatpickr
import ContatosService from '@/service/contatos-service';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import '@/assets/sass/forms/custom-flatpickr.css';
import store from '@/store';
import { useMeta } from '@/composables/use-meta';
import SelectVue from '@/components/SelectVue.vue';
import usuarioService from '@/service/usuario-service';
useMeta({ title: 'Fullcalendar Drag and Drop Event' });

const token = store.getters.token;
const cliente = store.getters.cliente;
const usuario = store.getters.usuario;
const permissao = store.getters.permissao;

const defaultParams = ref({ id: null, title: '', start: '', end: '', description: '', className: 'bg-primary' });
const params = ref(JSON.parse(JSON.stringify(defaultParams.value)));

const options = ref({
    selectedHorario: null,
    cliente_nome_agendamento: '',
    telefone_cliente_agendamento: '',
    id_cliente_agendamento: null,
    contatosLista: '',
    selectedBarbeiro: '',
    minDate: '',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    views: {
        dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'short' } // Exibir mês abreviado e ano numérico
        },
        timeGridWeek: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        },
        timeGridDay: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        }
    },
    selectedDate: null,
    locale: ptBrLocale, // Adicione esta linha para definir o idioma para português do Brasil
    editable: true,
    droppable: true,
    dayMaxEvents: true,
    selectable: true,
    eventClick: null,
    select: null,
    eventMouseEnter: null,
    eventMouseLeave: null,
    events: [],
    horarios: [],
    barbeiros: []
});


let addEventsModal = ref(null);
const fullCalendar = ref(null);
const min_date_start = ref('');
const min_date_end = ref('');
const formatDay = {
    enableTime: true,
    dateFormat: 'd-m-Y H:i',
    minDate: min_date_start,
    time_24hr: true
};
onMounted(async () => {

    initPopup();
    await bind_events();
    options.value.eventClick = edit_event;
    options.value.eventMouseEnter = event_mouse_hover;
    options.value.eventMouseLeave = event_mouse_leave;

    options.value.minDate = getTodayDate();
    getAllBarbeiros();
});

const initPopup = () => {
    addEventsModal = new window.bootstrap.Modal(document.getElementById('addEventsModal'));
};

const findContato = async () => {

    if ((options.value.cliente_nome_agendamento).length > 3) {
        const contatos = new ContatosService({}, token, `/api/clientes/filter/name-cpf/${options.value.cliente_nome_agendamento}`);
        options.value.contatosLista = await contatos.getByIdNomeOrNumber();
    }
}

const getAllBarbeiros = async () => {

    const usuarioServ = new usuarioService(
        {}, token,
        `/api/usuario/todos/${cliente.id}`);

    let data = await usuarioServ.getAllUsuarios();
    // Filtra e retorna apenas os usuários com TipoUsuario == 1
    let filteredData = data.filter(usuario => usuario.tipoUsuarioId == 1);

    options.value.barbeiros = filteredData.map((i) => {
        return {
            id: i.id,
            descricao: i.nome
        }
    });
}

const bind_events = async () => {
    const todasAgendas = new AgendaService({}, token, `/api/agenda/todos/${cliente.id}`);
    const agendas = await todasAgendas.getAllAgenda();
    console.log(agendas)
    options.value.events = agendas || [];

    setup_draggable();
};

const get_month = (dt, add = 0) => {
    let month = dt.getMonth() + 1 + add;
    return dt.getMonth() < 10 ? '0' + month : month;
};

const edit_date = (data) => {
    let obj = {
        event: { start: data.start, end: data.end },
    };
    edit_event(obj);
};
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const day = String(today.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
}
const event_mouse_hover = (data) => {
    let element = data.el.querySelector('.calendar-tlp');
    element.classList.add('d-block');
};

const setCliente = (cliente) => {
    options.value.cliente_nome_agendamento = cliente.nome + ' ' + cliente.sobrenome;
    options.value.id_cliente_agendamento = cliente.id;
    options.value.telefone_cliente_agendamento = cliente.telefone;
    options.value.contatosLista = [];


    console.log(cliente)
};

const event_mouse_leave = (data) => {
    let element = data.el.querySelector('.calendar-tlp');
    element.classList.remove('d-block');
};


const formatDate = (date) => {// String original

    let data = new Date(date);
    let dataHora = data.toISOString().split('T')[0]; // Data
    let horaMinuto = data.toTimeString().split(' ')[0]; // Hora e Minuto
    let horaMinutoSemSegundos = horaMinuto.split(':').slice(0, 2).join(':'); // Remover os segundos

    return `${dataHora}T${horaMinutoSemSegundos}`

}
const end_date_change = () => { };
const edit_event = (data) => {
    console.log(data)
    params.value = JSON.parse(JSON.stringify(defaultParams));

    if (data) {
        let obj = JSON.parse(JSON.stringify(data.event));

        params.value = {
            id: obj.id,
            title: obj.title,
            start: obj.start ? formatDate(obj.start) : new Date(),
            end: obj.end ? formatDate(obj.end) : new Date(),
            description: obj.extendedProps ? obj.extendedProps.description : '',
            className: obj.classNames ? obj.classNames[0] : '',
        };

        min_date_start.value = obj.start ? formatDate(obj.start) : new Date();
        min_date_end.value = obj.end ? formatDate(obj.end) : new Date();


    } else {
        min_date_start.value = new Date();
        min_date_end.value = new Date();
    }

    addEventsModal.show();
};
const setDay = async (selectedDate) => {
    const dia = new Date(`${selectedDate}T00:00`);

    options.value.selectedDate = selectedDate;

    const payload = {
        dia: dia,
        uuid: cliente.uuid,
        barbeiroId: options.value.selectedBarbeiro
    };

    const addAgendaUsuario = new AgendaService(payload, token);
    const data = await addAgendaUsuario.getHorariosDiario();
    console.log(data)
    if (data) {
        options.value.horarios = data;
    };

}

const setHorario = async (horario) => {
    options.value.selectedHorario = horario;
    const dataHora = `${options.value.selectedDate}T${options.value.selectedHorario}:00`;
    const dateObject = new Date(dataHora);

    const payload = {
        dia: dataHora,
        uuid: cliente.uuid,
        barbeiroId: options.selectedBarbeiro
    };

    const addAgendaUsuario = new AgendaService(payload, token);
    const data = await addAgendaUsuario.deleteAgenda();

    console.log(dateObject)
}
const cancel = async () => {

    if (params.value.id) {
        //update event
        let eventEdit = options.value.events.find((d) => d.id == params.value.id);

        const modelAgenda = new AgendaModel(eventEdit);

        const addAgendaUsuario = new AgendaService(modelAgenda, token);
        const data = await addAgendaUsuario.deleteAgenda();
        if (data) {

            await bind_events();
            showMessage('Cancelado com Sucesso!');
        };
    };
    fullCalendar.value.getApi(); //refresh calendar
    addEventsModal.hide();

}
const getOut = async () => {

    if (params.value.id) {
        //update event
        let eventEdit = options.value.events.find((d) => d.id == params.value.id);

        const modelAgenda = new AgendaModel(eventEdit);

        const addAgendaUsuario = new AgendaService(modelAgenda, token);
        //  const data = await addAgendaUsuario.deleteAgenda();
        //  if(data){

        //     showMessage('Cancelado com Sucesso!');
        //  };
    };
    fullCalendar.value.getApi(); //refresh calendar
    addEventsModal.hide();

}

const save_event = async () => {
    if (!params.value.title) {
        showMessage('Título é obrigatório.', 'error');
        return true;
    }
    if (!params.value.start) {
        showMessage('Data de Inicio é obrigatório.', 'error');
        return true;
    }

    if (params.value.id) {
        //update event
        let event = {
            id: params.value.id,
            title: params.value.title,
            start: params.value.start,
            end: params.value.end,
            description: params.value.description,
            className: params.value.className || 'bg-danger',
            clientIds: []
        };

        options.value.events = options.value.events.find((d) => d.id != params.value.id)
        console.log(options.value.events)

        if (formatDate(event.start) > formatDate(event.end)) {
            showMessage('Date Inicial Maior que a final', 'error');
            return
        };
        const modelAgenda = new AgendaModel(event);
        modelAgenda.userIds.push(usuario.id);

        const addAgendaUsuario = new AgendaService(modelAgenda, token);
        const data = await addAgendaUsuario.atualizarAgenda();

        if (data.data.id) {
            await bind_events();
            showMessage('Editado com Sucesso!');
        };
    } else {
        //add event


        let event = {
            title: params.value.title,
            start: params.value.start,
            end: params.value.end,
            description: params.value.description,
            className: params.value.className || 'bg-danger',
            clientIds: []

        };
        if (formatDate(event.start) > formatDate(event.end)) {
            showMessage('Data Inicial Maior que a final', 'error');
            return
        };
        console.log(event)
        const modelAgenda = new AgendaModel(event);
        modelAgenda.userIds.push(usuario.id);
        const addAgendaUsuario = new AgendaService(modelAgenda, token);

        const data = await addAgendaUsuario.criarAgenda();
        if (data.id) {
            const novoEvento = new AgendaRetornoModel(data);
            console.log(options.value.events)
            console.log(novoEvento)
            options.value.events.push(novoEvento);
            showMessage('Evento Cadastrado Com Sucesso!');
        };

    }
    fullCalendar.value.getApi(); //refresh calendar
    addEventsModal.hide();
};
const setup_draggable = () => {
    new Draggable(document.querySelector('.fc-view'), {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            let event = {
                title: eventEl.innerText,
                duration: '01:00',
            };
            return event;
        },
    });
};

const showMessage = (msg = '', type = 'success') => {
    const toast = window.Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};
</script>
<style>
.modal-dialog-right {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    height: 100%;
    max-width: 80vh;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
}

.modal.show .modal-dialog-right {
    transform: translateX(0);
}

.modal-dialog-right .modal-content {
    height: 100%;
    border-radius: 0;
    overflow-y: auto;
    /* Adiciona a capacidade de rolagem vertical */
}

/* Container geral da lista */
.contatos-lista {
    max-width: 600px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Cada item da lista */
.contato-item {
    list-style: none;
    margin-bottom: 10px;
}

/* Estilos dos itens de contato */
.contato-item li {
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background-color: #fff;
    transition: background-color 0.3s ease;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Estilo para o hover */
.contato-item li:hover {
    background-color: #f0f0f0;
}

/* Quando clicado */
.contato-item li:active {
    background-color: #e0e0e0;
}

/* Nome do contato */
.contato-item .nome {
    font-weight: bold;
    font-size: 16px;
    color: #333;
}

/* CPF e Telefone */
.contato-item .cpf,
.contato-item .telefone {
    font-size: 14px;
    color: #666;
}

/* Responsivo para telas menores */
@media (max-width: 600px) {
    .contato-item li {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>