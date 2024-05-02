<template>
  <div>
    <button type="button" class="btn btn-primary mt-3" @click="simulateLoan" :disabled="!loanAmount">Simular</button>
  </div>
</template>

<script>
import { sendSimulation } from '@/domain/services/HttpService.js';
import LoanModel from '@/domain/models/LoanModel.js';

export default {
  props: {
    loanAmount: {
      type: String,
      required: true
    },
    selectedAgreements: {
      type: Array,
      default: () => []
    },
    selectedInstitutions: {
      type: Array,
      default: () => []
    },
    selectedInstallments: {
      type: null
    }
  },
  methods: {
      async simulateLoan() {
        if (!this.loanAmount) {
          console.error('O valor do empréstimo não pode ser vazio.');
          return;
        }

        try {
          const loan = new LoanModel(
            this.loanAmount,
            this.$props.selectedInstitutions,
            this.$props.selectedAgreements,
            this.selectedInstallments,
          );

          const simulations = await sendSimulation(loan);
          this.simulations = simulations;

          this.$emit('simulations-received', simulations);
        } catch (error) {
          console.error('Erro ao simular empréstimo:', error);
        }
      },
  }
};
</script>