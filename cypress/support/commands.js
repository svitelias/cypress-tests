Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('button').contains('Sign In').click();
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });
  cy.get('button').contains('Login').click();
});

Cypress.Commands.add('createExpenseApi', (carId, expenseData) => {
  cy.request({
    method: 'POST',
    url: '/api/expenses',
    body: {
      carId: carId,
      reportedAt: expenseData.reportedAt,
      mileage: expenseData.mileage,
      liters: expenseData.liters,
      totalCost: expenseData.totalCost,
    },
  });
});
