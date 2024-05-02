<template>
  <div>
    <label for="loanAmount" class="form-label">Valor do Empréstimo:</label>
    <div class="input-group">
      <span class="input-group-text">R$</span>
      <input type="text" id="loanAmount" v-model="loanAmount" @input="formatLoanAmount" class="form-control" placeholder="Digite o valor do empréstimo" required>
    </div>
    <div v-if="!isValidLoanAmount" class="text-danger">Por favor, insira um valor numérico.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanAmount: '',
      isValidLoanAmount: true
    };
  },
  methods: {
    formatLoanAmount(event) {
      let value = event.target.value.replace(/\D/g, ''); // Acessar o valor do input corretamente

      if (value !== '') { // Verificar se o valor não está vazio
        this.loanAmount = Number(value).toLocaleString('pt-BR');
        this.isValidLoanAmount = true;
        this.$emit('update:loanAmount', this.loanAmount);
      } else {
        this.loanAmount = '';
        this.isValidLoanAmount = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
