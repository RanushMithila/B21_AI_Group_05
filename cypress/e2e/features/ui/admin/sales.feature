@ui @admin @sales
Feature: Admin - Sales UI

  Background:
    Given User is login as admin

  @215548M @TC_SAL_UI_ADM_001
  Scenario: Sales page displays correct heading and table columns for Admin
    When I navigate to the sales page
    Then the page heading should read "Sales"
    And the sales table columns should include "Plant", "Quantity", "Total Price", "Sold At" and "Actions"
    And the "Sell Plant" button should be visible on the page

  @215548M @TC_SAL_UI_ADM_002
  Scenario: Plant dropdown shows only plants with available stock
    When I navigate to the sales page
    And I click the "Sell Plant" button
    Then only plants with available stock should appear in the plant dropdown
    And plants with zero stock should not appear in the dropdown

  @215548M @TC_SAL_UI_ADM_003
  Scenario: Validation error appears when Sell Plant form is submitted without selecting a plant
    When I navigate to the sales page
    And I click the "Sell Plant" button
    And I enter "1" in the quantity field on the sell form
    And I click the Sell button without selecting a plant
    Then I should see the validation message "Plant is required"

  @215548M @TC_SAL_UI_ADM_004
  Scenario: Sale is recorded and plant stock decreases after a successful sale
    Given I note the current stock of plant with id "1"
    When I navigate to the sales page
    And I click the "Sell Plant" button
    And I select plant with id "1" from the plant dropdown
    And I enter "2" in the quantity field on the sell form
    And I click the Sell button
    Then I should be on the Sales List page
    And the sales list should contain a record for "Golden Barrel Cactus"
    And the stock of plant with id "1" should be reduced by 2

  @215548M @TC_SAL_UI_ADM_005
  Scenario: Clicking Cancel on the Sell Plant form returns to Sales List without creating a sale
    When I navigate to the sales page
    And I note the current number of records in the sales list
    And I click the "Sell Plant" button
    And I select plant with id "1" from the plant dropdown
    And I enter "2" in the quantity field on the sell form
    And I click the Cancel button on the sell plant form
    Then I should be on the Sales List page
    And the sales list record count should be unchanged
