import * as constants from './calculadora.constants';
import * as elements from './calculadora.element';

module.exports = {
    pegarResultado: function() {
        return cy.get(elements.resultado).invoke('text');
    },
    
    transformarOperador: function(operacao) {
        switch (operacao) {
            case 'somar':
                return constants.SOMA
            case 'subtração':
                return constants.SUBTRACAO
            case 'multiplicação':
                return constants.MULTIPLICACAO
            case 'divisão':
                return constants.DIVISAO
            default:
                break;
        }
    },
    
    pegarOperador: function(operador) {
        const operacao = operador ? operador : functiontransformarOperador(Cypress.env('operador'))
        return cy.get(elements.operadores).contains(operacao);
    },
    
    pegarValor: function(valor) {
        return cy.get(elements.valores).contains(valor)
    },
    
    pegarAuxiliar: function(auxiliar) {
        return cy.get(elements.auxiliares).contains(auxiliar)
    },
    
    abrirCalculadora: function() {
        cy.visit('/')
    },
    
    definirOperador: function(operacao) {
        Cypress.env('operador', operacao);
    },
    
    preencherValores: function() {
        const primeiroValor = parseFloat(Math.floor(Math.random() * 9 + 1));
        const segundoValor = parseFloat(Math.floor(Math.random() * 9 + 1));
    
        Cypress.env('primeiroValor', primeiroValor);
        Cypress.env('segundoValor', segundoValor);
    
        pegarValor(primeiroValor).click()
        pegarOperador().click()
        pegarValor(segundoValor).click()
    },
    
    finalizarOperacao: function() {
        pegarOperador(constants.IGUALDADE).click()
    },
    
    devoVerResultadoEsperado: function() {
        const resultadoEsperado = resultadoEsperadoDaOperacao(Cypress.env('operador'))
        pegarResultado().should('be.equal', String(resultadoEsperado))
    },
    
    resultadoEsperadoDaOperacao: function(operacao) => {
        const primeiroValor = Cypress.env('primeiroValor');
        const segundoValor = Cypress.env('segundoValor');
      
        switch (operacao) {
          case 'somar':
            return primeiroValor + segundoValor;
          case 'subtração':
            return primeiroValor - segundoValor;
          case 'multiplicação':
            return primeiroValor * segundoValor;
          case 'divisão':
            return primeiroValor / segundoValor;
          default:
            break;
        }
      },
}