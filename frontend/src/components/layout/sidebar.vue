<template>
    <!--  BEGIN SIDEBAR  -->
    <div class="sidebar-wrapper sidebar-theme">
        <nav ref="menu" id="sidebar">
            <perfect-scrollbar v-if="permissaoUsuario.length > 0" class="list-unstyled menu-categories" tag="ul"
                :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                <div id="sidebar" class="sidebar">
                    <ul class="menu-list">
                        <li class="menu-item" v-for="permissao in permissaoUsuario" :key="permissao.ordem">
                            <a class="dropdown-toggle" data-bs-toggle="collapse" :href="'#submenu-' + permissao.ordem"
                                aria-expanded="false">
                                <div class="menu-content">
                                    <i :class="[permissao.icon_modulo]"></i>
                                    <span class="p-2">{{ permissao.modulo }}</span>
                                </div>
                            </a>

                            <ul :id="'submenu-' + permissao.ordem" class="collapse submenu list-unstyled">
                                <li v-for="submodulos in permissao.submodulos" :key="submodulos.ordem">
                                    <template v-if="submodulos.ver">
                                        <router-link :to="permissao.url_modulo + submodulos.url"
                                            @click="toggleMobileMenu">
                                            <i :class="[submodulos.icon]"></i>
                                            {{ ' ' + submodulos.nome }}
                                        </router-link>
                                    </template>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>


            </perfect-scrollbar>
        </nav>
    </div>
    <!--  END SIDEBAR  -->
</template>
<style>
.menu-list {
    list-style-type: none;
    padding: 0;
}

.menu-item {
    margin-bottom: 1rem;
}

.menu-content {
    display: flex;
    align-items: center;
    color: #ffff;
    /* padding: 0.2rem; */
    padding-left: 1rem;
    text-decoration: none;
}

.menu-content:hover {
    background-color: #066bd1ce;
}

.menu-content i {
    margin-right: 1rem;
}

.submenu {
    padding-left: 1.5rem;
}

.submenu li {
    margin-bottom: 0.5rem;
}

.submenu a {
    color: #066bd1ce;
    text-decoration: none;
}

.submenu a:hover {
    color: #066bd1ce;
}

/* Colapso dos submenus */
.collapse:not(.show) {
    display: none;
}

.collapse.show {
    display: block;
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
}

/* Estilo geral do submenu dentro da sidebar */
#sidebar ul.menu-categories ul.submenu>li a {
    position: relative;
    display: flex;
    justify-content: flex-start;
    padding: 5px 5px;
    font-size: 12px;
    color: #ffff;
    transition: color 0.3s ease, background-color 0.3s ease;
    border-radius: 4px;
}

/* Efeito hover para links do submenu */
#sidebar ul.menu-categories ul.submenu>li a:hover {
    background-color: #066bd1ce;
    color: #ffff;
}

/* Personalização para o submenu */
#sidebar ul.menu-categories ul.submenu {
    padding-left: 5px;
    /* Indentação mínima */
    margin-left: 5px;
    /* Trazer os itens mais à esquerda */
}

/* Itens do submenu */
#sidebar ul.menu-categories ul.submenu>li {
    margin-bottom: 8px;
}

/* Aumentando o tamanho dos ícones no submenu */
#sidebar ul.menu-categories ul.submenu>li a i {
    font-size: 18px;
    padding-right: 25px;
    color: #adb5bd;
}

/* Alinhamento do texto do menu principal */
#sidebar ul.menu-categories>li>a {
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
}

#sidebar ul.menu-categories>li>a:hover {
    background-color: #066bd1ce;
    color: #ffffff;
}

/* Aumentando o tamanho dos ícones no menu principal */
#sidebar ul.menu-categories>li>a i {
    margin-right: 12px;
    font-size: 22px;
    /* Ícones maiores no menu principal */
    color: #ffffff;
}

/* Estilo para o menu expandido */
#sidebar ul.menu-categories ul.submenu.show {
    display: block;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const permissaoUsuario = store.getters.permissao;

onMounted(() => {
    const selector = document.querySelector('#sidebar a[href="' + window.location.pathname + '"]');
    if (selector) {
        const ul = selector.closest('ul.collapse');
        if (ul) {
            let ele = ul.closest('li.menu-item').querySelectorAll('.dropdown-toggle');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        } else {
            selector.click();
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 991) {
        store.commit('toggleSideBar', !store.state.app.is_show_sidebar);
    }
};
</script>
