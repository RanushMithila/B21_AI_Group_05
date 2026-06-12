@ui @admin @dashboard @215557N
Feature: UI - Admin Dashboard

  Background:
    Given User is login as admin

  @UI_Dashboard_Read_001
  Scenario: Admin dashboard layout verification
    When I navigate to the dashboard page
    Then I should see the sidebar with links "Dashboard", "Categories", "Plants", "Sales", and "Logout"
    And I should see the header text "QA Training Application"
    And I should see the metric cards "Categories", "Plants", "Sales", and "Inventory"

  @UI_Dashboard_Read_002
  Scenario: Categories card details and routing
    When I navigate to the dashboard page
    Then I should see the "Categories" card with "Main" and "Sub" count labels
    When I click on the Manage Categories button
    Then I should be navigated to the categories page

  @UI_Dashboard_Read_003
  Scenario: Plants card details and routing
    When I navigate to the dashboard page
    Then I should see the "Plants" card with "Total" and "Low Stock" count labels
    When I click on the "Manage Plants" button on the dashboard
    Then I should be navigated to the plants page