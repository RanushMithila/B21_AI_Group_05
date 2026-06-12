import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I open the browser and navigate to the login page', () => {
  cy.visit('/ui/login');
});

Then('I should see the logo image with alt attribute {string}', (altText: string) => {
  cy.get('img').should('have.attr', 'alt', altText).and('be.visible');
});

Then('I should see the {string} and {string} input fields with their placeholders', (userLabel: string, passLabel: string) => {
  cy.get('input[name="username"]').should('have.attr', 'placeholder', `Enter your ${userLabel.toLowerCase()}`).and('be.visible');
  cy.get('input[name="password"]').should('have.attr', 'placeholder', `Enter your ${passLabel.toLowerCase()}`).and('be.visible');
});

Then('I should see the submit button with the text {string}', (buttonText: string) => {
  cy.get('button[type="submit"]').should('contain.text', buttonText).and('be.visible');
});

When('I leave the {string} field empty', (fieldName: string) => {
  cy.get(`input[name="${fieldName.toLowerCase()}"]`).clear();
});

When('I enter {string} in the {string} field', (text: string, fieldName: string) => {
  cy.get(`input[name="${fieldName.toLowerCase()}"]`).clear().type(text);
});


Then('the {string} field should have the {string} class', (fieldName: string, className: string) => {
  cy.get(`input[name="${fieldName.toLowerCase()}"]`).should('have.class', className);
});

Then('the validation message {string} should appear', (message: string) => {
  cy.contains('.invalid-feedback', message).should('be.visible');
});

Then('I should be redirected to the system dashboard', () => {
  cy.url().should('include', '/ui/dashboard');
});

Then('I should see an error alert with the message {string}', (message: string) => {
  cy.contains('.alert-danger, .alert.text-danger, [class*="alert"]', message).should('be.visible');
});