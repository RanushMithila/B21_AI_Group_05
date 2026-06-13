@api @admin @auth @215557N
Feature: Admin - Auth API

  @215557N @API_Auth_Create_004
  Scenario: Admin login with valid credentials
    When I send a POST request to login as admin with username "admin" and password "admin123"
    Then the response status should be 200
    And the response body should contain a valid JWT token

  @215557N @API_Auth_Create_005
  Scenario: Admin login with invalid password
    When I send a POST request to login as admin with username "admin" and password "wrongpassword"
    Then the response status should be 401
    And the response body should contain the error message "Unauthorized - Use Basic Auth or JWT"

  @215557N @API_Auth_Create_006
  Scenario: User login with valid credentials
    When I send a POST request to login with username "testuser" and password "test123"
    Then the response status should be 200
    And the response body should contain a valid JWT token