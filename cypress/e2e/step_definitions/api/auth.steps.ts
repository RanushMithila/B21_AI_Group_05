/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I send a POST request to login as admin with username {string} and password {string}', function (username: string, password: string) {
  cy.env(['apiUrl']).then(({ apiUrl }) => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: { username, password },
      failOnStatusCode: false
    }).as('response');
  });
});

Then('the response body should contain a valid JWT token', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string');
    expect(body.token).to.not.be.empty;
  });
});

When('I send a POST request to login with username {string} and password {string}', function (username: string, password: string) {
  cy.env(['apiUrl']).then(({ apiUrl }) => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: { username, password },
      failOnStatusCode: false
    }).as('response');
  });
});