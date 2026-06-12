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
