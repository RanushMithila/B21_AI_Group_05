@api @admin @categories
Feature: Admin - Categories API

  Background:
    Given User is authenticated as admin

  @API_Dashboard_Read_008 @215557N
  Scenario: Retrieve category configuration summary
    When I send a GET request to retrieve the category summary
    Then the response status should be 200
    And the response body should contain the category summary details