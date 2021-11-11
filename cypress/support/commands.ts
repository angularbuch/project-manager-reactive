/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      fillForm(value: FormInput[]): Chainable;
    }
  }
}

export interface FormInput {
  key: string;
  text?: string;
  selectValue?: string;
}

Cypress.Commands.add('fillForm', (inputs: FormInput[]) => {
  inputs.forEach(inputValue => {
    if (inputValue.selectValue) {
      cy.get(`[name="${inputValue.key}"]`).select(inputValue.selectValue);
    } else if (inputValue.text) {
      cy.get(`[name="${inputValue.key}"]`).type(inputValue.text);
    }
  });
});
