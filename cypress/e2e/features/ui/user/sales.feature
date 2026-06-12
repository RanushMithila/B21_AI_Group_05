@ui @user @sales
Feature: User - Sales UI

  Background:
    Given User is login as user

  @215548M @TC_SAL_UI_USR_001
  Scenario: Sales List page displays records in paginated format for User
    When I navigate to the sales page
    Then the sales records should be displayed in a table
    And only a limited number of records should be shown per page
    And pagination controls should be visible on the page

  @215548M @TC_SAL_UI_USR_002
  Scenario: Sales List is sorted by Sold At date in descending order on first load
    When I navigate to the sales page
    Then the sales list should be sorted by Sold At in descending order by default

  @215548M @TC_SAL_UI_USR_003
  Scenario: Sales List can be sorted by clicking the Plant column header
    When I navigate to the sales page
    And I click the "Plant" column header on the sales table
    Then the sales list should be sorted by plant name in ascending order
    When I click the "Plant" column header on the sales table
    Then the sales list should be sorted by plant name in descending order

  @215548M @TC_SAL_UI_USR_004
  Scenario: No sales found message is shown when the Sales List is empty
    Given there are no sales records in the system
    When I navigate to the sales page
    Then the message "No sales found" should be displayed
    And no sale rows should be visible in the table

  @215548M @TC_SAL_UI_USR_005
  Scenario: Next and Previous pagination buttons navigate between pages
    When I navigate to the sales page
    And I note the sales records shown on the first page
    And I click the Next page button
    Then different sales records should be shown
    When I click the Previous page button
    Then the original first page sales records should be shown again
