<template>
    <div class="modal-body ">
        <div class="form">
            <div class="row">
                <div class="col-12">
                    <label>Título</label>
                    <input type="text" class="form-control" v-model="params.title" />

                    <label>Temperatura da Venda</label>
                    <select v-model="params.status" class="form-select">
                        <option v-for="m in statusTemperatura" :value="m.value">{{ m.nome }}
                        </option>
                    </select>

                    <label>Nome Contato</label>
                    <input type="text" class="form-control" placeholder="Pesquise o Contato"
                        v-model="params.contato_nome" @input="findContato()" />

                    <div v-if="contatoNome">
                        <ul>
                            <li v-for="contato in contatosLista" @click="setContato(contato)">
                                {{ contato.nome }} {{ contato.sobrenome }} {{ ' - ' }} {{
                                contato.cpf }}
                            </li>
                        </ul>
                    </div>

                    <label for="cpf">CPF</label>
                    <input v-model="params.cpf" v-maska="'###.###.###-##'" placeholder="CPF" type="text"
                        class="form-control" />

                    <label>Valor Inicial</label>
                    <inputMoney v-model="params.valor_Inicial" :options="options" />

                    <label>Valor Final</label>
                    <inputMoney v-model="params.valor_Final" :options="options" />

                    <label>Vendedor</label>
                    <select v-model="params.usersId" class="form-select">
                        <option v-for="m in vendedor" :value="m.id">{{ m.nome }}</option>
                    </select>

                    <label>Previsão de Fechamento</label>
                    <input v-model="params.previsao_fechamento" class="form-control" type="date" />

                    <label>Número</label>
                    <input type="text" class="form-control" v-maska="'+55(##)#####-####'" placeholder="__-_______"
                        v-model="params.contato_numero" />

                    <label>Empresa</label>
                    <input type="text" class="form-control" v-model="params.empresa" />

                    <label>Motivos</label>
                    <select v-model="params.motivosId" class="form-select">
                        <option v-for="m in motivos" :value="m.id">{{ m.nome }}</option>
                    </select>

                    <label>Produtos / Serviços</label>
                    <select v-model="params.produtoId" class="form-select">
                        <option v-for="m in produtos" :value="m.id">{{ m.nome }}</option>
                    </select>
                </div>

                <div class="col-12">
                    <label>Descrição</label>
                    <quill-editor theme="snow" v-model:value="params.description" :options="descricao"
                        style="min-height: 100px"></quill-editor>
                </div>
            </div>

        </div>

    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" @click="back(params)">Voltar</button>
        <button type="button" class="btn btn-success" @click="saveTask">Salvar</button>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import '@/assets/sass/apps/notes.scss';
import { DateTime } from '@/helpers/DateTime'

import { useMeta } from '@/composables/use-meta';
import AnotacaoService from '@/service/anotacao-service';
import store from '@/store';


useMeta({ title: 'Notas' });

const token = store.getters.token;

const taskId = (window.location.pathname).replace('/crm/leads/', '');

let notesMailModal = ref(null);
const params = ref({ id: null, title: '', description: '' });
const is_show_note_menu = ref(false);
const notes_list = ref([]);
const filterd_notes_list = ref('');
const selected_tab = ref('all');

onMounted(() => {
    initPopup();
    bind_notes();
});

const initPopup = () => {
    notesMailModal = new window.bootstrap.Modal(document.getElementById('notesMailModal'));
};

const bind_notes = async () => {

    const anotacao = new AnotacaoService({}, token, `/api/task/todos/getAllAnotacao/${taskId}`);

    notes_list.value = await anotacao.getAllAnotacao();
    console.log(await anotacao.getAllAnotacao())

    search_notes();
};

const search_notes = () => {
    if (selected_tab.value != 'fav') {
        if (selected_tab.value != 'all') {
            filterd_notes_list.value = notes_list.value.filter((d) => d.tag == selected_tab.value);
        } else {
            filterd_notes_list.value = notes_list.value;
        }
    } else {
        filterd_notes_list.value = notes_list.value.filter((d) => d.is_fav);
    }
};

const note_class = (note) => {
    let cls = '';
    if (note.tag) {
        cls = 'note-' + note.tag;
    }
    if (note.is_fav) {
        cls += ' note-fav';
    }
    return cls;
};

const tab_changed = (type) => {
    selected_tab.value = type;
    search_notes();
    is_show_note_menu.value = false;
};

const set_fav = (note) => {
    note.is_fav = !note.is_fav;
};

const set_tag = (note, name) => {
    note.tag = name;
    search_notes();
};

const edit_note = (note) => {
    params.value = { id: null, title: '', description: '' };
    if (note) {
        params.value = JSON.parse(JSON.stringify(note));
    }
    notesMailModal.show();
};

const save_note = async () => {
    if (!params.value.title) {
        showMessage('Título é Obrigatório', 'error');
        return false;
    }

    //add note

    let dt = new Date();
    let note = {
        title: params.value.title,
        description: params.value.description,
        date: dt,
        is_fav: false,
        tag: '',
        taskId: Number(taskId)
    };
    const anotacao = new AnotacaoService(note, token);
    const anotacaoCriada = await anotacao.criarAnotacao();

    notes_list.value.splice(0, 0, anotacaoCriada.data);
    search_notes();

    showMessage('Anotação Salvo com Sucesso!.');
    notesMailModal.hide();
};

const delete_note = async (note) => {
    notes_list.value = notes_list.value.filter((d) => d.id != note.id);

    const deletAno = new AnotacaoService({
        id: note.id
    }, token)

    await deletAno.deleteAnotacao();

    search_notes();
    showMessage('Anotação Deletado com Sucesso.');
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
    max-width: 400px;
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
</style>