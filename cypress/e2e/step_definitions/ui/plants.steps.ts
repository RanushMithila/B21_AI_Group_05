import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import plantPage from '../../../support/pages/PlantPage';

When('I navigate to the plants page', () => {
	plantPage.visit();
});

When('I click on the "Add a Plant" button', () => {
	plantPage.clickAddPlant();
});

When('I click on the "Cancel" link', () => {
	plantPage.clickCancel();
});

When('I navigate to the plant edit page for plant id {string} with the following plant data:', (plantId: string, dataTable: DataTable) => {
	const plantData = dataTable.hashes()[0];
	plantPage.visitEdit(plantId);
	plantPage.fillPlantForm(plantData.name, plantData.price, plantData.quantity);
});

When('I click on the "Save" button on the plant form', () => {
	plantPage.clickSave();
});

Then('I should be navigated back to the plants page', () => {
	plantPage.checkOnPlantsPage();
});

Then('I should stay on the plant edit page', () => {
	plantPage.checkOnEditPage();
});

Then('I should see the price validation message', () => {
	plantPage.checkPriceValidationMessage();
});

Then('I should see {string} plants in the plant list', (plants: string) => {
	plantPage.checkPlantCount(plants);
});

// === PLNT_UI_ADMIN_001–005: Form validation on add page ===

When('I navigate to the add plant page', () => {
	plantPage.visitAdd();
});

When('I enter {string} in the plant name field', (name: string) => {
	plantPage.fillNameField(name);
});

When('I select a sub-category from the dropdown', () => {
	plantPage.selectSubCategory();
});

Then('the category dropdown should not offer main categories', () => {
	plantPage.checkMainCategoriesNotSelectable();
});

When('I enter {string} in the price field', (price: string) => {
	plantPage.fillPriceField(price);
});

When('I enter {string} in the quantity field', (quantity: string) => {
	plantPage.fillQuantityField(quantity);
});

Then('I should see the plant name required validation message', () => {
	plantPage.checkNameRequiredMessage();
});

Then('I should see the plant name length validation message', () => {
	plantPage.checkNameLengthMessage();
});

Then('I should see the price required validation message', () => {
	plantPage.checkPriceRequiredMessage();
});

Then('I should see the negative quantity validation message', () => {
	plantPage.checkNegativeQuantityMessage();
});


// === PLNT_UI_ADMIN_006: Edit plant ===

When('I click the edit icon on the first plant row', () => {
	plantPage.clickEditIconOnFirstRow();
});

When('I update the plant name to {string}', (name: string) => {
	plantPage.fillNameField(name);
});

Then('I should see the plant updated success message', () => {
	plantPage.checkSuccessMessage('Plant updated successfully');
});

// === PLNT_UI_ADMIN_007: Delete plant ===

When('I click the delete icon on the first plant row', () => {
	plantPage.clickDeleteIconOnFirstRow();
});

When('I confirm the plant deletion', () => {
	plantPage.confirmDeletion();
});

Then('I should see the plant deleted success message', () => {
	plantPage.checkSuccessMessage('Plant deleted successfully');
});

// === PLNT_UI_USR_001–003: User role visibility ===

Then('the Add Plant button should not be visible', () => {
	plantPage.checkAddButtonNotVisible();
});

Then('the edit icon should not be visible on any plant row', () => {
	plantPage.checkEditIconsNotVisibleInTable();
});

Then('the delete icon should not be visible on any plant row', () => {
	plantPage.checkDeleteIconsNotVisibleInTable();
});
