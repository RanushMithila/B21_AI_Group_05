/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// ─── Shared helpers ───────────────────────────────────────────────────────────

function adminRequest(method: string, path: string, options: Partial<Cypress.RequestOptions> = {}) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method,
				url: `${apiUrl}${path}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false,
				...options,
			}).as('response')
		})
	})
}

// ─── Existing steps (kept for compatibility) ──────────────────────────────────

When('I send a GET request to search sales page {string} size {string} sort by {string}', function (page: string, size: string, sortKey: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales/page?page=${page}&size=${size}&sort=${sortKey}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a POST request to create sale for plant id {string} with quantity {string}', function (plantId: string, quantity: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/sales/plant/${plantId}?quantity=${quantity}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// ─── TC_SAL_API_ADM_001: response body contains sale fields ───────────────────

Then('the response body should contain sale fields', () => {
	cy.get('@response').its('body').then((body) => {
		const sale = Array.isArray(body) ? body[0] : body
		expect(sale).to.have.any.keys('quantity', 'totalPrice', 'soldAt', 'id')
	})
})

// ─── TC_SAL_API_ADM_002: POST without plant id ────────────────────────────────

When('I send a POST request to create sale without a plant id', function () {
	adminRequest('POST', '/sales/plant/')
})

// ─── TC_SAL_API_ADM_004: POST using user credentials ─────────────────────────

When('I send a POST request using user credentials to create sale for plant id {string} with quantity {string}', function (plantId: string, quantity: string) {
	cy.loginAsUser()
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/sales/plant/${plantId}?quantity=${quantity}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// ─── TC_SAL_API_ADM_005: delete and verify gone ───────────────────────────────

When('I retrieve an existing sale id from the sales list', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales/page?page=0&size=1`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).then((res) => {
				const body = res.body
				const firstSale = Array.isArray(body) ? body[0] : body.content?.[0]
				cy.wrap(firstSale.id).as('saleId')
			})
		})
	})
})

When('I delete the retrieved sale', function () {
	cy.get('@saleId').then((saleId) => {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				cy.request({
					method: 'DELETE',
					url: `${apiUrl}/sales/${saleId}`,
					headers: { Authorization: `Bearer ${token}` },
					failOnStatusCode: false
				}).as('response')
			})
		})
	})
})

Then('the delete response status should indicate success', () => {
	cy.get('@response').its('status').then((status) => {
		expect([200, 204]).to.include(status)
	})
})

Then('the sale should no longer be retrievable', function () {
	cy.get('@saleId').then((saleId) => {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				cy.request({
					method: 'GET',
					url: `${apiUrl}/sales/${saleId}`,
					headers: { Authorization: `Bearer ${token}` },
					failOnStatusCode: false
				}).its('status').should('eq', 404)
			})
		})
	})
})

// ─── TC_SAL_API_USR_001: get all sales ────────────────────────────────────────

When('I send a GET request to retrieve all sales', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

Then('the response body should contain a list of sales with required fields', () => {
	cy.get('@response').its('body').then((body) => {
		const sales: any[] = Array.isArray(body) ? body : body.content || []
		expect(sales.length).to.be.greaterThan(0)
		const first = sales[0]
		expect(first).to.have.any.keys('quantity', 'totalPrice', 'soldAt', 'plant', 'plantName', 'plantId')
	})
})

// ─── TC_SAL_API_USR_002–004: sorted requests ─────────────────────────────────
// The app's /api/sales endpoint ignores sort params; sorting is only supported
// on /api/sales/page using Spring Pageable format: sort=field,direction

const SORT_FIELD_MAP: Record<string, string> = {
	plantName: 'plant.name',
	quantity: 'quantity',
	totalPrice: 'totalPrice',
}

When('I send a GET request to retrieve sales sorted by {string} order {string}', function (sortField: string, order: string) {
	const springField = SORT_FIELD_MAP[sortField] ?? sortField
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales/page?page=0&size=100&sort=${springField},${order}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

Then('the sales in the response should be sorted by plant name ascending', () => {
	cy.get('@response').its('body').then((body) => {
		const sales: any[] = Array.isArray(body) ? body : body.content || []
		if (sales.length > 1) {
			for (let i = 0; i < sales.length - 1; i++) {
				const a = (sales[i].plantName ?? sales[i].plant?.name ?? '').toLowerCase()
				const b = (sales[i + 1].plantName ?? sales[i + 1].plant?.name ?? '').toLowerCase()
				expect(a <= b).to.be.true
			}
		}
	})
})

Then('the sales in the response should be sorted by quantity ascending', () => {
	cy.get('@response').its('body').then((body) => {
		const sales: any[] = Array.isArray(body) ? body : body.content || []
		if (sales.length > 1) {
			for (let i = 0; i < sales.length - 1; i++) {
				expect(sales[i].quantity).to.be.lte(sales[i + 1].quantity)
			}
		}
	})
})

Then('the sales in the response should be sorted by total price descending', () => {
	cy.get('@response').its('body').then((body) => {
		const sales: any[] = Array.isArray(body) ? body : body.content || []
		if (sales.length > 1) {
			for (let i = 0; i < sales.length - 1; i++) {
				const a = sales[i].totalPrice ?? sales[i].total_price ?? 0
				const b = sales[i + 1].totalPrice ?? sales[i + 1].total_price ?? 0
				expect(a).to.be.gte(b)
			}
		}
	})
})

// ─── TC_SAL_API_USR_005: empty state ─────────────────────────────────────────

Given('there are no sales records in the database', () => {
	cy.task('queryDb', 'DELETE FROM sales')
})

Then('the response body should be an empty sales list', () => {
	cy.get('@response').its('body').then((body) => {
		const sales: any[] = Array.isArray(body) ? body : body.content || []
		expect(sales.length).to.eq(0)
	})
})

When('I send a GET request to retrieve paged sales transactions with page {string} and size {string}', function (page: string, size: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales/page?page=${page}&size=${size}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

Then('the response body should contain a paginated JSON object of sales', () => {
	cy.get('@response').its('body').then((body: any) => {
		expect(body).to.have.property('content')
		expect(body).to.have.property('pageable')
		expect(body.content).to.be.an('array')
	})
})