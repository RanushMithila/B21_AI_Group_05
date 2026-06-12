@api @admin @plants @215512A
Feature: Admin - Plants API

  Background:
    Given User is authenticated as admin

  @PLNT_API_ADMIN_001
  Scenario: Confirm admin can create a plant via API with a valid request payload
    When I send a POST request to create a plant with name "Orchid" price "25.00" quantity "10" and category id "3"
    Then the response status should be 201
    And the response body should contain the plant name "Orchid"

  @PLNT_API_ADMIN_002
  Scenario: Confirm the API returns an error when all required fields are missing
    When I send a POST request to create a plant with an empty body and category id "3"
    Then the response status should be 400

  @PLNT_API_ADMIN_003
  Scenario: Confirm admin can update an existing plant record via API
    When I send a PUT request to update plant with id "1" name "Updated Cactus" price "15.00" quantity "50"
    Then the response status should be 200
    And the response body should contain the plant name "Updated Cactus"

  @PLNT_API_ADMIN_004
  Scenario: Confirm admin can delete a plant via API
    When I send a DELETE request to delete plant with id "2"
    Then the response status should be 200

  @PLNT_API_ADMIN_005
  Scenario: Confirm GET endpoint returns the full list of plants successfully
    When I send a GET request to retrieve all plants
    Then the response status should be 200
    And the response body should contain a list of plants

  @PLNT_API_ADMIN_006
  Scenario: Confirm API rejects plant name that is shorter than the minimum length
    When I send a POST request to create a plant with name "ab" price "10.00" quantity "5" and category id "3"
    Then the response status should be 400

  @PLNT_API_ADMIN_007
  Scenario: Confirm API rejects a plant submission with a negative quantity value
    When I send a POST request to create a plant with name "Valid Plant" price "10.00" quantity "-10" and category id "3"
    Then the response status should be 400

  @PLNT_API_ADMIN_008
  Scenario: Confirm API returns a validation error when the category field is absent
    When I send a POST request to create a plant without a category
    Then the response status should be 400

@API_Dashboard_Read_007 @215557N
  Scenario: Retrieve plant inventory summary on system dashboard
    When I send a GET request to retrieve the plant inventory summary
    Then the response status should be 200
    And the response body should contain the plant inventory summary details