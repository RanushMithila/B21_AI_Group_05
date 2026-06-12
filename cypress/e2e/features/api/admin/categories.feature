@api @admin @categories
Feature: Admin - Categories API

  Background:
    Given User is authenticated as admin

  @215526U @CAT_API_ADM_001
  Scenario: Admin creates Category with valid name
    When I send a POST request to create category with body
    """
    {"name":"Anthurium","parent":null}
    """
    Then the response status should be 201
    And the response body should contain the created category name "Anthurium"

  @215526U @CAT_API_ADM_002
  Scenario: Admin creates category with empty name
    When I send a POST request to create category with body
    """
    {"name":"","parent":null}
    """
    Then the response status should be 400
    And the response body should contain the error message "Category name is mandatory"

  @215526U @CAT_API_ADM_003
  Scenario: Admin creates category with invalid name
    When I send a POST request to create category with body
    """
    {"name":"VeryLongName123","parent":null}
    """
    Then the response status should be 400
    And the response body should contain the error message "Category name must be between 3 and 10 characters"

  @215526U @CAT_API_ADM_004
  Scenario: Admin creates duplicate sub-category name
    When I send a POST request to create category with body
    """
    {"name":"Lily","parent":{"id":1}}
    """
    And I send a POST request to create category with body
    """
    {"name":"Lily","parent":{"id":1}}
    """
    Then the response status should be 400
    And the response body should contain the error message "Sub-category 'Lily' already exists under this parent"

  @215526U @CAT_API_ADM_005
  Scenario: Non-Admin User creates category with valid details
    Given User is authenticated as user
    When I send a POST request to create category with body
    """
    {"name":"Tulip","parent":null}
    """
    Then the response status should be 403
    And the response body should contain the error message "Forbidden"
