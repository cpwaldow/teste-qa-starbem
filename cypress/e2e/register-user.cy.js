describe.skip('Cenários de testes com sucesso para Cadastro de user no BugBank', () => {
  const successMsg = /A conta (\d+)-(\d+) foi criada com sucesso/;

  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
    cy.get('button').contains('Registrar').click();
  });

  it('Cadastrar informações e fechar modal de sucesso no botão "Fechar"', () => {
    const userEmail = 'newTestUser@bugbank.com';
    const userName = 'Maria Alice da Silva Sauro';
    const userPassword = 'senhaMaisDoQueSegura';

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
    cy.get('button').contains('Registrar').click();
  });

  it('Cadastrar informações e receber modal de erro de senhas não compatíveis', () => {
    const userEmail = 'andreNascimento@bugbank.com';
    const userPassword = '12345678';
    const userName = 'André Nascimento';
    const passwordErrorMsg = 'As senhas não são iguais.';

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

  it('Erro ao tentar enviar o formulário com campo de e-mail inválido', () => {
    cy.get(':nth-child(2) > .input__default').focus().type('input inválido');
    cy.get(':nth-child(3) > .input__default').focus().type('Natássia Ribeiro');

    cy.get('input[type="password"]:not(:first)').each(($input) => {
      cy.get($input).should('have.attr', 'type').and('equal', 'password');
      cy.get($input).focus().type('abcdefg');
    });

    cy.contains('Formato inválido').should('exist');
    cy.contains('Cadastrar').click({ force: true });
    cy.get('.card__register').should(($form) => {
      $form.not().submit();
    });
  });

  it('Tentativa de cadastro sem preencher confirmação de senha deve visualizar a mensagem "Confirmar senha não pode ser vazio"', () => {
    cy.get(':nth-child(2) > .input__default')
      .focus()
      .type('rodrigao@gmail.com');
    cy.get(':nth-child(3) > .input__default').focus().type('Rodrigo Goes');
    cy.get('input[type="password"]:not(:first)').first().focus().type('123456');
    cy.contains('Cadastrar').click({ force: true });
    cy.contains('É campo obrigatório').should('exist');
    cy.get('.card__register').should(($form) => {
      $form.not().submit();
    });
  });
});
