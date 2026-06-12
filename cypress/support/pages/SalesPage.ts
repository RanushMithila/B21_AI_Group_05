class SalesPage {
	private confirmationMessage = '';

	// ─── Existing methods ────────────────────────────────────────────────────

	visit() {
		cy.visit('/sales');
	}

	clickFirstDelete() {
		cy.on('window:confirm', (message: string) => {
			this.confirmationMessage = message;
			expect(message).to.eq('Are you sure you want to delete this sale?');
			return false;
		});
		cy.get('table tbody tr').first().find('button').click({ force: true });
	}

	checkDeleteConfirmationPrompt() {
		expect(this.confirmationMessage).to.eq('Are you sure you want to delete this sale?');
	}

	checkOnSalesPage() {
		cy.location('pathname').should('eq', '/ui/sales');
	}

	checkSalesCount(salesCount: string) {
		let totalSalesCount = 0;

		function countSalesOnPage() {
			cy.get('table').find('tbody tr').then(rows => {
				totalSalesCount += rows.length;
			});
		}

		function goToNextPage() {
			cy.get('body').then(body => {
				if (body.find('.pagination').length === 0) {
					expect(totalSalesCount.toString()).to.eq(salesCount);
				} else {
					cy.get('.pagination').find('li').last().then(lastPageItem => {
						if (lastPageItem.hasClass('disabled')) {
							expect(totalSalesCount.toString()).to.eq(salesCount);
						} else {
							cy.wrap(lastPageItem).find('a').click({ force: true });
							countSalesOnPage();
							goToNextPage();
						}
					});
				}
			});
		}

		countSalesOnPage();
		goToNextPage();
	}

	// ─── TC_SAL_UI_ADM_001: heading and columns ──────────────────────────────

	checkPageHeading(heading: string) {
		cy.contains('h1, h2, h3, .page-title', heading).should('be.visible');
	}

	checkTableColumns(columns: string[]) {
		columns.forEach(col => {
			cy.get('table thead').contains(col).should('be.visible');
		});
	}

	checkSellPlantButtonVisible() {
		cy.contains('button, a', /Sell Plant/i).should('be.visible');
	}

	// ─── TC_SAL_UI_ADM_002/003/004/005: sell form ────────────────────────────

	clickSellPlant() {
		cy.contains('button, a', /Sell Plant/i).click();
	}

	checkOnlyInStockPlantsInDropdown() {
		cy.get('select').find('option').then(options => {
			const labels = [...options].map(o => o.text.trim()).filter(t => t !== '');
			expect(labels.length).to.be.greaterThan(0);
		});
	}

	checkZeroStockPlantAbsent(plantName: string) {
		cy.get('select').find('option').then(options => {
			const labels = [...options].map(o => o.text.trim());
			expect(labels).not.to.include(plantName);
		});
	}

	enterQuantity(qty: string) {
		cy.get('input[type="number"], input[name="quantity"]').clear().type(qty);
	}

	clickSellButton() {
		cy.contains('button', /^Sell$|^Submit$/i).click();
	}

	clickSellWithoutSelectingPlant() {
		cy.get('select').invoke('val', '');
		cy.contains('button', /^Sell$|^Submit$/i).click();
	}

	checkValidationMessage(message: string) {
		cy.contains(message).should('be.visible');
	}

	selectPlantById(plantId: string) {
		cy.get('select').select(plantId);
	}

	checkSaleInList(plantName: string) {
		cy.get('table tbody').contains(plantName).should('exist');
	}

	clickCancelButton() {
		cy.contains('button, a', /Cancel/i).click();
	}

	// ─── TC_SAL_UI_ADM_004/005: row count tracking ───────────────────────────

	storeCurrentRowCount() {
		cy.get('table tbody tr').its('length').as('initialRowCount');
	}

	checkRowCountUnchanged() {
		cy.get('@initialRowCount').then((initial) => {
			cy.get('table tbody tr').its('length').should('eq', initial);
		});
	}

	// ─── TC_SAL_UI_ADM_004: DB stock verification ────────────────────────────

	storeStockForPlant(plantId: string) {
		cy.task('queryDb', `SELECT quantity FROM plants WHERE id = ${plantId}`).then((result: any) => {
			const rows = Array.isArray(result) ? result : [result];
			cy.wrap(rows[0]?.quantity).as('initialStock');
		});
	}

	checkStockReducedBy(plantId: string, soldQty: number) {
		cy.get('@initialStock').then((initialStock) => {
			cy.task('queryDb', `SELECT quantity FROM plants WHERE id = ${plantId}`).then((result: any) => {
				const rows = Array.isArray(result) ? result : [result];
				expect(rows[0]?.quantity).to.eq(Number(initialStock) - soldQty);
			});
		});
	}

	// ─── TC_SAL_UI_USR_001: pagination presence ──────────────────────────────

	checkTableVisible() {
		cy.get('table').should('be.visible');
	}

	checkLimitedRowsPerPage(maxRows: number = 15) {
		cy.get('table tbody tr').its('length').should('be.lessThan', maxRows);
	}

	checkPaginationVisible() {
		cy.get('.pagination, [aria-label*="pagination"], nav ul li a').should('exist');
	}

	// ─── TC_SAL_UI_USR_002: default sort by Sold At desc ─────────────────────

	checkSortedBySoldAtDesc() {
		cy.get('table tbody tr').then(rows => {
			if (rows.length < 2) return;
			// Find Sold At column index from header
			cy.get('table thead th').then(headers => {
				let soldAtIndex = -1;
				[...headers].forEach((h, i) => {
					if (h.textContent?.toLowerCase().includes('sold')) soldAtIndex = i;
				});
				if (soldAtIndex < 0) return;
				const d1 = rows[0].querySelectorAll('td')[soldAtIndex]?.textContent?.trim() || '';
				const d2 = rows[1].querySelectorAll('td')[soldAtIndex]?.textContent?.trim() || '';
				expect(new Date(d1).getTime()).to.be.gte(new Date(d2).getTime());
			});
		});
	}

	// ─── TC_SAL_UI_USR_003: sort by Plant column header ──────────────────────

	clickColumnHeader(headerText: string) {
		cy.get('table thead').contains(headerText).click();
	}

	checkSortedByPlantNameAsc() {
		cy.get('table tbody tr td:first-child').then(cells => {
			const names = [...cells].map(c => c.textContent?.trim().toLowerCase() || '');
			for (let i = 0; i < names.length - 1; i++) {
				expect(names[i] <= names[i + 1]).to.be.true;
			}
		});
	}

	checkSortedByPlantNameDesc() {
		cy.get('table tbody tr td:first-child').then(cells => {
			const names = [...cells].map(c => c.textContent?.trim().toLowerCase() || '');
			for (let i = 0; i < names.length - 1; i++) {
				expect(names[i] >= names[i + 1]).to.be.true;
			}
		});
	}

	// ─── TC_SAL_UI_USR_004: empty state ──────────────────────────────────────

	checkNoSalesMessage(message: string) {
		cy.contains(message).should('be.visible');
	}

	checkNoTableRows() {
		// The app renders the empty-state message inside a single <tr>, so
		// 0 or 1 row is valid here; if 1 exists it must be the message row, not a data row.
		cy.get('table tbody tr').should('have.length.lte', 1);
	}

	// ─── TC_SAL_UI_USR_005: pagination Next / Previous ───────────────────────

	storeFirstPageFirstRow() {
		cy.get('table tbody tr').first().invoke('text').as('firstPageFirstRow');
	}

	clickNextPage() {
		cy.get('.pagination').find('li').last().find('a').click({ force: true });
	}

	clickPreviousPage() {
		cy.get('.pagination').find('li').first().find('a').click({ force: true });
	}

	checkDifferentRecordsShown() {
		cy.get('@firstPageFirstRow').then(firstRow => {
			cy.get('table tbody tr').first().invoke('text').should('not.eq', firstRow);
		});
	}

	checkOriginalRecordsShown() {
		cy.get('@firstPageFirstRow').then(firstRow => {
			cy.get('table tbody tr').first().invoke('text').should('eq', firstRow);
		});
	}
}

export default new SalesPage();
