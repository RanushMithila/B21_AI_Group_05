@api @admin @215557N
Feature: Admin - API Security

  @215557N @API_Dashboard_Read_010
  Scenario: Access secured dashboard summary without auth token
    When I send a GET request to the plant summary endpoint without authentication
    Then the response status should be 401
    And the response body should contain the error message "Unauthorized - Use Basic Auth or JWT"