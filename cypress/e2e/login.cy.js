describe('Login', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });

  it('should login successfully with valid credentials', () => {
    cy.login('svitlana.elias@gmail.com', 'j!QiDZFMVu2!w');
    cy.url().should('include', '/garage');
  });
});
