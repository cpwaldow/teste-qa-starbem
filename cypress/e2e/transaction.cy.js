describe('Transição aprovadas entre contas', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('https://bugbank.netlify.app/');

    const firstEmail = 'contaAuxiliar@bugbank.com';
    const firstPassword = 'senhaTransacao';
    const FirstName = 'Vanessa Paixão';

    cy.contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type(firstEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(FirstName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).focus().type(firstPassword);
    });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('#btnCloseModal').click();
  });

  it('Fazer login com sucesso - conta com saldo', () => {
    const userEmail = 'testeTransacao@bugbank.com';
    const userPassword = 'senhaTransacao';
    const userName = 'Thiago Maia';

    cy.contains('Registrar').click();
    cy.wait(100);

    cy.get('input').each(($input) => {
      cy.get($input).focus().clear();
    });

    cy.get(':nth-child(2) > .input__default').focus().type(userEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(userName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).focus().type(userPassword);
    });

    cy.get('#toggleAddBalance').click({ force: true });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('#btnCloseModal').click();

    cy.get('input[type="email"]').first().focus().type(userEmail);
    cy.get('input[type="password"]').first().focus().type(userPassword);
    cy.contains('Acessar').first().click();
    cy.get('#textName').should('have.text', `Olá ${userName},`);
    cy.contains('bem vindo ao BugBank :)').should('be.visible');
    cy.contains('Saldo em conta R$ 1.000,00').should('be.visible');
    cy.get('#btn-TRANSFERÊNCIA').click();
    cy.contains(
      'Realize transferência de valores entre contas BugBank com taxa 0 e em poucos segundos.',
    ).should('be.visible');

    cy.getAllLocalStorage().then((result) => {
      const assistantAccount =
        result['https://bugbank.netlify.app']['contaAuxiliar@bugbank.com'];
      const accountDigit =
        JSON.parse(assistantAccount).accountNumber.split('-');
      cy.get(':nth-child(1) > .input__default').focus().type(accountDigit[0]);
      cy.get('.account__data > :nth-child(2) > .input__default')
        .focus()
        .type(accountDigit[1]);
    });

    cy.get(
      '.styles__ContainerFormTransfer-sc-1oow0wh-0 > :nth-child(2) > .input__default',
    )
      .focus()
      .type(500);
    cy.contains('Transferir agora').click();
    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');
    cy.contains('Transferencia realizada com sucesso').should('be.visible');
    cy.contains('Fechar').click();
    cy.contains('Voltar').click();
    cy.contains('Saldo em conta R$ 500,00');
    cy.contains('Sair').click();
  });
});