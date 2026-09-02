describe('Header and Footer Navigation', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });

  describe('Header buttons', () => {
    it('should find Sign In button in header', () => {
      cy.get('button').contains('Sign In').should('be.visible');
    });

    it('should find Guest log in button in header', () => {
      cy.get('button').contains('Guest log in').should('be.visible');
    });
  });

  describe('Footer links and buttons', () => {
    it('should find Contacts section in footer', () => {
      cy.get('.d-flex.align-items-center').contains('Contacts').should('exist');
    });

    it('should find ithillel.ua link in footer', () => {
      cy.get('a').contains('ithillel.ua').should('exist');
    });

    it('should find support email in footer', () => {
      cy.get('a').contains('support@ithillel.ua').should('exist');
    });

    it('should find copyright text in footer', () => {
      cy.get('footer').contains('2021 Hillel IT school').should('exist');
    });
  });
});
