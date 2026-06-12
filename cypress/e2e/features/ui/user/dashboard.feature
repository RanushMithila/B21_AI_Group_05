@ui @user @dashboard @215557N
Feature: User - Dashboard UI

  Background:
    Given User is login as user

  @UI_Dashboard_Read_004
  Scenario: Dashboard shows number of "Main" and "Sub" categories (User View)
    When I navigate to the dashboard page
    Then I should see "2" main and "6" sub categories in the dashboard category card

  @UI_Dashboard_Read_005
  Scenario: User view of Plants card metrics display
    When I navigate to the dashboard page
    Then I should see "12" total and "2" low stock plants in the dashboard plants card

  @UI_Dashboard_Read_006
  Scenario: User view of Sales summary card metrics display
    When I navigate to the dashboard page
    Then I should see correct sales revenue and sales count in the dashboard sales card