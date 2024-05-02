<template>
  <div>
    <label for="agreement" class="form-label">Convênio:</label>
    <select id="agreement" v-model="selectedAgreements" class="form-select" @change="updateSelectedAgreements" multiple>
      <option v-for="agreement in localAgreements" :value="agreement.chave" :key="agreement.chave">
        {{ agreement.chave }}
      </option>
    </select>
  </div>
</template>

<script>
import { getAgreements } from '@/domain/services/HttpService.js';

export default {
  props: {
    agreements: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedAgreements: [], // Agora é um array para armazenar vários convênios selecionados
      localAgreements: []
    };
  },
  async mounted() {
    try {
      this.localAgreements = await getAgreements();
    } catch (error) {
      console.error('Erro ao buscar convênios:', error);
    }
  },
  methods: {
    updateSelectedAgreements() {
      this.$emit('selected-agreements', this.selectedAgreements);
    }
  }
};
</script>