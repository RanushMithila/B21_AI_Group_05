@api @user @categories
Feature: User - Categories API

  Background:
    Given User is authenticated as user

  @215526U @CAT_API_USR_001
  Scenario: User creates category without valid token
    When I send a POST request to create category with body without authentication
    """
    {"name":"Sunflower","parent":null}
    """
    Then the response status should be 401
    And the response body should contain the error message "Unauthorized - Use Basic Auth or JWT"

  @215526U @CAT_API_USR_002
  Scenario: User fetches category details by valid category ID
    Given User is authenticated as admin
    When I send a GET request to view category with id "1"
    Then the response status should be 200
    And the response body should contain the category id 1

  @215526U @CAT_API_USR_003
  Scenario: User fetches category details with sub-categories
    Given User is authenticated as admin
    When I send a GET request to view category with id "2"
    Then the response status should be 200
    And the response body should contain a non-empty subCategories array

  @215526U @CAT_API_USR_004
  Scenario: User fetches category details using invalid ID
    Given User is authenticated as admin
    When I send a GET request to view category with id "100"
    Then the response status should be 400
    And the response body should contain the error message "Invalid category ID"

  @215526U @CAT_API_USR_005
  Scenario: User fetches category details without valid token
    When I send a GET request to view category with id "1" without authentication
    Then the response status should be 401
    And the response body should contain the error message "Unauthorized - Use Basic Auth or JWT"
