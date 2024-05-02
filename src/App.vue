<template>
   <div id="app" class="container overflow-auto d-flex justify-content-center align-items-center" style="height: 150vh;">
    <div class="col-md-6">
      <h2 class="mb-4">Simulação WEB</h2>
      <div class="mb-3">
        <TextFormField v-model="loanAmount" @update:loanAmount="updateLoanAmount" />
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <InstitutionSelect v-model="selectedInstitutions" @update:selectedInstitutions="updateSelectedInstitutions" />
        </div>
        <div class="col-md-6">
          <AgreementSelect v-model="selectedAgreements" @selected-agreements="handleSelectedAgreements"/>
        </div>
      </div>
      <div class="mb-3">
          <InstallmentsSelect v-model="selectedInstallments" @selected-installments="handleSelectedInstallments" />
      </div>
      <div class="d-grid">
        <ButtonSimulation
          :loanAmount="loanAmount"
          :selectedInstitutions="selectedInstitutions"
          :selectedAgreements="selectedAgreements"
          :selectedInstallments="selectedInstallments"
          @simulations-received="handleSimulationsReceived"
        />
      </div>
      <br><br>
      <div class="overflow-auto " style="height: 50vh">
      <div v-if="simulations.length > 0" class="mb-3">
        <h4>Resultados da simulação</h4>
        <div v-for="(simulation, index) in simulations" :key="index" class="card mb-3">
          <div class="card-body">
            <h6 class="card-title">
              {{ simulation.institutions }} ({{ simulation.agreement }})
              <span class="fw-bold">
                {{ simulation.installments }} x R$ {{ (simulation.loanAmount / simulation.installmentsValue).toFixed(2) }}
              </span>
            </h6>
              <div class="row">
              <div class="col-md-2">
                <p class="card-text">R$ {{ simulation.loanAmount }}</p>
              </div>
              <div class="col-md-3">
                <p class="card-text">Taxa: {{ simulation.tax }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Não há resultados de simulação disponíveis.</p>
      </div>
    </div>
   </div>
  </div>
</template>


<script>
import AgreementSelect from './components/AgreementSelect.vue'
import ButtonSimulation from './components/ButtonSimulation.vue'
import InstallmentsSelect from './components/InstallmentsSelect.vue'
import InstitutionSelect from './components/InstitutionSelect.vue'
import TextFormField from './components/TextFormField.vue'


export default {
  name: 'App',
  components: {
    AgreementSelect,
    ButtonSimulation,
    InstallmentsSelect,
    InstitutionSelect,
    TextFormField
  },
  data() {
    return {
      loanAmount: '',
      simulations: [],
      selectedInstitutions: [],
      selectedAgreements: [],
      selectedInstallments: null
    };
  },
  methods: {
    updateLoanAmount(loanAmount) {
      this.loanAmount = loanAmount;
    },
    updateSelectedAgreements(selectedAgreements) {
      this.selectedAgreements = selectedAgreements;
    },
    updateSelectedInstitutions(selectedInstitutions) {
      console.log('Instituições selecionadas:', selectedInstitutions); 
      this.selectedInstitutions = selectedInstitutions;
    },
    handleSimulationsReceived(simulations) {
      this.simulations = simulations;
    },
    handleSelectedInstallments(selectedInstallments) {
      this.selectedInstallments = selectedInstallments;
    }
  }
}
</script>