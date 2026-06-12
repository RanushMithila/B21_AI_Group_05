import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import dashboardPage from '../../../support/pages/DashboardPage';

When('I navigate to the dashboard page', () => {
    dashboardPage.visit();
});

When('I click on the Manage Categories button', () => {
    dashboardPage.clickManageCategories();
});

Then('I should see {string} main and {string} sub categories in the dashboard category card', (main: string, sub: string) => {
    dashboardPage.checkCategoriesCard(main, sub);
});

Given('There are {string} main categories and {string} sub categories in the system', (main: string, sub: string) => {
    dashboardPage.checkCategoryCount(main, sub);
});

Given('There are {int} plants in the system', (plants: number) => {
    dashboardPage.checkPlantCount(plants.toString());
})

Then('I should see {string} plants in the dashboard plants card', (plants: string) => {
    dashboardPage.checkPlantsCard(plants);
})

Then('I should see {string} total and {string} low stock plants in the dashboard plants card', (total: string, lowStock: string) => {
    dashboardPage.checkPlantsCardDetails(total, lowStock);
})

Then('I should see {string} sales in the dashboard sales card', (sales: string) => {
    dashboardPage.checkSalesCard(sales);
})

Given('There are {int} sales in the system', (sales: number) => {
    dashboardPage.checkSalesCount(sales.toString());
})

Then('I should see correct sales revenue in the dashboard sales card', () => {
    dashboardPage.checkSalesRevenueCard();
})

Given('There are sales in the system', () => {
    dashboardPage.checkSalesRevenueInSystem();
})

Then('I should be navigated to the categories page', () => {
    cy.url().should('include', '/ui/categories');
})

Then('I should see the sidebar with links {string}, {string}, {string}, {string}, and {string}', (l1: string, l2: string, l3: string, l4: string, l5: string) => {
    cy.contains('a', l1).should('be.visible');
    cy.contains('a', l2).should('be.visible');
    cy.contains('a', l3).should('be.visible');
    cy.contains('a', l4).should('be.visible');
    cy.contains('a', l5).should('be.visible');
});

Then('I should see the header text {string}', (headerText: string) => {
    cy.contains(headerText).should('be.visible');
});

Then('I should see the metric cards {string}, {string}, {string}, and {string}', (c1: string, c2: string, c3: string, c4: string) => {
    cy.contains('h6', c1).should('be.visible');
    cy.contains('h6', c2).should('be.visible');
    cy.contains('h6', c3).should('be.visible');
    cy.contains('h6', c4).should('be.visible');
});

Then('I should see the {string} card with {string} and {string} count labels', (cardTitle: string, label1: string, label2: string) => {
    cy.contains('h6', cardTitle)
        .parent()
        .parent()
        .should('contain.text', label1)
        .and('contain.text', label2);
});

When('I click on the {string} button on the dashboard', (btnLabel: string) => {
    cy.contains('a', btnLabel).should('be.visible').click();
});

Then('I should be navigated to the plants page', () => {
    cy.url().should('include', '/ui/plants');
});

Then('I should see correct sales revenue and sales count in the dashboard sales card', () => {
    dashboardPage.checkSalesCardMetrics();
});