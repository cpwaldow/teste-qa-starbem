describe('Cenários de testes para Login de user no BugBank', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/#');
  });

  it('Fazer login com sucesso - conta sem saldo', () => {
    const userEmail = 'testeLogin@bugbank.com';
    const userPassword = 'exaltaSambaEraBomDemais123#$';
    const userName = 'Pericles da Silva';

    cy.get('button').contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type(userEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(userName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).focus().type(userPassword);
    });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('#btnCloseModal').click();

    cy.get('input[type="email"]').first().focus().type(userEmail);
    cy.get('input[type="password"]').first().focus().type(userPassword);
    cy.contains('Acessar').first().click();
    cy.get('#textName').should('have.text', `Olá ${userName},`);
    cy.contains('bem vindo ao BugBank :)').should('be.visible');
    cy.contains('Saldo em conta R$ 0,00').should('be.visible');
    cy.contains('Sair').click();
  });

  it('Fazer login com sucesso - conta com saldo', () => {
    const userEmail = 'testeLogin@bugbank.com';
    const userPassword = 'exaltaSambaEraBomDemais123#$';
    const userName = 'Pericles da Silva';

    cy.get('button').contains('Registrar').click();
    cy.wait(100);

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
    cy.contains('Sair').click();
  });

  it('Erro de login com usuários não cadastrado', () => {
    const userEmail = 'testeErradoLogin@bugbank.com';
    const userPassword = 'exaltaSambaEraBomDemais123#$';

    cy.get('input[type="email"]').first().focus().type(userEmail);
    cy.get('input[type="password"]').first().focus().type(userPassword);
    cy.contains('Acessar').first().click();
    cy.contains(
      'Usuário ou senha inválido. Tente novamente ou verifique suas informações',
    ).should('be.visible');
    cy.contains('Fechar').click();
  });

  it('Erro de login com senha inválida', () => {
    const userEmail = 'testeLogin@bugbank.com';
    const userPassword = 'turmaDoPagode2023';

    cy.get('input[type="email"]').first().focus().type(userEmail);
    cy.get('input[type="password"]').first().focus().type(userPassword);
    cy.contains('Acessar').first().click();
    cy.contains(
      'Usuário ou senha inválido. Tente novamente ou verifique suas informações',
    ).should('be.visible');
    cy.contains('Fechar').click();
  });
});
