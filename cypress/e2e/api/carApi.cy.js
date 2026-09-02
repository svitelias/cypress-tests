const garagePage = require('../../pages/GaragePage');

describe('Car API Testing', () => {
  const expenseData = {
    reportedAt: '2026-09-02',
    mileage: 2000,
    liters: 30,
    totalCost: 500,
  };

  let carId;

  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  it('should intercept car creation and validate response', () => {
    cy.intercept('POST', '/api/cars').as('createCar');
    garagePage.addCar('Audi', 'TT', '1000');
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      carId = interception.response.body.data.id;
      expect(carId).to.exist;
      cy.wrap(carId).as('carId');
    });
  });

  it('should get cars list and validate created car', function () {
    cy.intercept('POST', '/api/cars').as('createCar');
    garagePage.addCar('Audi', 'TT', '1000');
    cy.wait('@createCar').then((interception) => {
      carId = interception.response.body.data.id;
      cy.request({
        method: 'GET',
        url: '/api/cars',
      }).then((response) => {
        expect(response.status).to.eq(200);
        const cars = response.body.data;
        const createdCar = cars.find((car) => car.id === carId);
        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq('Audi');
        expect(createdCar.model).to.eq('TT');
        expect(createdCar.mileage).to.eq(1000);
      });
    });
  });

  it('should create expense via API and validate response', () => {
    cy.intercept('POST', '/api/cars').as('createCar');
    garagePage.addCar('Audi', 'TT', '1000');
    cy.wait('@createCar').then((interception) => {
      carId = interception.response.body.data.id;
      cy.createExpenseApi(carId, expenseData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.carId).to.eq(carId);
        expect(response.body.data.mileage).to.eq(expenseData.mileage);
        expect(response.body.data.liters).to.eq(expenseData.liters);
        expect(response.body.data.totalCost).to.eq(expenseData.totalCost);
      });
    });
  });

  it('should validate expense in UI', () => {
    cy.intercept('POST', '/api/cars').as('createCar');
    garagePage.addCar('Audi', 'TT', '1000');
    cy.wait('@createCar').then((interception) => {
      carId = interception.response.body.data.id;
      cy.createExpenseApi(carId, expenseData);
      cy.visit('/panel/expenses', {
        auth: {
          username: 'guest',
          password: 'welcome2qauto',
        },
      });
      cy.get('tbody tr').should('exist');
      cy.get('tbody tr').first().within(() => {
        cy.get('td').eq(1).should('contain', expenseData.mileage);
        cy.get('td').eq(2).should('contain', expenseData.liters);
      });
    });
  });
});
