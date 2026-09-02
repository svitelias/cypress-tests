class FuelExpensesPage {
  visit() {
    cy.visit('/panel/expenses', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  }

  addExpenseButton() {
    return cy.get('button').contains('Add an expense');
  }

  dateInput() {
    return cy.get('#addExpenseDate');
  }

  mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  litersInput() {
    return cy.get('#addExpenseLiters');
  }

  totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  saveButton() {
    return cy.get('.modal-footer button').contains('Add');
  }

  addExpense(date, mileage, liters, totalCost) {
    this.addExpenseButton().click();
    this.dateInput().clear().type(date);
    this.mileageInput().clear().type(mileage);
    this.litersInput().clear().type(liters);
    this.totalCostInput().clear().type(totalCost);
    this.saveButton().click({force: true});
  }
}

module.exports = new FuelExpensesPage();
