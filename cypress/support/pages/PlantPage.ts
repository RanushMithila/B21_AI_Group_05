class PlantPage {
	visit() {
		cy.visit('/plants');
	}

	visitAdd() {
		this.visit();
		this.clickAddPlant();
	}

	visitEdit(plantId: string) {
		cy.visit(`/plants/edit/${plantId}`);
	}

	clickAddPlant() {
		cy.contains('a', 'Add a Plant').click();
	}

	clickCancel() {
		cy.contains('a', 'Cancel').click();
	}

	clickSave() {
		cy.contains('button', 'Save').click({ force: true });
	}

	fillPlantForm(name: string, price: string, quantity: string) {
		cy.get('input[type="text"]').clear().type(name);
		cy.get('input[type="number"]').first().clear().type(price);
		cy.get('input[type="number"]').last().clear().type(quantity);
	}

	fillNameField(name: string) {
		cy.get('input[type="text"]').clear().type(name);
	}

	fillPriceField(price: string) {
		cy.get('input[type="number"]').first().clear().type(price);
	}

	fillQuantityField(quantity: string) {
		cy.get('input[type="number"]').last().clear().type(quantity);
	}

	selectSubCategory() {
		cy.get('select').select('Cacti');
	}

	selectMainCategory() {
		cy.get('select').select('Indoor');
	}

	checkNameRequiredMessage() {
		cy.contains('Plant name is required').should('be.visible');
	}

	checkNameLengthMessage() {
		cy.contains('Plant name must be between 3 and 25 characters').should('be.visible');
	}

	checkPriceRequiredMessage() {
		cy.contains('Price is required').should('be.visible');
	}

	checkNegativeQuantityMessage() {
		cy.contains('Quantity cannot be negative').should('be.visible');
	}

	checkMainCategoryError() {
		cy.get('.text-danger, .invalid-feedback, .alert-danger').should('be.visible');
	}

	clickEditIconOnFirstRow() {
		cy.get('table tbody tr').first().find('a[href*="/edit"]').click();
	}

	clickDeleteIconOnFirstRow() {
		cy.on('window:confirm', () => true);
		cy.get('table tbody tr').first().find('a[href*="/delete"], button[data-action="delete"]').click();
	}

	confirmDeletion() {
		cy.get('body').then(body => {
			if (body.find('.modal-dialog, [role="dialog"]').length > 0) {
				cy.get('.modal-dialog .btn-danger, [role="dialog"] .btn-danger').first().click();
			}
		});
	}

	checkSuccessMessage(message: string) {
		cy.contains(message).should('be.visible');
	}

	checkAddButtonNotVisible() {
		cy.contains('a', 'Add a Plant').should('not.exist');
	}

	checkEditIconsNotVisibleInTable() {
		cy.get('table tbody tr').first().find('a[href*="/edit"]').should('not.exist');
	}

	checkDeleteIconsNotVisibleInTable() {
		cy.get('table tbody tr').first().find('a[href*="/delete"]').should('not.exist');
	}

	checkOnPlantsPage() {
		cy.location('pathname').should('eq', '/ui/plants');
	}

	checkOnEditPage() {
		cy.location('pathname').should('eq', '/ui/plants/edit/3');
	}

	checkPriceValidationMessage() {
		cy.contains('Price must be greater than 0').should('be.visible');
	}

	checkPlantCount(plantCount: string) {
		cy.visit('/plants');
		let totalPlantCount = 0;

		function countPlantsOnPage() {
			cy.get('table').find('tbody tr').then(rows => {
				totalPlantCount += rows.length;
			});
		}

		function goToNextPage() {
			cy.get('body').then(body => {
				if (body.find('.pagination').length === 0) {
					expect(totalPlantCount.toString()).to.eq(plantCount);
				} else {
					cy.get('.pagination').find('li').last().then(lastPageItem => {
						if (lastPageItem.hasClass('disabled')) {
							expect(totalPlantCount.toString()).to.eq(plantCount);
						} else {
							cy.wrap(lastPageItem).find('a').click({ force: true });
							countPlantsOnPage();
							goToNextPage();
						}
					});
				}
			});
		}

		countPlantsOnPage();
		goToNextPage();
	}
}

export default new PlantPage();
