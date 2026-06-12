@api @admin @dashboard @215557N
Feature: Admin - Dashboard API

  Background:
    Given User is authenticated as admin

  @API_Dashboard_Read_009
  Scenario: Retrieve system health status as Admin
    When I send a GET request to retrieve the system health status
    Then the response status should be 200
    And the response body should contain status "UP"