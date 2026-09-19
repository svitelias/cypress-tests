describe('Firefox test', () => {
  it('should open the home page in Firefox', () => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.get('button').contains('Sign In').should('be.visible');
    cy.get('button').contains('Guest log in').should('be.visible');
  });
});
