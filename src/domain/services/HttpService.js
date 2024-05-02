import axios from 'axios';
import LoanModel from '@/domain/models/LoanModel.js';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

export async function sendSimulation(payload) {
  if (!(payload instanceof LoanModel)) {
    throw new Error('O payload não é uma instância de LoanModel.');
  }

  const formattedPayload = {
    valor_emprestimo: payload.loanAmount,
    instituicoes: payload.institutions,
    convenios: payload.agreements,
    parcelas: payload.installments ?? 0,
  };

  try {
    const response = await axios.post(`/api/simular`, formattedPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*',
      },
    });
    
    const simulationData = response.data;
  
    return parseToJson(simulationData, payload); 
  } catch (error) {
    console.error('Erro ao simular empréstimo:', error);
    throw error;
  }
}

export async function getInstitutions() {
  try {
    const response = await axios.get(`/api/instituicao`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter instituições:', error);
    throw error;
  }
}

export async function getAgreements() {
  try {
    const response = await axios.get(`/api/convenio`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter convênios:', error);
    throw error;
  }
}

function parseToJson(responseJson, loan) {
  const auxSimulations = [];

  if (!responseJson || Object.keys(responseJson).length === 0) {
    console.warn('A resposta da API está vazia ou inválida.');
    return [];
  }

  try {
    for (const institutionKey in responseJson) {
      const institutionData = responseJson[institutionKey];
      
      if (!Array.isArray(institutionData)) {
        console.warn(`Os dados da instituição ${institutionKey} não são válidos.`);
        continue;
      }

      for (const element of institutionData) {
        const simulation = {
          loanAmount: loan.loanAmount,
          institutions: institutionKey,
          tax: element.taxa,
          agreement: element.convenio,
          installmentsValue: element.valor_parcela,
          installments: element.parcelas,
        };

        auxSimulations.push(simulation);
      }
    }

    loan.simulations = auxSimulations;
  } catch (error) {
    console.error('Erro ao fazer o parse dos dados:', error);
    return [];
  }

  return auxSimulations;
}
