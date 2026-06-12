@api @user @plants
Feature: User - Plants API 

  Background:
    Given User is authenticated as user

  @215512A @PLNT_API_USR_001
  Scenario: Confirm standard users cannot create a plant via the API
    When I send a POST request to create a plant with name "Orchid" price "25.00" quantity "10" and category id "3"
    Then the response status should be 403

  @215512A @PLNT_API_USR_002
  Scenario: Confirm standard users cannot update a plant record via the API
    When I send a PUT request to update plant with id "1" name "Updated Name" price "15.00" quantity "50"
    Then the response status should be 403
