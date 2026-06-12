import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import salesPage from '../../../support/pages/SalesPage';

// ─── Existing steps ───────────────────────────────────────────────────────────

When('I navigate to the sales page', () => {
	salesPage.visit();
});

When('I click on the first delete button on the sales page', () => {
	salesPage.clickFirstDelete();
});

Then('I should see the sale delete confirmation prompt', () => {
	salesPage.checkDeleteConfirmationPrompt();
});

Then('I should stay on the sales page', () => {
	salesPage.checkOnSalesPage();
});

// ─── TC_SAL_UI_ADM_001: heading and columns ───────────────────────────────────

Then('the page heading should read {string}', (heading: string) => {
	salesPage.checkPageHeading(heading);
});

Then('the sales table columns should include {string}, {string}, {string}, {string} and {string}',
	(c1: string, c2: string, c3: string, c4: string, c5: string) => {
		salesPage.checkTableColumns([c1, c2, c3, c4, c5]);
	}
);

Then('the {string} button should be visible on the page', (btnLabel: string) => {
	if (btnLabel === 'Sell Plant') {
		salesPage.checkSellPlantButtonVisible();
	} else {
		cy.contains('button, a', btnLabel).should('be.visible');
	}
});

// ─── TC_SAL_UI_ADM_002: plant dropdown ───────────────────────────────────────

When('I click the {string} button', (btnLabel: string) => {
	if (btnLabel === 'Sell Plant') {
		salesPage.clickSellPlant();
	} else {
		cy.contains('button, a', btnLabel).click();
	}
});

Then('only plants with available stock should appear in the plant dropdown', () => {
	salesPage.checkOnlyInStockPlantsInDropdown();
});

Then('plants with zero stock should not appear in the dropdown', () => {
	// "Lotus" is the only zero-stock plant in the seeded dataset
	salesPage.checkZeroStockPlantAbsent('Lotus');
});

// ─── TC_SAL_UI_ADM_003: validation ───────────────────────────────────────────

When('I enter {string} in the quantity field on the sell form', (qty: string) => {
	salesPage.enterQuantity(qty);
});

When('I click the Sell button without selecting a plant', () => {
	salesPage.clickSellWithoutSelectingPlant();
});

// ─── TC_SAL_UI_ADM_004: stock verification ────────────────────────────────────

Given('I note the current stock of plant with id {string}', (plantId: string) => {
	salesPage.storeStockForPlant(plantId);
});

When('I select plant with id {string} from the plant dropdown', (plantId: string) => {
	salesPage.selectPlantById(plantId);
});

When('I click the Sell button', () => {
	salesPage.clickSellButton();
});

Then('I should be on the Sales List page', () => {
	salesPage.checkOnSalesPage();
});

Then('the sales list should contain a record for {string}', (plantName: string) => {
	salesPage.checkSaleInList(plantName);
});

Then('the stock of plant with id {string} should be reduced by {int}', (plantId: string, qty: number) => {
	salesPage.checkStockReducedBy(plantId, qty);
});

// ─── TC_SAL_UI_ADM_005: cancel ────────────────────────────────────────────────

When('I note the current number of records in the sales list', () => {
	salesPage.storeCurrentRowCount();
});

When('I click the Cancel button on the sell plant form', () => {
	salesPage.clickCancelButton();
});

Then('the sales list record count should be unchanged', () => {
	salesPage.checkRowCountUnchanged();
});

// ─── TC_SAL_UI_USR_001: pagination presence ──────────────────────────────────

Then('the sales records should be displayed in a table', () => {
	salesPage.checkTableVisible();
});

Then('only a limited number of records should be shown per page', () => {
	salesPage.checkLimitedRowsPerPage();
});

Then('pagination controls should be visible on the page', () => {
	salesPage.checkPaginationVisible();
});

// ─── TC_SAL_UI_USR_002: default sort by Sold At desc ─────────────────────────

Then('the sales list should be sorted by Sold At in descending order by default', () => {
	salesPage.checkSortedBySoldAtDesc();
});

// ─── TC_SAL_UI_USR_003: sort by column header ────────────────────────────────

When('I click the {string} column header on the sales table', (headerText: string) => {
	salesPage.clickColumnHeader(headerText);
});

Then('the sales list should be sorted by plant name in ascending order', () => {
	salesPage.checkSortedByPlantNameAsc();
});

Then('the sales list should be sorted by plant name in descending order', () => {
	salesPage.checkSortedByPlantNameDesc();
});

// ─── TC_SAL_UI_USR_004: empty state ──────────────────────────────────────────

Given('there are no sales records in the system', () => {
	cy.task('queryDb', 'DELETE FROM sales');
});

Then('the message {string} should be displayed', (message: string) => {
	salesPage.checkNoSalesMessage(message);
});

Then('no sale rows should be visible in the table', () => {
	salesPage.checkNoTableRows();
});

// ─── TC_SAL_UI_USR_005: Next / Previous pagination ───────────────────────────

When('I note the sales records shown on the first page', () => {
	salesPage.storeFirstPageFirstRow();
});

When('I click the Next page button', () => {
	salesPage.clickNextPage();
});

Then('different sales records should be shown', () => {
	salesPage.checkDifferentRecordsShown();
});

When('I click the Previous page button', () => {
	salesPage.clickPreviousPage();
});

Then('the original first page sales records should be shown again', () => {
	salesPage.checkOriginalRecordsShown();
});
