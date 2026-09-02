describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.get('button').contains('Sign In').click();
    cy.get('.modal-content').contains('Registration').click();
  });

  it('should register successfully with valid data', () => {
    const timestamp = Date.now();
    cy.get('#signupName').type('Svitlana');
    cy.get('#signupLastName').type('Elias');
    cy.get('#signupEmail').type(`test_${timestamp}@gmail.com`);
    cy.get('#signupPassword').type('Test1234!', { sensitive: true });
    cy.get('#signupRepeatPassword').type('Test1234!', { sensitive: true });
    cy.get('button').contains('Register').click();
    cy.url().should('include', '/garage');
  });

  it('should show error when Name is empty', () => {
    cy.get('#signupName').focus().blur();
    cy.get('#signupName').parents('.form-group')
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name required');
  });

  it('should show error when Last name is empty', () => {
    cy.get('#signupLastName').focus().blur();
    cy.get('#signupLastName').parents('.form-group')
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Last name required');
  });

  it('should show error when Email is invalid', () => {
    cy.get('#signupEmail').type('invalid-email').blur();
    cy.get('#signupEmail').parents('.form-group')
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Email is incorrect');
  });

  it('should show error when passwords do not match', () => {
    cy.get('#signupPassword').type('Test1234!', { sensitive: true });
    cy.get('#signupRepeatPassword').type('Different1!', { sensitive: true }).blur();
    cy.get('#signupRepeatPassword').parents('.form-group')
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Passwords do not match');
  });

  it('should show error when password is too short', () => {
    cy.get('#signupPassword').type('short', { sensitive: true }).blur();
    cy.get('#signupPassword').parents('.form-group')
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Password has to be from 8 to 15 characters');
  });
});
