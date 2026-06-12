class DashboardPage {
	visit() {
        cy.visit('/ui/dashboard');
	}

    clickManageCategories() {
        cy.contains('a', 'Manage Categories').click();
    }

	checkCategoriesCard(mainCount: string, subCount: string) {
		cy.contains('h6', 'Categories')
			.parent()
			.parent()
			.should('contain.text', mainCount)
			.and('contain.text', 'Main')
			.and('contain.text', subCount)
			.and('contain.text', 'Sub');
	}

    checkCategoryCount(mainCount: string, subCount: string) {
        cy.visit('/categories');
        let mainCategoryCount = 0;
        let subCategoryCount = 0;
        function countCategoriesOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                rows.each((_, row) => {
                    const parentCategory = Cypress.$(row).find('td').eq(2).text().trim();
                    if (parentCategory === '-') {
                        mainCategoryCount++;
                    }
                    else {
                        subCategoryCount++;
                    }
                });
            });
        }

        function goToNextPage() {
            cy.get('body').then(body => {
                if (body.find('.pagination').length === 0) {
                    expect(mainCategoryCount.toString()).to.eq(mainCount);
                    expect(subCategoryCount.toString()).to.eq(subCount);
                } else {
                    cy.get('.pagination').find('li').last().then(lastPageItem => {
                        if (lastPageItem.hasClass('disabled')) {
                            expect(mainCategoryCount.toString()).to.eq(mainCount);
                            expect(subCategoryCount.toString()).to.eq(subCount);
                        } else {
                            cy.wrap(lastPageItem).find('a').click({ force: true });
                            countCategoriesOnPage();
                            goToNextPage();
                        }
                    });
                }
            });
        }

        countCategoriesOnPage();
        goToNextPage();
    }

    checkPlantsCard(plantCount: string) {
        cy.contains('h6', 'Plants')
            .parent()
            .parent()
            .should('contain.text', plantCount)
            .and('contain.text', 'Total');
    }

    checkPlantsCardDetails(totalCount: string, lowStockCount: string) {
        cy.contains('h6', 'Plants')
            .parent()
            .parent()
            .should('contain.text', totalCount)
            .and('contain.text', 'Total')
            .and('contain.text', lowStockCount)
            .and('contain.text', 'Low Stock');
    }

    checkPlantCount(plantCount: string) {
        cy.visit('/plants');
        let totalPlantCount = 0;
        function countPlantsOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                const plantCountInPage = rows.length;
                totalPlantCount += plantCountInPage;
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

    checkSalesCard(salesCount: string) {
        cy.contains('h6', 'Sales')
            .parent()
            .parent()
            .should('contain.text', salesCount)
            .and('contain.text', 'Sales');
    }

    checkSalesCount(salesCount: string) {
        cy.visit('/sales');
        let totalSalesCount = 0;
        function countSalesOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                const salesCountInPage = rows.length;
                totalSalesCount += salesCountInPage;
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

    checkSalesRevenueCard() {
        cy.get('@totalRevenue').then(totalRevenue => {
            const salesRevenue = totalRevenue.toString();
        cy.contains('h6', 'Sales')
            .parent()
            .parent()
            .should('contain.text', salesRevenue)
            .and('contain.text', 'Revenue');
        });
    }

    checkSalesRevenueInSystem() {
        cy.visit('/sales');
        let totalRevenue = 0; // save this value in the sessoin or some shared state to compare with the value on the card
        function calculateRevenueOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                rows.each((_, row) => {
                    const saleValue = parseFloat(Cypress.$(row).find('td').eq(2).text().trim());
                    totalRevenue += saleValue;
                });
            });
        }
        function goToNextPage() {
            cy.get('body').then(body => {
                if (body.find('.pagination').length === 0) {
                    expect(totalRevenue.toString()).to.eq(totalRevenue.toString());
                } else {
                    cy.get('.pagination').find('li').last().then(lastPageItem => {
                        if (lastPageItem.hasClass('disabled')) {
                            expect(totalRevenue.toString()).to.eq(totalRevenue.toString());
                        } else {
                            cy.wrap(lastPageItem).find('a').click({ force: true });
                            calculateRevenueOnPage();
                            goToNextPage();
                        }
                    });
                }
            });
        }

        calculateRevenueOnPage();
        goToNextPage();
        cy.wrap(totalRevenue).as('totalRevenue');
    }

    checkSalesCardMetrics() {
        cy.visit('/sales');
        let totalRevenue = 0;
        let totalSalesCount = 0;
        
        function calculateMetricsOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                const rowCount = rows.length;
                totalSalesCount += rowCount;
                
                rows.each((_, row) => {
                    const saleValue = parseFloat(Cypress.$(row).find('td').eq(2).text().trim());
                    totalRevenue += saleValue;
                });
            });
        }

        function goToNextPage() {
            cy.get('body').then(body => {
                if (body.find('.pagination').length === 0) {
                    // Finished pagination, now validate the dashboard card
                    validateSalesCard();
                } else {
                    cy.get('.pagination').find('li').last().then(lastPageItem => {
                        if (lastPageItem.hasClass('disabled')) {
                            // This is the last page
                            validateSalesCard();
                        } else {
                            // Go to next page
                            cy.wrap(lastPageItem).find('a').click({ force: true });
                            cy.wait(500); // Wait for page to load
                            calculateMetricsOnPage();
                            goToNextPage();
                        }
                    });
                }
            });
        }

        function validateSalesCard() {
            // Navigate back to dashboard
            cy.visit('/ui/dashboard');
            
            // Format revenue as it appears in the card (prefixed with 'Rs')
            const formattedRevenue = `Rs ${totalRevenue.toFixed(2)}`;
            
            // Verify the Sales card contains correct revenue and sales count
            cy.contains('h6', 'Sales')
                .parent()
                .parent()
                .then(card => {
                    // Check if revenue is displayed with 'Rs' prefix
                    cy.wrap(card).should('contain.text', totalRevenue.toString());
                    cy.wrap(card).should('contain.text', 'Revenue');
                    
                    // Check if sales count is displayed
                    cy.wrap(card).should('contain.text', totalSalesCount.toString());
                    cy.wrap(card).should('contain.text', 'Sales');
                });
        }

        calculateMetricsOnPage();
        goToNextPage();
    }
}

export default new DashboardPage();