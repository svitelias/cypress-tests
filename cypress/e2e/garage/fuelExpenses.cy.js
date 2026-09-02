const garagePage = require('../../pages/GaragePage');
const fuelExpensesPage = require('../../pages/FuelExpensesPage');

describe('Fuel Expenses', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.login(Cypress.env('email'), Cypress.env('password'));
    garagePage.addCar('Audi', 'TT', '1000');
  });

  it('should add fuel expense to a car', () => {
    fuelExpensesPage.visit();
    fuelExpensesPage.addExpense('2.09.2026', '2000', '30', '500');
    cy.get('tbody tr').should('exist');
  });
});
