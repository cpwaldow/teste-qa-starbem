describe('Cenários de teste para o extrato', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('https://bugbank.netlify.app/');

    const firstEmail = 'contaAuxiliar@bugbank.com';
    const firstPassword = 'senhaTransacao';
    const FirstName = 'Vanessa Paixão';

    cy.contains('Registrar').click();

    cy.get(':nth-child(2) > .input__default').focus().type(firstEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(FirstName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).focus().type(firstPassword);
    });

    cy.get('#toggleAddBalance').click({ force: true });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('#btnCloseModal').click();
  });

  it('Quando valor for de entrada na conta deve estar em verde', () => {
    cy.getAllLocalStorage().then((result) => {
      const assistantAccount =
        result['https://bugbank.netlify.app']['contaAuxiliar@bugbank.com'];
      const { email, password } = JSON.parse(assistantAccount);

      cy.get('input[type="email"]').first().focus().type(email);
      cy.get('input[type="password"]').first().focus().type(password);
      cy.contains('Acessar').first().click();
    });
    cy.get('#btn-EXTRATO').click();
    cy.contains('Saldo adicionado ao abrir conta').should('be.visible');
    cy.get('#textTransferValue').should('have.length', 1);
    cy.get('#textTransferValue').should('have.css', 'color', 'rgb(0, 128, 0)');
  });
});
