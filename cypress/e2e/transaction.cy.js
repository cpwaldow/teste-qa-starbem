describe('Transição aprovadas entre contas', () => {
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

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('#btnCloseModal').click();
  });

  it('Fazer login com sucesso - conta com saldo', () => {
    const userEmail = 'testeTransacao@bugbank.com';
    const userPassword = 'senhaTransacao';
    const userName = 'Thiago Maia';

    cy.contains('Registrar').click();

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
    cy.contains('Saldo em conta R$ 500,00').should('be.visible');
    cy.contains('Sair').click();
  });
});

describe('Transação negada entre contas', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });
  it('Tentativa de transferência para conta inválida deve exibir mensagem de erro "Conta inválida ou inexistente"', () => {
    const userEmail = 'testeFalhaTransacao@bugbank.com';
    const userPassword = 'senhaFalhaTransacao';
    const userName = 'Martha Nunes';

    cy.contains('Registrar').click();

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
    cy.contains('Saldo em conta R$ 1.000,00').should('be.visible');
    cy.get('#btn-TRANSFERÊNCIA').click();
    cy.contains(
      'Realize transferência de valores entre contas BugBank com taxa 0 e em poucos segundos.',
    ).should('be.visible');

    cy.get(':nth-child(1) > .input__default').focus().type(123);
    cy.get('.account__data > :nth-child(2) > .input__default').focus().type(4);
    cy.get(
      '.styles__ContainerFormTransfer-sc-1oow0wh-0 > :nth-child(2) > .input__default',
    )
      .focus()
      .type(500);
    cy.contains('Transferir agora').click();
    cy.contains('Conta inválida ou inexistente').should('be.visible');
    cy.contains('Fechar').click();
    cy.contains('Voltar').click();
    cy.contains('Saldo em conta R$ 1.000,00').should('be.visible');
  });

  it('Número e digito da conta aceitam apenas números', () => {
    const userEmail = 'contaInvalida@bugbank.com';
    const userPassword = 'contaInvalidaTransacao';
    const userName = 'Naldo Benny';

    cy.contains('Registrar').click();

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
    cy.contains('Saldo em conta R$ 1.000,00').should('be.visible');
    cy.get('#btn-TRANSFERÊNCIA').click();
    cy.contains(
      'Realize transferência de valores entre contas BugBank com taxa 0 e em poucos segundos.',
    ).should('be.visible');

    cy.get(':nth-child(1) > .input__default').focus().type('aaaaa');
    cy.get('.account__data > :nth-child(2) > .input__default')
      .focus()
      .type('b');
    cy.get(
      '.styles__ContainerFormTransfer-sc-1oow0wh-0 > :nth-child(2) > .input__default',
    )
      .focus()
      .type(500);
    cy.contains('Transferir agora').click();
    cy.contains('Conta inválida ou inexistente').should('be.visible');
    cy.contains('Fechar').click();
    cy.contains('Voltar').click();
    cy.contains('Saldo em conta R$ 1.000,00').should('be.visible');
  });
});
