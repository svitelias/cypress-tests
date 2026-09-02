describe('Sample Test', () => {
  it('should visit the base URL', () => {
    cy.visit('/');
    cy.url().should('include', 'jsonplaceholder');
  });
});
