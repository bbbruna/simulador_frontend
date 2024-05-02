<template>
  <div>
    <label for="institution">Instituições:</label>
    <select v-model="selectedInstitutions" @change="updateSelectedInstitutions" multiple class="form-select">
      <option v-for="institution in localInstitutions" :key="institution.chave" :value="institution.chave">{{ institution.chave }}</option>
    </select>
  </div>
</template>

<script>
import { getInstitutions } from '@/domain/services/HttpService.js'; 

export default {
  props: {
    institutions: {
      type: Array,
      default: () => [] 
    }
  },
  data() {
    return {
      selectedInstitutions: [],
      localInstitutions: [] 
    };
  },
  async mounted() {
    try {
      this.localInstitutions = this.institutions.length > 0 ? this.institutions : await getInstitutions();
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  },
  methods: {
    updateSelectedInstitutions() {
      this.$emit('update:selectedInstitutions', this.selectedInstitutions);
    }
  }
};
</script>
