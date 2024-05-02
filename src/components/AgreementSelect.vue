<template>
  <div>
    <label for="agreement">Convênio:</label>
    <select id="agreement" v-model="selectedAgreements" @change="updateSelectedAgreements" multiple class="form-select">
      <option v-for="agreement in localAgreements" :key="agreement.chave" :value="agreement.chave">{{ agreement.chave }}</option>
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
      selectedAgreements: [],
      localAgreements: [] 
    };
  },
  async mounted() {
    try {
      this.localAgreements = this.agreements.length > 0 ? this.agreements : await getAgreements();
    } catch (error) {
      console.error('Error fetching agreements:', error);
    }
  },
  methods: {
    updateSelectedAgreements() {
      console.log(this.selectedAgreements);
      this.$emit('update:selectedAgreements', this.selectedAgreements);
    }
  }
};
</script>