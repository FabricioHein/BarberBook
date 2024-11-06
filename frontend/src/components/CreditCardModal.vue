<template>
    <div v-if="showModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastro de Cartão de Crédito</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="cardNumber" class="form-label">Número do Cartão:</label>
                <input type="text" id="cardNumber" v-model="cardNumber" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="expiryDate" class="form-label">Data de Validade:</label>
                <input type="text" id="expiryDate" v-model="expiryDate" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="cvv" class="form-label">CVV:</label>
                <input type="text" id="cvv" v-model="cvv" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-success">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['showModal'],
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitForm() {
        // Lógica para salvar os dados do cartão de crédito
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
 /* CSS para adicionar barra de rolagem */
.modal-dialog-right .modal-content {
  overflow-y: auto; /* Adiciona rolagem vertical */
}

.modal-dialog-right .modal-body {
  overflow-y: auto; /* Adiciona rolagem vertical */
}

.modal-dialog-right {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
}

.modal.show .modal-dialog-right {
    transform: translateX(0);
}

.modal-dialog-right .modal-content {
    height: 100%;
    border-radius: 0;
}
  </style>
  