/// <reference types="cypress" />
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I send a DELETE request to delete category with id {string}', function (categoryId: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a POST request to create category with category name {string}', function (categoryName: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/categories`,
        headers: { Authorization: `Bearer ${token}` },
        body: { name: categoryName },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a POST request to create category with body', function (body: string) {
  const parsed = JSON.parse(body)
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/categories`,
        headers: { Authorization: `Bearer ${token}` },
        body: parsed,
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a POST request to create category with body without authentication', function (body: string) {
  const parsed = JSON.parse(body)
  cy.env(['apiUrl']).then(({ apiUrl }) => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/categories`,
      body: parsed,
      failOnStatusCode: false
    }).as('response')
  })
})

Then('the response body should contain the created category name {string}', (expectedName: string) => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.have.property('name')
    expect(body.name).to.eq(expectedName)
  })
})

Then('the response body should contain the category id {int}', (expectedId: number) => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.have.property('id')
    expect(body.id).to.eq(expectedId)
  })
})

Then('the response body should contain a non-empty subCategories array', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.have.property('subCategories')
    expect(body.subCategories).to.be.an('array')
    expect(body.subCategories).to.not.be.empty
  })
})


When('I send a PUT request to update category with id {string} and category name {string}', function (categoryId: string, categoryName: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        body: { name: categoryName },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

Then('the retrieved category with id {string} should have the name {string}', (categoryId: string, categoryName: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(categoryName);
      });
    });
  });
});

When('I send a GET request to view category with id {string}', (categoryId: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a GET request to view category with id {string} without authentication', (categoryId: string) => {
  cy.env(['apiUrl']).then(({ apiUrl }) => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/categories/${categoryId}`,
      failOnStatusCode: false
    }).as('response')
  })
})
