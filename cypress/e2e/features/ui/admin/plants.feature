@ui @admin @plants
Feature: Admin - Plants UI

  Background:
    Given User is login as admin

  @215512A @PLNT_UI_ADMIN_001
  Scenario: Confirm that the plant name field is required before saving
    When I navigate to the add plant page
    And I select a sub-category from the dropdown
    And I enter "10.00" in the price field
    And I enter "5" in the quantity field
    And I click on the "Save" button on the plant form
    Then I should see the plant name required validation message

  @215512A @PLNT_UI_ADMIN_002
  Scenario: Confirm plant name length is validated between 3 and 25 characters
    When I navigate to the add plant page
    And I enter "ab" in the plant name field
    And I select a sub-category from the dropdown
    And I enter "10.00" in the price field
    And I enter "5" in the quantity field
    And I click on the "Save" button on the plant form
    Then I should see the plant name length validation message

  @215512A @PLNT_UI_ADMIN_003
  Scenario: Confirm that the price field cannot be saved when left empty
    When I navigate to the add plant page
    And I enter "Valid Plant" in the plant name field
    And I select a sub-category from the dropdown
    And I enter "5" in the quantity field
    And I click on the "Save" button on the plant form
    Then I should see the price required validation message

  @215512A @PLNT_UI_ADMIN_004
  Scenario: Confirm that a negative quantity value is rejected
    When I navigate to the add plant page
    And I enter "Valid Plant" in the plant name field
    And I select a sub-category from the dropdown
    And I enter "10.00" in the price field
    And I enter "-5" in the quantity field
    And I click on the "Save" button on the plant form
    Then I should see the negative quantity validation message

  @215512A @PLNT_UI_ADMIN_005
  Scenario: Confirm that only sub-categories are selectable, not main categories
    When I navigate to the add plant page
    Then the category dropdown should not offer main categories

  @215512A @PLNT_UI_ADMIN_006
  Scenario: Confirm admin can modify the details of an existing plant
    When I navigate to the plants page
    And I click the edit icon on the first plant row
    And I update the plant name to "Updated Plant"
    And I click on the "Save" button on the plant form
    Then I should see the plant updated success message

  @215512A @PLNT_UI_ADMIN_007
  Scenario: Confirm admin can remove a plant record from the system
    When I navigate to the plants page
    And I click the delete icon on the first plant row
    And I confirm the plant deletion
    Then I should see the plant deleted success message
