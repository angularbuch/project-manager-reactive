import { includes, isTypedArray } from 'cypress/types/lodash';
import { TaskListComponent } from './../../src/app/tasks/task-list/task-list.component';
describe('Task-List', () => {
  beforeEach(() => {
    cy.visit('tasks');
  });

  it('should display the task list', () => {
    cy.get('.task-list-entry').its('length').should('be.at.least', 1);
  });

  it('should allow searching for tasks', () => {
    cy.get('#search-tasks').type('Ersten Prototyp').wait(500);
    cy.get('.task-list-entry').its('length').should('be.equal', 1);
  });

  it('should show the task-overview when clicking on a task', () => {
    cy.get('.task-list-entry:first').click();
    cy.get('.overview').contains('Task-Übersicht');
    cy.get('.overview').should('contain', 'Task-Übersicht');
    cy.get('.overview').then((element) => {
      expect(element.text()).contains('Task-Übersicht');
    });
    cy.get('.overview').then((element) => {
      expect(element).to.contain('Task-Übersicht');
    });
  });

it('should allow searching for tasks (advanced)', () => {

  cy.intercept('GET', '**/api/tasks/**', (request) => {
    delete request.headers['if-none-match'];
  }).as('search');

  const searchTerm = 'Ersten Prototyp';
  cy.get('#search-tasks').type(searchTerm).then((e) => {
    //debugger;
  } );

  cy.wait('@search')
    .its('request.url')
    .should('contain', encodeURIComponent(searchTerm));

  cy.get('.task-list-entry').debug().its('length').should('be.equal', 1);
});

  it('should only return elements matching the search string', () => {
    const searchTerm = 'Ersten Prototyp';

    cy.intercept('GET', '**/api/tasks/**', (request) => {
      delete request.headers['if-none-match'];
    }).as('search');
    cy.get('#search-tasks').type(searchTerm);
    cy.wait('@search')
    .its('response.body')
    .should('have.length', 1)
    .its('0')
    .should(firstObject => expect(firstObject.title.includes(searchTerm)));
  });

  it('should save the searchTerm in the form-component', () => {
    const searchTerm = 'Ersten Prototyp';
    cy.get('#search-tasks').type(searchTerm);

    let ng!: any;

    cy.window()
      .then((win) => {
        ng = (win as any).ng; //
      })
      .then(() => cy.document())
      .then((doc) => {
        const taskListInstance = ng.getComponent(
          doc.querySelector('pjm-task-list')
        ) as TaskListComponent;
        assert.equal(taskListInstance.searchTerm.value, searchTerm);
      });
  });

  it('should display a message when the list is empty', () => {
    cy.intercept('**/api/tasks/**', []);
    cy.visit('tasks');
    cy.get('.task-list').should('contain', 'Keine Aufgaben vorhanden').then(() => cy.pause());
  });

  it('should display the title of a task in the list', () => {
    cy.intercept('**/api/tasks/**', { fixture: 'tasks.json' });
    cy.visit('tasks');
    cy.get('.task-list-entry:first').should('contain', 'Ich bin ein Test-Task');
  });
});
