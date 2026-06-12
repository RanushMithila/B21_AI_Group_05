@api @user @categories
Feature: User - Categories API

  Background:
    Given User is authenticated as user

  @API_Dashboard_Read_012
    Scenario: Retrieve category configuration summary as User
      When I send a GET request to retrieve the category summary
      Then the response status should be 200
      And the response body should contain the category summary details