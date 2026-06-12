@api @admin @sales
Feature: Admin - Sales API

  Background:
    Given User is authenticated as admin

  @215548M @TC_SAL_API_ADM_001
  Scenario: Admin successfully creates a sale with valid data
    When I send a POST request to create sale for plant id "1" with quantity "2"
    Then the response status should be 201
    And the response body should contain sale fields

  @215548M @TC_SAL_API_ADM_002
  Scenario: POST to sales endpoint without a plant id returns 400
    When I send a POST request to create sale without a plant id
    Then the response status should be 400
    And the response body should contain the error message "Plant is required"

  @215548M @TC_SAL_API_ADM_003
  Scenario Outline: POST with invalid quantity returns 400
    When I send a POST request to create sale for plant id "1" with quantity "<quantity>"
    Then the response status should be 400
    And the response body should contain the error message "Quantity must be greater than 0"

    Examples:
      | quantity |
      | 0        |
      | -3       |

  @215548M @TC_SAL_API_ADM_004
  Scenario: User token is rejected when creating a sale
    When I send a POST request using user credentials to create sale for plant id "1" with quantity "1"
    Then the response status should be 403

  @215548M @TC_SAL_API_ADM_005
  Scenario: Admin deletes a sale and it is no longer retrievable
    When I retrieve an existing sale id from the sales list
    And I delete the retrieved sale
    Then the delete response status should indicate success
    And the sale should no longer be retrievable
