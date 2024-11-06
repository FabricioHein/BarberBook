<template>
    <page :params="getAcesso()">

        <div class="layout-px-spacing">

            <div class="action-btn layout-top-spacing d-flex justify-content-end">

                <button type="button" id="add-list" class="btn btn-primary" @click="edit_project()">
                    Criar Board
                </button>
            </div>
            <div class="row scrumboard" id="cancel-row">
                <div class="col-lg-12 layout-spacing">
                    <div class="task-list-section">
                        <div v-for="project in project_list" :key="project.etapa" class="task-list-container">
                            <h5>{{ project.title }}</h5>
                            <div class="custom-div" :style="colorProjBackground(project.color)">
                            </div>

                            <div class="connect-sorting">
                                <a href="javascript:;" id="ddlMore"
                                    class="btn dropdown-toggle btn-icon-only d-flex justify-content-end"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-more-horizontal">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>

                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlMore">
                                    <li><a href="javascript:;" class="dropdown-item"
                                            @click="edit_project(project)">Editar</a></li>
                                    <li><a href="javascript:;" class="dropdown-item"
                                            @click="delete_project(project)">Apagar</a></li>
                                    <!-- <li><a href="javascript:;" class="dropdown-item"
                                            @click="clear_project(project)">Limpar Todos</a></li> -->
                                </ul>
                                <div class="card-body">
                                    <b>Total em Negócios: R$</b> {{ setValorTotal(project) }}
                                </div>

                                <div class="task-container-header">
                                    <button type="button" class="btn btn-light" :style="'width: 100%'"
                                        @click="createEditeLeads(task, project)">
                                        Criar Lead
                                    </button>
                                </div>

                                <draggable @dragend="move(project, taskMove)" class="connect-sorting-content"
                                    group="default" ghost-class="ui-state-highlight" drag-class="ui-sortable-helper"
                                    :animation="200">
                                    <div v-for="task in project.task" :key="project.id + '' + task.id"
                                        @dragover="moveTask(task)" class="card task-text-progress cursor-move ui-sortable-handle cursor-p
                                                                ">
                                        <div class="card-body" @dblclick="createEditeLeads(task, project)">
                                            <div v-if="task.image" class="px-2 pt-2">
                                                <img src="@/assets/images/taskboard.jpg" class="img-fluid rounded"
                                                    alt="scrumboard" />
                                            </div>

                                            <div class="task-header">
                                                <h4>{{ task.title }}</h4>
                                            </div>
                                            <div class="task-body">
                                                <div class="task-bottom">
                                                    <i class="bi bi-people">

                                                        Contato: {{ task.contato_nome || ' Sem Infomação' }}
                                                    </i>
                                                    <!-- Status: {{ task.status || ' Sem Infomação' }} -->

                                                </div>
                                                <div class="task-bottom">
                                                    <i class="bi bi-cash-coin">
                                                        Valor de Negócio R$: {{
                                                            Number(task.valor_Inicial).toLocaleString('pt-br',
                                                                { minimumFractionDigits: 2 })
                                                            || 0 }}
                                                    </i>

                                                </div>
                                                <div class="task-bottom">
                                                    <i class="bi bi-thermometer-snow">
                                                        Temperatura: {{ temperatura(task.status) }}
                                                    </i>
                                                </div>

                                                <div class="task-bottom">
                                                    <div class="tb-section-2">
                                                        <a href="javascript:;" @click="createEditeLeads(task, project)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="feather feather-edit-2 s-task-edit">
                                                                <path
                                                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                        <a href="javascript:;"
                                                            @click="delete_confirm(project.id, task)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="feather feather-trash-2 s-task-delete">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path
                                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                                </path>
                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </draggable>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div id="addListModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-right">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Editar Processo' : 'Cria Board' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"
                                class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content" id="addListModalTitle">
                                    <form action="javascript:void(0);">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group mb-0">
                                                    <label>Nome do Processo</label>
                                                    <input type="text" v-model="params.title" class="form-control"
                                                        placeholder="Nome" />
                                                </div>
                                                <div class="form-group mb-0">
                                                    <label>Etapa</label>
                                                    <input type="number" v-model="params.etapa" class="form-control" />
                                                </div>
                                                <div class="form-group mb-0">
                                                    <label>Cor do Processo</label>
                                                    <input type="color" v-model="params.color"
                                                        class="form-control form-control-color" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dangernn" data-dismiss="modal"
                                data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-success" @click="save_project()">{{ params.id ?
                                'Atualizar' : 'Criar Board' }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="addTaskModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-right">

                    <div class="modal-content">
                        <div class="modal-header">

                            <div>
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" id="cadastro-tab" data-bs-toggle="tab"
                                            href="#cadastro" role="tab" aria-controls="cadastro"
                                            aria-selected="true">Cadastro</a>
                                    </li>
                                    <li class="nav-item" role="presentation" v-if="params_task.id">
                                        <a class="nav-link" id="tarefas-tab" data-bs-toggle="tab" href="#tarefas"
                                            role="tab" aria-controls="tarefas" aria-selected="false">Tarefas</a>
                                    </li>
                                </ul>

                                <!-- Tab content -->

                            </div>
                        </div>
                        <div class="tab-content">
                            <!-- Cadastro Tab -->
                            <div class="tab-pane fade show active" id="cadastro" role="tabpanel"
                                aria-labelledby="cadastro-tab">
                                <div class="container mt-3">

                                    <div class="form">
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Título </label>
                                                <input type="text" class="form-control" v-model="params_task.title" />

                                                <label>Temperatura da Venda</label>
                                                <select v-model="params_task.status" class="form-select">
                                                    <option v-for="m in statusTemperatura" :value="m.value">{{
                                                        m.nome }}
                                                    </option>
                                                </select>

                                                <label>Nome Contato</label>
                                                <input type="text" class="form-control" placeholder="Pesquise o Contato"
                                                    v-model="params_task.contato_nome" @input="findContato()" />

                                                <div v-if="contatoNome">
                                                    <ul>
                                                        <li v-for="contato in contatosLista"
                                                            @click="setContato(contato)">
                                                            {{ contato.nome }} {{ contato.sobrenome }} {{ ' - '
                                                            }} {{
                                                                contato.cpf }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <label for="cpf">CPF</label>
                                                <input v-model="params_task.cpf" v-maska="'###.###.###-##'"
                                                    placeholder="CPF" type="text" class="form-control" />

                                                <label>Valor Inicial</label>
                                                <inputMoney v-model="params_task.valor_Inicial" :options="options" />

                                                <label>Valor Final</label>
                                                <inputMoney v-model="params_task.valor_Final" :options="options" />

                                                <label>Vendedor</label>
                                                <select v-model="params_task.usersId" class="form-select">
                                                    <option v-for="m in vendedor" :value="m.id">{{ m.nome }}
                                                    </option>
                                                </select>

                                                <label>Previsão de Fechamento</label>
                                                <input v-model="params_task.previsao_fechamento" class="form-control"
                                                    type="date" />

                                                <label>Número</label>
                                                <input type="text" class="form-control" v-maska="'+55(##)#####-####'"
                                                    placeholder="__-_______" v-model="params_task.contato_numero" />

                                                <label>Empresa</label>
                                                <input type="text" class="form-control" v-model="params_task.empresa" />

                                                <template v-if="motivos">

                                                    <label>Motivos</label>
                                                    <select v-model="params_task.motivosId" class="form-select">
                                                        <option v-for="m in motivos" :value="m.id">{{ m.nome }}
                                                        </option>
                                                    </select>
                                                </template>

                                                <label>Produtos / Serviços</label>
                                                <select v-model="params_task.produtoId" class="form-select">
                                                    <option v-for="m in produtos" :value="m.id">{{ m.nome }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div class="col-12">
                                                <label>Descrição</label>
                                                <quill-editor theme="snow" v-model:value="params_task.description"
                                                    :options="descricao" style="min-height: 100px"></quill-editor>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>



                        </div>
                        <div class="tab-pane fade" id="tarefas" role="tabpanel" aria-labelledby="tarefas-tab">
                            <div class="container mt-3">
                                <div>
                                    <!-- Botão para abrir o modal -->
                                    <button type="button" class="btn btn-primary" @click="openModal">
                                        Cadastrar Atividade
                                    </button>

                                    <!-- Modal de Cadastro -->
                                    <div class="modal fade" :class="{ show: showModal }" tabindex="-1"
                                        style="display: block;" v-if="showModal">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Cadastrar Nova Atividade</h5>
                                                    <button type="button" class="btn-close"
                                                        @click="closeModal"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">
                                                        <label for="activityName" class="form-label">Nome da
                                                            Atividade</label>
                                                        <input v-model="newActivity.title" type="text"
                                                            class="form-control" id="activityName"
                                                            placeholder="Digite o nome da atividade" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="star" class="form-label">De</label>
                                                        <input type="datetime-local" v-model="newActivity.start"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="de" class="form-label">Até</label>
                                                        <input type="datetime-local" v-model="newActivity.end"
                                                            class="form-control" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="activityDescription"
                                                            class="form-label">Descrição</label>
                                                        <textarea v-model="newActivity.description" class="form-control"
                                                            id="activityDescription" rows="3"
                                                            placeholder="Digite a descrição"></textarea>
                                                    </div>


                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        @click="closeModal">Fechar</button>
                                                    <button type="button" class="btn btn-primary"
                                                        @click="addActivity(params_task)">Salvar
                                                        Atividade</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Lista de Atividades Cadastradas -->
                                    <div class="mt-3">
                                        <h4>Atividades Cadastradas</h4>
                                        <ul class="list-group">
                                            <li v-for="(activity, index) in activities" :key="index"
                                                class="list-group-item">
                                                <h5>{{ activity.title }}</h5>
                                                <p>{{ activity.start }}</p>
                                                <a href="javascript:;" @click="updateActivity(activity)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-edit-2 s-task-edit">
                                                        <path
                                                            d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                        </path>
                                                    </svg>
                                                </a>
                                                <a href="javascript:;" @click="deleteActivity(activity)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-trash-2 s-task-delete">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path
                                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                        </path>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </a>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="closeModalSubTask()">Voltar</button>
                            <button type="button" class="btn btn-success" @click="saveSubTaskLeads">Salvar</button>
                        </div>

                    </div>
                </div>

            </div>



            <div id="deleteConformation" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content mailbox-popup">
                        <div class="modal-header">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-trash-2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </div>
                            <h5 class="modal-title" id="exampleModalLabel">Deseja Apagadar a Lead?</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"
                                class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="">Se você excluir a Lead, ela desaparecerá para sempre. Tem certeza de que deseja
                                continuar?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-remove="task" class="btn btn-danger"
                                @click="delete_task()">Apagar</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </page>
</template>

<style>
.ql-container,
.ql-editor {
    min-height: inherit;
}

.ql-editor {
    max-height: 200px;
}

.ql-toolbar.ql-snow .ql-picker-label {
    border: 1px solid transparent;
    color: #000;
}

.ql-snow .ql-stroke {
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
    fill: #000;
}

#addTaskModal .ql-toolbar.ql-snow {
    border: 1px solid #bfc9d4;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
    border-radius: 6px;
    margin-top: 0;
}

.ql-container.ql-snow {
    border-top: 0px;
    margin-top: 10px;
    padding: 13px 0;
    border: 1px solid #bfc9d4 !important;
    border-radius: 6px;
}

.vue-easymde .editor-toolbar {
    border: 1px solid #ddd;
    border-radius: 6px;
    opacity: 1;
}

.vue-easymde .CodeMirror {
    margin-top: 10px;
    border-radius: 6px;
}

.vue-easymde .editor-toolbar button {
    color: #000 !important;
}

.vue-easymde .editor-toolbar button.active,
.vue-easymde .editor-toolbar button:hover {
    border-color: #000 !important;
    opacity: 0.6;
}

.vue-easymde .CodeMirror-fullscreen,
.vue-easymde .editor-preview-side {
    z-index: 9999 !important;
    margin-top: 0 !important;
}

.modal-dialog-right {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    height: 100%;
    max-width: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
}

.modal-dialog-right.active {
    transform: translateX(0);
}

.modal.show .modal-dialog-right {
    transform: translateX(0);
}

.modal-dialog-right .modal-content {
    height: 100%;
    border-radius: 0;
}

/* CSS para adicionar barra de rolagem */
.modal-dialog-right .modal-content {
    overflow-y: auto;
    /* Adiciona rolagem vertical */
}

.modal-dialog-right .modal-body {
    overflow-y: auto;
    /* Adiciona rolagem vertical */
}

.custom-div {
    position: relative;
    padding: 2px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    /* Espaço acima e abaixo da div */
}
</style>


<script>
import ProcessoCrmService from '@/service/processo-service.js';
import TaskCrmService from "@/service/task-service.js";
import store from '@/store';
import VueEasymde from 'vue-easymde';
import 'easymde/dist/easymde.min.css';
import router from '@/router/index';
import '@/assets/sass/apps/scrumboard.scss';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import Acesso from '@/helpers/Acesso';
import page from '@/views/components/page.vue';
import detalhesLeads from '../detalhes-leads/detalhes-leads.vue';
import TaskModel from '@/views/modulos/crm/detalhes-leads/components/model/taskModel';

import inputMoney from '@/views/components/input-money.vue';
import InputVue from '@/components/Input-validate.vue';
import ContatosService from '@/service/contatos-service';
import motivosService from '@/service/motivos-service';
import produtoService from '@/service/produto-service';
import usuarioService from '@/service/usuario-service';
import AgendaService from '@/service/agenda-service';
import AgendaModel from './model/agendaModel';

import { mapGetters } from 'vuex';
import 'vue3-quill/lib/vue3-quill.css';
import { quillEditor } from 'vue3-quill';

export default {
    components: {
        VueEasymde,
        draggable,
        page,
        detalhesLeads,
        inputMoney,
        quillEditor
    },

    data() {
        return {
            descricao: {
                placeholder: 'Escreva',
                modules: {
                    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
                },
            },
            valorInit: 0,
            valorFinal: 0,
            motivos: null,
            produtos: null,
            vendedor: null,
            etapa: null,
            statusTemperatura: [{
                value: 'frio',
                nome: 'Frio - ✩'
            },
            {
                value: 'morno',
                nome: 'Morno - ✩✩'
            },
            {
                value: 'quente',
                nome: 'Quente - ✩✩✩'
            }],
            add: null,
            options: {
                currency: 'BRL',
                hideCurrencySymbolOnFocus: false,
                hideGroupingSeparatorOnFocus: false,
                hideNegligibleDecimalDigitsOnFocus: false,
            },
            conteudo: '',
            contatoNome: false,
            contatosLista: [],
            params: { id: null, title: '', color: '' },
            token: store.getters.token,
            permissao: store.getters.permissao,
            cliente: store.getters.cliente,
            usuario: store.getters.usuario,
            params_task: { project_id: null, id: null, title: '', description: '' },
            project_task: { id: null, title: '', description: '' },
            project_list: [],
            deleted_task: { project_id: null, id: null },
            addListModal: null,
            addTaskModal: null,
            deleteConformation: null,
            taskMove: null,
            showModal: false,
            newActivity: {
                name: '',
                description: ''
            },
            activities: []
        };
    },
    async created() {

        if (!this.motivos) {
            const motivos = new motivosService(
                {}, this.token,
                `/api/task/getAllMotivos/${this.cliente.id}`);
            this.motivos = await motivos.getAllMotivos();

        }
        if (!this.produtos) {
            const produto = new produtoService(
                {}, this.token,
                `/api/produto/todos/${this.cliente.id}`);
            this.produtos = await produto.getAllProdutos();
        }
        if (!this.vendedor) {
            const usuarioServ = new usuarioService({}, this.token, `/api/usuario/todos/${this.cliente.id}`);
            const data = await usuarioServ.getAllUsuarios();
            this.vendedor = data.map((v) => {

                if (v.sobrenome) {
                    return {
                        id: v.id,
                        nome: v.nome + ' ' + v.sobrenome
                    }
                }
                return {
                    id: v.id,
                    nome: v.nome
                }
            })
            console.log(this.vendedor)
        }

    },

    mounted() {
        this.initPopup();
        this.bind_project_list();
    },

    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.resetForm();
        },
        async addActivity(params) {

            if (!params.id) {

                let event = {
                    id: this.newActivity.id,
                    title: this.newActivity.title,
                    start: this.newActivity.start,
                    end: this.newActivity.end,
                    description: this.newActivitydescription,
                    className: this.newActivity.className || 'bg-danger',
                    clientIds: [],
                    taskId: params.id
                };
                const modelAgenda = new AgendaModel(event);
                modelAgenda.userIds.push(this.usuario.id);

                const addAgendaUsuario = new AgendaService(modelAgenda, this.token);
                const data = await addAgendaUsuario.criarAgenda();
                if (data.id) {

                    this.activities.push({ ...event });

                } else {
                    this.showMessage('Atualizado com Sucesso');
                };

            } else {

                let event = {
                    id: params.id,
                    title: params.title,
                    start: params.start,
                    end: params.end,
                    description: this.newActivitydescription,
                    className: params.className || 'bg-danger',
                    clientIds: [],
                    taskId: params.taskId
                };
                const modelAgenda = new AgendaModel(event);
                modelAgenda.userIds.push(this.usuario.id);

                const addAgendaUsuario = new AgendaService(modelAgenda, this.token);
                const data = await addAgendaUsuario.atualizarAgenda();

                if (data.id) {
                    // Encontra o índice da atividade com o mesmo ID
                    const index = this.activities.findIndex(activity => activity.id === data.id);

                    if (index !== -1) {
                        // Atualiza a atividade no array
                        this.activities.splice(index, 1, { ...event });
                        this.showMessage('Atualizado com Sucesso');
                    } else {
                        // Se não encontrar o ID, você pode optar por adicionar a atividade
                        this.activities.push({ ...event });
                    }
                } else {
                    this.showMessage('Atualizado com Sucesso');
                };

            };
            this.closeModal();

            this.bind_project_list();

        },
        async updateActivity(actie) {
            this.resetForm();
            this.newActivity = actie;

            this.openModal();



        },
        async deleteActivity(actie) {
            let event = {
                id: actie.id
            };
            const modelAgenda = new AgendaModel(event);
            modelAgenda.userIds.push(this.usuario.id);

            const addAgendaUsuario = new AgendaService(modelAgenda, this.token);
            const data = await addAgendaUsuario.deleteAgenda();

            if (data.id) {
                // Encontra o índice da atividade com o mesmo ID
                const index = this.activities.findIndex(activity => activity.id === data.id);

                if (index !== -1) {
                    // Atualiza a atividade no array
                    this.activities.splice(index, 1, { ...event });
                    this.showMessage('Atualizado com Sucesso');
                } else {
                    // Se não encontrar o ID, você pode optar por adicionar a atividade
                    this.activities.push({ ...event });
                }
            } else {
                this.showMessage('Atualizado com Sucesso');
            };
            this.closeModal();

            this.showMessage('Deletado com Sucesso');
            this.bind_project_list();

        },
        resetForm() {
            this.newActivity = {
                name: '',
                description: ''
            };
        }
        ,
        getAcesso() {
            const acesso = Acesso.getAcesso('CRM', '/oportunidades', this.permissao);
            console.log(acesso);
            return acesso;
        },
        setContato(evento) {
            this.params.Contacts = evento;
            this.contatoNome = false;
            this.params.contato_nome = evento.nome + ' ' + evento.sobrenome;
            this.params.contato_numero = evento.telefone;
            this.params.cpf = evento.cpf;
            this.params.empresa = evento.empresa;
        },
        async findContato() {

            this.contatoNome = !this.contatoNome;

            if ((this.params.contato_nome).length > 3) {
                const contatos = new ContatosService({}, this.token, `/api/clientes/filter/name/${this.params.contato_nome}`);
                this.contatosLista = await contatos.getByIdNomeOrNumber();
            }



        },
        closeModalSubTask() {
            this.addTaskModal.hide();

        },
        async saveSubTaskLeads() {
            if (!this.params_task.title) {
                this.showMessage('Título é Obrigatório.', 'error');
                return true;
            }
            if (this.params_task.id) {
                //update task

                let updateLeads = new TaskModel(this.params_task);
                updateLeads['processoId'] = this.project_task.id;

                updateLeads['id'] = this.params_task.id;
                delete this.params_task['usersId']

                const taskCrm = new TaskCrmService(updateLeads, this.token);

                this.params_task = await taskCrm.atualizarTask();

                this.showMessage('Atualizado com Sucesso');


            } else {
                this.params_task['projetoId'] = this.project_task.id;
                console.log(this.project_task.id)
                this.params_task['usersId'] = this.params_task.usersId ? this.params_task.usersId : this.usuario.id;
                let task = new TaskModel(this.params_task);
                task['id'] = self.crypto.randomUUID();
                const taskCrm = new TaskCrmService(task, this.token);
                const taskNova = await taskCrm.criarTask();
                this.params_task = taskNova;
                this.showMessage('Criado com Sucesso');

            };
            this.closeModalSubTask();
            this.bind_project_list();
        },

        temperatura(temp) {
            switch (temp) {
                case 'frio':
                    return 'Frio - ✩';
                case 'morno':
                    return 'Morno - ✩✩';
                case 'quente':
                    return 'Quente - ✩✩✩';
                default:
                    return '';
            }
        },
        createEditeLeads(task, project) {
            console.log(project);
            if (task?.id) {

                this.params_task = JSON.parse(JSON.stringify(task));
                this.project_task = JSON.parse(JSON.stringify(project));

                this.activities = this.params_task.agenda;
            } else {
                task = {};
                this.project_task = JSON.parse(JSON.stringify(project));
            }
            this.addTaskModal.show();

        },

        initPopup() {
            this.addListModal = new window.bootstrap.Modal(document.getElementById('addListModal'));
            this.addTaskModal = new window.bootstrap.Modal(document.getElementById('addTaskModal'));
            this.deleteConformation = new window.bootstrap.Modal(document.getElementById('deleteConformation'));
        },

        async bind_project_list() {
            let id = (window.location.pathname).replace('/crm/fluxo/', '');
            const processosCrm = new ProcessoCrmService({}, this.token, `/api/processo/todos/${id}`);
            this.project_list = await processosCrm.getAllProcesso();
            return true;
        },

        async move(projeto, task) {
            let taskUpdate = {
                id: task.id,
                title: task.title,
                description: task.description,
                updated_at: new Date(),
                processoId: projeto.id
            };
            const taskCrm = new TaskCrmService(taskUpdate, this.token);
            const taskUpda = await taskCrm.atualizarTask();
            if (taskUpda) {
                if (this.bind_project_list()) {
                    this.showMessage('Atualizado com Sucesso.');
                }
            } else {
                this.showMessage('Erro para atualizar', 'error');
            }
        },

        async moveTask(task) {
            this.taskMove = task;
        },

        edit_project(project) {
            this.params = { id: null, title: '', color: '' };
            if (project) {
                this.params = JSON.parse(JSON.stringify(project));
            }
            this.addListModal.show();
        },

        async save_project() {
            if (!this.params.title) {
                this.showMessage('Título é obrigatório.', 'error');
                return;
            }

            let projetoID = (window.location.pathname).replace('/crm/fluxo/', '');

            if (this.params.id) {
                let project = this.project_list.find((d) => d.id == this.params.id);
                project.title = this.params.title;
                project.color = this.params.color;
                project.etapa = this.params.etapa;

                const processosCrm = new ProcessoCrmService({
                    projetoId: String(projetoID),
                    id: String(project.id),
                    title: String(project.title),
                    color: String(project.color),
                    etapa: project.etapa ? Number(project.etapa) : 0
                }, this.token);

                await processosCrm.atualizarProcesso();
                this.bind_project_list();
            } else {
                let max_project_id = this.project_list.reduce((max, character) => (character.id > max ? character.id : max), 0);
                let project = {
                    projetoId: String(projetoID),
                    title: this.params.title,
                    color: this.params.color,
                    etapa: this.params.etapa ? Number(this.params.etapa) : 0
                };
                const processosCrm = new ProcessoCrmService(project, this.token);
                const retorno = await processosCrm.criarProcesso();
                this.project_list.push(retorno);
                this.bind_project_list();
            }

            this.showMessage('Processo criado com Sucesso.');
            this.addListModal.hide();
        },

        async delete_project(project) {
            this.project_list = this.project_list.filter((d) => d.id != project.id);
            const processosCrm = new ProcessoCrmService({ id: project.id }, this.token);
            await processosCrm.deleteProcesso();
            this.showMessage('Processo deletado com Sucesso.');
        },

        clear_project(project) {
            project.task = [];
        },

        setValorTotal(project) {
            let proj = project.task || [];
            let valorTotal = 0;
            proj.forEach((v) => {
                if (v.valor_Inicial) {
                    valorTotal += Number(v.valor_Inicial);
                }
            });
            return Number(valorTotal).toLocaleString('pt-br', { minimumFractionDigits: 2 });
        },

        colorProj(color) {
            return color ? `width: auto; background: ${color}; height: 2.5px; border-radius: 30px 30px 30px 30px;` : '';
        },

        colorProjBackground(color) {
            return color ? `background: ${color};` : '';
        },

        edit_task(project_id, task) {
            this.params_task = { project_id: null, id: null, title: '', description: '' };
            if (task) {
                this.params_task = JSON.parse(JSON.stringify(task));
            }
            this.params_task.project_id = project_id;
            this.addTaskModal.show();
        },

        async save_task() {

            if (!this.params_task.title) {
                this.showMessage('Título é Obrigatório.', 'error');
                return;
            }

            let project = this.project_list.find((d) => d.id == this.params_task.project_id);
            if (this.params_task.id) {
                let task = project.task.find((d) => d.id == this.params_task.id);
                task.title = this.params_task.title;
                task.description = this.params_task.description;

                let taskUpdate = {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    updated_at: new Date(),
                    processoId: project.id
                };

                const taskCrm = new TaskCrmService(taskUpdate, this.token);
                await taskCrm.atualizarTask();
            } else {

                let task = {
                    title: this.params_task.title,
                    description: this.params_task.description,
                    processoId: project.id
                };
                const taskCrm = new TaskCrmService(task, this.token);
                const retorno = await taskCrm.criarTask();
                if (!project.task) {
                    project.task = [];
                }
                project.task.push(retorno.data);
            };
            this.bind_project_list();

            this.showMessage('Lead Criada/Atualizada com Sucesso.');
            this.addTaskModal.hide();
        },

        delete_confirm(project_id, task) {
            this.deleted_task = { project_id: project_id, id: task.id };
            this.deleteConformation.show();
        },

        async delete_task() {
            let project = this.project_list.find((d) => d.id == this.deleted_task.project_id);
            project.task = project.task.filter((d) => d.id != this.deleted_task.id);

            const taskCrm = new TaskCrmService({ id: this.deleted_task.id }, this.token);
            await taskCrm.deleteTask();

            this.showMessage('Lead Apagada com Sucesso.');
            this.deleteConformation.hide();
        },

        showMessage(msg = '', type = 'success') {
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
        }
    }
};

</script>