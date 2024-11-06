<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <div class="header-container fixed-top">
            <header class="header navbar navbar-expand-sm">
                <ul class="navbar-item theme-brand flex-row text-center">
                    <li class="nav-item theme-logo">
                        <router-link to="/" v-if="cliente">
                            <img :src="require('@/assets/images/odin-logo.png')" />
                        </router-link>
                    </li>
                    <li class="nav-item theme-text" v-if="cliente">
                        <router-link to="/" class="nav-link">{{ "linkkoub" }} </router-link>
                    </li>
                </ul>


                <div class="navbar-item flex-row ms-md-auto">

                    <div class="dropdown nav-item user-profile-dropdown btn-group">
                        <!-- <a href="javascript:;"  
                            class="avatar-p btn dropdown-toggle btn-icon-only user nav-link" @click="openAgendamento()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffff"
                                class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                <path fill-rule="evenodd"
                                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                            </svg>
                        </a> -->
                        <a href="javascript:;" id="ddluser" data-bs-toggle="dropdown" aria-expanded="false"
                            class="avatar-p btn dropdown-toggle btn-icon-only user nav-link">
                            <img :src="usuario.linkFoto ? usuario.linkFoto : require('@/assets/images/user-no-foto.png')"
                                alt="avatar" />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddluser">
                            <li role="presentation">
                                <router-link to="/config/usuario" class="dropdown-item">
                                    <i class="bi bi-person-circle"></i>

                                    Perfil
                                </router-link>
                            </li>
                            <li role="presentation">
                                <!-- <router-link to="/config/app" class="dropdown-item">
                                    <i class="bi bi-wrench-adjustable"></i>

                                    Configurações
                                </router-link> -->
                            </li>

                            <li role="presentation">
                                <router-link to="/login" class="dropdown-item" @click="sairApp()">
                                    <i class="bi bi-back"></i>
                                    Sair
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>        

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
const store = useStore();

const permissaoUsuario = store.getters.permissao;

const usuario = store.getters.usuario;
const cliente = store.getters.cliente;


const selectedLang = ref(null);
const countryList = ref(store.state.app.countryList);

const i18n = useI18n();

onMounted(() => {
    selectedLang.value = window.$appSetting.toggleLanguage();
    toggleMode();
});

const openAgendamento = () => {
    window.open(`/agendamento?clientId=${cliente.id}`)
    return
}
const sairApp = () => {
    localStorage.removeItem("usuario");
    store.commit('setUpdate');
}

const toggleMode = (mode) => {
    window.$appSetting.toggleMode(mode);
};

const changeLanguage = (item) => {
    selectedLang.value = item;
    window.$appSetting.toggleLanguage(item);

    i18n.locale.value = item.code;
};
</script>
