describe('Create Task', () => {

  beforeEach(() => {
    cy.visit('tasks/new');
  });

  it('should display the correct title', () => {
    cy.get('h2').should('have.text', 'Neue Aufgabe anlegen');
  });

  it.only('should validate the form data', () => {
    cy.get('[name="title"]').type('abc').blur();
    cy.get('[name="assignee_email"]').type('not_valid').blur();

    cy.get('form').should('contain', 'Titel muss mindestens 5 Zeichen enthalten');
    cy.get('form').should('contain', 'Bitte geben Sie eine gültige E-Mail Adresse an');
    cy.get('[type="submit"]').should('be.disabled');
  });


  it.only('should create new tasks', () => {
    const newTaskTitle = 'New Task ' + new Date().getTime();
    cy.pause();
    cy.get('[name="title"]').type(newTaskTitle);
    cy.get('[name="description"]').type('This is a test task');
    cy.get('[name="state"]').select('IN_PROGRESS');
    cy.get('[type="submit"]').click();

    // Check Task was successfully saved
    cy.url().should(url => expect(url.endsWith('tasks')).equal(true));
    cy.get('.task-list').should('contain', newTaskTitle);
  });

it('should create new tasks (use custom commands)', () => {
  const newTaskTitle = 'New Task ' + new Date().getTime();
  cy.fillForm([
    {key: 'title', text: newTaskTitle},
    {key: 'description', text: 'This is a test task'},
    {key: 'state', selectValue: 'IN_PROGRESS'},
  ]);
  cy.get('[type="submit"]').click();
  cy.url().should(url => expect(url.endsWith('tasks')).equal(true));
  cy.get('.task-list').should('contain', newTaskTitle);
});

  it('should stay on the page when discarding window.confirm', () => {
    cy.on('window:confirm', () => false);
    cy.get('[name="title"]').type('Test Eingabe');
    cy.get('#cancel').click();
    cy.url().should('contain', 'tasks/new');
  });

  it('should leave the page when accepting window.confirm', () => {
    cy.on('window:confirm', () => true);
    cy.get('[name="title"]').type('Test Eingabe');
    cy.get('#cancel').click();
    cy.url().then(url => expect(url.endsWith('tasks')).equal(true));
  });

});
