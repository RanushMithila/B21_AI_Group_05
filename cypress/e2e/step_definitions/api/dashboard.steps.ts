import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I send a GET request to retrieve the system health status', function () {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/health`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response');
    });
  });
});

Then('the response body should contain status {string}', (expectedStatus: string) => {
  cy.get('@response').its('body').then((body: any) => {
    expect(body).to.have.property('status');
    expect(body.status).to.eq(expectedStatus);
  });
});