<template src="./agendamento.html"></template>
<style scoped src="./agendamento.css"></style>
<script>
import AgendaService from '@/service/agenda-service';

export default {
  data() {
    return {
      links: [
       
      ],
      agenda: true,
      showAgenda: false,
      selectedDate: '',
      hasCpf: true,
      step: 1,
      nome: '',
      telefone: '',
      cpf: '',
      usuario: null,
      attendants: [],
      times: [],
      selectedAttendant: null,
      selectedTime: null,
      selectedDate: null,
    };
  },
  methods: {
    toggleAgenda() {
      this.showAgenda = !this.showAgenda;
    },
    async enviarAgendamento() {
      console.log(this.usuario)
      const enviarAgendamento = new AgendaService({
        title: this.nome,
        date_start: new Date(this.selectedDate),
        date_end: new Date(this.selectedDate),
        clients: [this.selectedAttendant],
        users: []
      }, '');
      const agendamento = await enviarAgendamento.criarAgendamentoExterno();

    },
    async getDateAtentend() {
      const getHorarios = new AgendaService({
        atendimentoId: this.selectedAttendant,
        date: this.selectedDate
      }, '');
      const dataHorarios = await getHorarios.getHorarios();

      if (dataHorarios) {
        this.times = dataHorarios;
        this.step++;
      };


    },
    async nextStepGetCpf() {

      if (this.step === 1 && (!this.cpf)) {
        this.showMessage('Por favor, preencha todos os campos.', 'error');
        return
      };
      this.params = this.$route.query;
      console.log(this.$route.query)
      this.params['cpf_usuario'] = (this.cpf);

      const getAllClienteAngendaUser = new AgendaService(this.params, '');
      const dataUsuario = await getAllClienteAngendaUser.getAllClienteAngendaUser();
      if (dataUsuario) {
        this.attendants = dataUsuario.works;

        if (dataUsuario.usuario) {
          this.usuario = dataUsuario.usuario;
          this.nome = dataUsuario.usuario.nome;
          this.cpf = dataUsuario.usuario.cpf;
          this.step++;
        }
        if (dataUsuario.usuario == null || !this.nome) {
          this.hasCpf = false;
        }
        if (this.nome && this.cpf) {
          this.step++;
        }

      }


    },
    async nextCreateCliente() {
      if (this.step === 1 && (!this.cpf)) {
        this.showMessage('Por favor, preencha todos os campos.', 'error');
        return
      };
      this.params = this.$route.query;
      console.log(this.$route.query)
      this.params['cpf_usuario'] = (this.cpf);
      this.params['nome'] = (this.nome);
      this.params['telefone'] = (this.telefone);


      const getAllClienteAngendaUser = new AgendaService(this.params, '');
      const dataUsuario = await getAllClienteAngendaUser.getAllClienteAngendaUser();
      if (dataUsuario) {
        this.attendants = dataUsuario.works;

        if (dataUsuario.usuario) {
          this.usuario = dataUsuario.usuario;
          this.nome = dataUsuario.usuario.nome;
          this.cpf = dataUsuario.usuario.cpf;
          this.step++;
        }
        if (dataUsuario.usuario == null || !this.nome) {
          this.hasCpf = false;
        }
        if (this.nome && this.cpf) {
          this.step++;
        }

      }


    },
    formatDateToBrazilian(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    nextStep() {
      if (this.step === 1 && (!this.nome)) {
        this.showMessage('Por favor, preencha todos os campos.', 'error');
      } else if (this.step === 2 && !this.selectedAttendant) {
        this.showMessage('Por favor, selecione um atendente.', 'error');
      } else if (this.step === 3 && !this.selectedTime) {
        this.showMessage('Por favor, selecione um horário.', 'error');
      } else if (this.step === 4 && !this.selectedDate) {
        this.showMessage('Por favor, selecione uma data.', 'error');
      } else {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
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
    finish() {
      this.showMessage('Agendamento concluído com sucesso!');
      // Resetar o formulário
      this.step = 1;
      this.name = '';
      this.phone = '';
      this.selectedAttendant = null;
      this.selectedTime = null;
      this.selectedDate = null;
    },
  },
};
</script>
