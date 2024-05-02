<template>
    <div>
    <label for="installments" class="form-label">Parcelas:</label>
    <select id="installments" v-model="selectedInstallments" class="form-select" @change="updateSelectedInstallments">
      <option v-for="installment in availableInstallments" :value="installment" :key="installment">{{ installment }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedInstallments: null,
      availableInstallments: [36, 48, 60, 72, 84]
    };
  },
  methods: {
    updateSelectedInstallments() {
      this.$emit('selected-installments', this.selectedInstallments);
    }
  }
};
</script>
