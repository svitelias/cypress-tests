// Overwrite type command to hide sensitive data
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

// Custom login command
Cypress.Commands.add('login', (email, password) => {
  cy.get('button').contains('Sign In').click();
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });
  cy.get('button').contains('Login').click();
});
