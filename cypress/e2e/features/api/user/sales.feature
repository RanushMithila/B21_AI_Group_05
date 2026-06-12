@api @user @sales
Feature: User - Sales API

  Background:
    Given User is authenticated as user

  @215548M @TC_SAL_API_USR_001
  Scenario: User retrieves the full sales list successfully
    When I send a GET request to retrieve all sales
    Then the response status should be 200
    And the response body should contain a list of sales with required fields

  @215548M @TC_SAL_API_USR_002
  Scenario: User retrieves sales sorted by plant name ascending
    When I send a GET request to retrieve sales sorted by "plantName" order "asc"
    Then the response status should be 200
    And the sales in the response should be sorted by plant name ascending

  @215548M @TC_SAL_API_USR_003
  Scenario: User retrieves sales sorted by quantity ascending
    When I send a GET request to retrieve sales sorted by "quantity" order "asc"
    Then the response status should be 200
    And the sales in the response should be sorted by quantity ascending

  @215548M @TC_SAL_API_USR_004
  Scenario: User retrieves sales sorted by total price descending
    When I send a GET request to retrieve sales sorted by "totalPrice" order "desc"
    Then the response status should be 200
    And the sales in the response should be sorted by total price descending

  @215548M @TC_SAL_API_USR_005
  Scenario: GET sales returns 200 with empty list when no sales exist
    Given there are no sales records in the database
    When I send a GET request to retrieve all sales
    Then the response status should be 200
    And the response body should be an empty sales list

  @API_Dashboard_Read_013
  Scenario: Retrieve paged sales transactions as User for dashboard feed
    When I send a GET request to retrieve paged sales transactions with page "0" and size "5"
    Then the response status should be 200
    And the response body should contain a paginated JSON object of saless