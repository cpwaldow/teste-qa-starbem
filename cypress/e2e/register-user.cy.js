describe('Cenários de testes com sucesso para Cadastro de user no BugBank', () => {
  const successMsg = /A conta (\d+)-(\d+) foi criada com sucesso/;

  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });

  it('Cadastrar informações e fechar modal de sucesso no botão "Fechar"', () => {
    const userEmail = 'newTestUser@bugbank.com';
    const userName = 'Maria Alice da Silva Sauro';
    const userPassword = 'senhaMaisDoQueSegura';
    cy.get('button').contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type(userEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(userName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'password');
      cy.get($input).focus().type(userPassword);
    });

    cy.get('.login__eye:not(:first)').each(($eyeBtn) => {
      $eyeBtn.click();
    });

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'text');
    });

    cy.get('#toggleAddBalance').click({ force: true });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');

    cy.contains(successMsg).should('be.visible');

    cy.get('#btnCloseModal').click();
  });

  it('Cadastrar informações e fechar modal de sucesso no botão "X"', () => {
    const userEmail = 'notSoNewTestUser@bugbank.com';
    const userPassword = 'senhaMaisDoQueSeguraSeguraca';
    const userName = 'Anderson Silva';

    cy.get('button').contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type(userEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(userName);

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'password');
      cy.get($input).focus().type(userPassword);
    });

    cy.get('.login__eye:not(:first)').each(($eyeBtn) => {
      $eyeBtn.click();
    });

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'text');
    });

    cy.get('#toggleAddBalance').click({ force: true });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');

    cy.contains(successMsg).should('be.visible');

    cy.get('.styles__ContainerCloseButton-sc-8zteav-2 > a').click();
  });
});

describe('Cenários de teste com erro para Cadastro de user no BugBank', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });

  it('Cadastrar informações e receber modal de erro de senhas não compatíveis', () => {
    const userEmail = 'andreNascimento@bugbank.com';
    const userPassword = '12345678';
    const userName = 'André Nascimento';
    const passwordErrorMsg = 'As senhas não são iguais.';

    cy.get('button').contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type(userEmail);

    cy.get(':nth-child(3) > .input__default').focus().type(userName);

    cy.get('input[type="password"]:not(:first)').each(($input, index) => {
      if (index === 0) {
        cy.get($input).should('have.attr', 'type').and('equal', 'password');
        cy.get($input).focus().type(userPassword);
      }
      cy.get($input).should('have.attr', 'type').and('equal', 'password');
      cy.get($input).focus().type('abcdefg');
    });

    cy.get('.login__eye:not(:first)').each(($eyeBtn) => {
      $eyeBtn.click();
    });

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'text');
    });

    cy.get('#toggleAddBalance').click({ force: true });

    cy.get('button[type="submit"]:not(:first)').click({ force: true });

    cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible');

    cy.contains(passwordErrorMsg).should('be.visible');

    cy.get('#btnCloseModal').click();
  });

  // TODO: Validação de mensagens de erro ao preencher input de forma inválida.

  it.skip('Erro ao tentar enviar o formulário com campo de e-mail inválido', () => {
    cy.get('button').contains('Registrar').click();
    cy.wait(100);

    cy.get(':nth-child(2) > .input__default').focus().type('input inválido');
    cy.get('.kOeYBn > .input__warging').should('be.visible', {
      force: true,
    });
  });
});
