import * as constants from './calculadora.constants';
import * as elements from './calculadora.element';

function pegarResultado() {
    return cy.get(elements.resultado).invoke('text');
}

function transformarOperador(operacao) {
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
}

function pegarOperador(operador) {
    const operacao = operador ? operador : transformarOperador(Cypress.env('operador'))
    return cy.get(elements.operadores).contains(operacao);
}

function pegarValor(valor) {
    return cy.get(elements.valores).contains(valor)
}

function pegarAuxiliar(auxiliar) {
    return cy.get(elements.auxiliares).contains(auxiliar)
}

function abrirCalculadora() {
    cy.visit('/')
}

function definirOperador(operacao) {
    Cypress.env('operador', operacao);
}

function preencherValores() {
    const primeiroValor = parseFloat(Math.floor(Math.random() * 9 + 1));
    const segundoValor = parseFloat(Math.floor(Math.random() * 9 + 1));

    Cypress.env('primeiroValor', primeiroValor);
    Cypress.env('segundoValor', segundoValor);

    pegarValor(primeiroValor).click()
    pegarOperador().click()
    pegarValor(segundoValor).click()
}

function finalizarOperacao() {
    pegarOperador(constants.IGUALDADE).click()
}

function devoVerResultadoEsperado() {
    const resultadoEsperado = resultadoEsperadoDaOperacao(Cypress.env('operador'))
    pegarResultado().should('be.equal', String(resultadoEsperado))
}

function resultadoEsperadoDaOperacao(operacao){
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
  }

export {
    pegarResultado,
    pegarOperador,
    pegarValor,
    pegarAuxiliar,
    abrirCalculadora,
    definirOperador,
    preencherValores,
    finalizarOperacao,
    devoVerResultadoEsperado
}