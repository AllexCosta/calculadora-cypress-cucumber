import { And, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import * as CalculadoraFunctions from '../../../support/context/calculadora/calculadora.function';

Given("que eu acesso a calculadora", () => {
    CalculadoraFunctions.abrirCalculadora()
});

And("desejo realizar uma {string}", (operacao) => {
    CalculadoraFunctions.definirOperador(operacao)
});

When("informar os valores", () => {
    CalculadoraFunctions.preencherValores()
});

And("finalizar a conta", () => {
    CalculadoraFunctions.finalizarOperacao()
});

Then("devo obter o resultado", (resultado) => {
    CalculadoraFunctions.devoVerResultadoEsperado(resultado)
});