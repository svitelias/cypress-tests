class GaragePage {
  visit() {
    cy.visit('/panel/garage');
  }

  addCarButton() {
    return cy.get('button').contains('Add car');
  }

  brandSelect() {
    return cy.get('#addCarBrand');
  }

  modelSelect() {
    return cy.get('#addCarModel');
  }

  mileageInput() {
    return cy.get('#addCarMileage');
  }

  addButton() {
    return cy.get('.modal-footer button').contains('Add');
  }

  addCar(brand, model, mileage) {
    this.addCarButton().click();
    this.brandSelect().select(brand);
    this.modelSelect().select(model);
    this.mileageInput().clear().type(mileage);
    this.addButton().click();
  }
}

module.exports = new GaragePage();
