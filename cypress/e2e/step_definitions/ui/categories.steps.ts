import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import categoryPage from '../../../support/pages/CategoryPage';

Given('a main category named {string} exists', (categoryName: string) => {
  cy.task('queryDb', `INSERT INTO categories (name, parent_id) VALUES ('${categoryName}', NULL)`);
});

Given('no categories exist in the system', () => {
  const cleanupQuery = `
    SET FOREIGN_KEY_CHECKS = 0;
    DELETE FROM sales;
    DELETE FROM inventory;
    DELETE FROM plants;
    DELETE FROM categories;
    SET FOREIGN_KEY_CHECKS = 1;
  `;
  cy.task('queryDb', cleanupQuery);
});

When('I navigate to the categories page', () => {
  categoryPage.visit();
});

When('I navigate to the categories add page', () => {
  categoryPage.visitAdd();
});

When('I click on the "Save" button on the category form', () => {
  categoryPage.clickSave();
});

When('I click on the "Add A Category" button', () => {
  categoryPage.clickAddCategory();
});

When('I enter {string} in the category name field', (categoryName: string) => {
  categoryPage.fillCategoryName(categoryName);
});

When('I leave the category name field empty', () => {
  categoryPage.clearCategoryName();
});

When('I select {string} as the parent category', (parentName: string) => {
  categoryPage.selectParentCategory(parentName);
});

Then('I should see the "Add A Category" button in the page header', () => {
  categoryPage.checkAddButtonVisible();
});

Then('I should not see the "Add A Category" button in the page header', () => {
  categoryPage.checkAddButtonNotVisible();
});

Then('I should stay on the categories add page', () => {
  categoryPage.checkOnAddPage();
});

Then('I should see the access denied page', () => {
  categoryPage.checkAccessDeniedPage();
});

Then('the category list page should load successfully', () => {
  categoryPage.checkCategoryListPageLoaded();
});

Then('I should see the no categories found message', () => {
  categoryPage.checkNoCategoriesFoundMessage();
});

Then('I should not see edit or delete action buttons on the category list', () => {
  categoryPage.checkEditDeleteActionsNotVisible();
});

Then('I should see the Category Name validation messages', () => {
  categoryPage.checkCategoryNameValidationMessages();
});

Then('I should see {string} in the category list', (categoryName: string) => {
  categoryPage.checkCategoryInList(categoryName);
});
