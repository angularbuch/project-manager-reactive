context('Dashboard', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should automatically redirect to the dashboard', () => {
    cy.url().should('include', 'dashboard');
  });

  it('should show the dashboard header', () => {
    cy.get('h1').should('contain', 'Dashboard');
  });
});
