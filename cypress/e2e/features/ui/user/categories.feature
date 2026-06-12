@ui @user @categories
Feature: User - Categories UI

  Background:
    Given User is login as user

  @215526U @CAT_UI_USR_001
  Scenario: Non-Admin User cannot see Add Category button
    When I navigate to the categories page
    Then I should not see the "Add A Category" button in the page header

  @215526U @CAT_UI_USR_002
  Scenario: Non-Admin User cannot access Add Category page
    When I navigate to the categories add page
    Then I should see the access denied page

  @215526U @CAT_UI_USR_003
  Scenario: Non-Admin User cannot see actions on category list page
    When I navigate to the categories page
    Then the category list page should load successfully
    And I should not see edit or delete action buttons on the category list

  @215526U @CAT_UI_USR_004
  Scenario: User accesses category list page
    When I navigate to the categories page
    Then the category list page should load successfully

  @215526U @CAT_UI_USR_005
  Scenario: User accesses category list page when no categories exist
    Given no categories exist in the system
    When I navigate to the categories page
    Then I should see the no categories found message