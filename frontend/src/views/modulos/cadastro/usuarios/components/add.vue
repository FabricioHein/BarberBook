<template>
  <div class="form">
    <div class="row">
      <!-- Coluna Esquerda -->
      <div class="col-6">
        <div class="upload mt-4 pe-md-4">
          <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
          <img :src="params.linkFoto ? params.linkFoto : require('@/assets/images/photo.png')" alt="profile"
            class="profile-preview" @click="$refs.fl_profile.click()" />
          <p class="mt-2">Carregar Imagem</p>
        </div>
        <label for="nome">Nome</label>
        <input v-model="params.nome" id="nome" placeholder="Nome" type="text" class="form-control" />

        <label for="sobrenome">Sobrenome</label>
        <input v-model="params.sobrenome" id="sobrenome" placeholder="Sobrenome" type="text" class="form-control" />

        <label for="perfil">Perfil</label>
        <SelectVue v-model:value="params.tipoUsuarioId" :data="sistema.enum.tipoUsuario"></SelectVue>
      </div>

      <!-- Coluna Direita -->
      <div class="col-6">
        <label for="telefone">Telefone</label>
        <input v-model="params.telefone" v-maska="'+55(##)#####-####'" id="telefone" placeholder="(__) _____-____"
          type="text" class="form-control" />

        <label for="email">Email</label>
        <input-vue id="email" type="text" v-model:value="params.email" />

        <!-- Comentei o campo de Data de Nascimento, se necessário, remova o comentário -->

        <label for="data_nascimento">Data Nascimento</label>
        <input v-model="params.data_nascimento" id="data_nascimento" type="date" class="form-control" />


        <div v-if="cpf || params.cpf">
          <label for="cpf">CPF</label>
          <input v-model="params.cpf" v-maska="'###.###.###-##'" id="cpf" placeholder="CPF" type="text"
            class="form-control" />
        </div>
      </div>
    </div>

    <!-- Componente de Endereço -->
    <endereco-vue :params="params" />
  </div>

</template>
<script>
import InputVue from '@/components/Input-validate.vue';
import ImportarService from '@/service/import-service';
import { mapGetters } from 'vuex';
import enderecoVue from '@/views/components/endereco.vue';
import SelectVue from '@/components/SelectVue.vue';


export default {
  name: 'add',
  components: {
    SelectVue,
    InputVue,
    enderecoVue
  },
  data() {
    return {
      cpf: false
    }
  },
  props: {
    params: {}
  },
  computed: {
    ...mapGetters(['usuario', 'cliente', 'token', 'sistema']),
  },
  created() {
    this.changeCpfCnpj()
  },
  methods: {
    changeCpfCnpj() {

      this.cnpj = !this.cnpj;
    },
    async change_file(event) {

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.params.linkFoto = e.target.result
          this.showMessage('Carregado com Sucesso')
        };
        reader.readAsDataURL(file);
      };

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
    },
  }

}
</script>