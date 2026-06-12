/// <reference types="cypress" />
import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor'

When('I send a GET request to view plant with id {string}', function (plantId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants/${plantId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a GET request to search plants by name {string} page {string} size {string}', function (name: string, page: string, size: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants/paged?name=${encodeURIComponent(name)}&page=${page}&size=${size}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a POST request to create plant with plant data and category id {string}', function (categoryId: string, dataTable: DataTable) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			const plantData = dataTable.hashes()[0]
			cy.request({
				method: 'POST',
				url: `${apiUrl}/plants/category/${categoryId}`,
				headers: { Authorization: `Bearer ${token}` },
				body: {
					name: plantData.name,
					price: Number(plantData.price),
					quantity: Number(plantData.quantity)
				},
				failOnStatusCode: false
			}).as('response')
		})
	})
})

Then('the plant list should be empty', () => {
	cy.get('@response').its('body.content').should('be.an', 'array').and('have.length', 0)
})

// === PLNT_API_ADMIN_001, 006, 007 — create with inline params ===

When('I send a POST request to create a plant with name {string} price {string} quantity {string} and category id {string}', function (name: string, price: string, quantity: string, categoryId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/plants/category/${categoryId}`,
				headers: { Authorization: `Bearer ${token}` },
				body: {
					name,
					price: Number(price),
					quantity: Number(quantity)
				},
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === PLNT_API_ADMIN_002 — create with empty body ===

When('I send a POST request to create a plant with an empty body and category id {string}', function (categoryId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/plants/category/${categoryId}`,
				headers: { Authorization: `Bearer ${token}` },
				body: {},
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === PLNT_API_ADMIN_003 — update plant ===

When('I send a PUT request to update plant with id {string} name {string} price {string} quantity {string}', function (plantId: string, name: string, price: string, quantity: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'PUT',
				url: `${apiUrl}/plants/${plantId}`,
				headers: { Authorization: `Bearer ${token}` },
				body: {
					name,
					price: Number(price),
					quantity: Number(quantity)
				},
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === PLNT_API_ADMIN_004 — delete plant ===

When('I send a DELETE request to delete plant with id {string}', function (plantId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'DELETE',
				url: `${apiUrl}/plants/${plantId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === PLNT_API_ADMIN_005 — get all plants ===

When('I send a GET request to retrieve all plants', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === PLNT_API_ADMIN_008 — create without category ===

When('I send a POST request to create a plant without a category', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/plants`,
				headers: { Authorization: `Bearer ${token}` },
				body: { name: 'Test Plant', price: 10.0, quantity: 5 },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// === Assertions ===

Then('the response body should contain the plant name {string}', (expectedName: string) => {
	cy.get('@response').its('body').then((body: any) => {
		expect(body).to.have.property('name')
		expect(body.name).to.eq(expectedName)
	})
})

Then('the response body should contain a list of plants', () => {
	cy.get('@response').its('body').then((body: any) => {
		const list = Array.isArray(body) ? body : body.content
		expect(list).to.be.an('array').and.have.length.greaterThan(0)
	})
})
