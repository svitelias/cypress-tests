const garagePage = require('../../pages/GaragePage');

describe('Garage', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  it('should add a car successfully', () => {
    garagePage.addCar('Audi', 'TT', '1000');
    cy.get('.car-item').should('exist');
  });
});
