class CategoryPage {
  visit() {
    cy.visit('/categories');
  }

  visitAdd() {
    cy.visit('/categories/add');
  }

  get addButton() {
    return cy.contains('a', /Add A Category/i, { timeout: 10000 });
  }

  get saveButton() {
    return cy.contains('button', 'Save', { timeout: 10000 });
  }

  checkAddButtonVisible() {
    this.addButton.should('be.visible');
  }

  checkAddButtonNotVisible() {
    cy.contains('a', /Add A Category/i).should('not.exist');
  }

  clickAddCategory() {
    this.addButton.click();
  }

  fillCategoryName(name: string) {
    cy.get('input[name="name"]').clear().type(name);
  }

  clearCategoryName() {
    cy.get('input[name="name"]').clear();
  }

  selectParentCategory(parentName: string) {
    if (parentName === 'Main Category') {
      cy.get('select[name="parentId"]').select('');
    } else {
      cy.get('select[name="parentId"]').select(parentName);
    }
  }

  checkCategoryInList(categoryName: string) {
    cy.get('table tbody').contains('tr', categoryName).should('be.visible');
  }

  checkCategoryListPageLoaded() {
    cy.location('pathname').should('eq', '/ui/categories');
    cy.get('table.table').should('be.visible');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  }

  checkNoCategoriesFoundMessage() {
    cy.location('pathname').should('eq', '/ui/categories');
    cy.get('table.table').should('be.visible');
    cy.contains('No category found').should('be.visible');
  }

  checkEditDeleteActionsNotVisible() {
    cy.get('a[title="Edit"]').should('not.exist');
    cy.get('button[title="Delete"]').should('not.exist');
  }

  clickSave() {
    this.saveButton.click({ force: true });
  }

  checkOnAddPage() {
    cy.location('pathname').should('eq', '/ui/categories/add');
  }

  checkAccessDeniedPage() {
    cy.location('pathname').should('eq', '/ui/403');
    cy.contains('403 - Access Denied').should('be.visible');
  }

  checkCategoryNameValidationMessages() {
    cy.contains('Category name must be between 3 and 10 characters').should('be.visible');
    cy.contains('Category name is required').should('be.visible');
  }

  checkValidationMessage(message: string) {
    cy.contains('.invalid-feedback', message).should('be.visible');
  }
}

export default new CategoryPage();
