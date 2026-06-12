@ui @admin @categories
Feature: Admin - Categories UI

  Background:
    Given User is login as admin

  @215526U @CAT_UI_ADM_001
  Scenario: Admin can see Add category button
    When I navigate to the categories page
    Then I should see the "Add A Category" button in the page header

  @215526U @CAT_UI_ADM_002
  Scenario: Admin opens Add Category page
    When I navigate to the categories page
    And I click on the "Add A Category" button
    Then I should stay on the categories add page

  @215526U @CAT_UI_ADM_003
  Scenario: Admin creates category with valid name
    Given a main category named "Flowers" exists
    When I navigate to the categories page
    And I click on the "Add A Category" button
    And I enter "Orchid" in the category name field
    And I select "Flowers" as the parent category
    And I click on the "Save" button on the category form
    Then I should see "Orchid" in the category list

  @215526U @CAT_UI_ADM_004
  Scenario: Admin creates category with empty name
    When I navigate to the categories add page
    And I leave the category name field empty
    And I click on the "Save" button on the category form
    Then I should see the validation message "Category name is required"
    And I should stay on the categories add page

  @215526U @CAT_UI_ADM_005
  Scenario: Admin creates category with invalid name
    When I navigate to the categories add page
    And I enter "Ro" in the category name field
    And I click on the "Save" button on the category form
    Then I should see the validation message "Category name must be between 3 and 10 characters"
    And I should stay on the categories add page
    When I enter "VeryLongName123" in the category name field
    And I click on the "Save" button on the category form
    Then I should see the validation message "Category name must be between 3 and 10 characters"
    And I should stay on the categories add page
