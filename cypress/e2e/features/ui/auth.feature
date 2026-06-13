@ui @auth @215557N
Feature: UI - Authentication

  @215557N @UI_Auth_Read_001
  Scenario: Verify login page layout and inputs
    When I open the browser and navigate to the login page
    Then I should see the logo image with alt attribute "QA Training App Logo"
    And I should see the "Username" and "Password" input fields with their placeholders
    And I should see the submit button with the text "Login"

  @215557N @UI_Auth_Create_001
  Scenario: Login validation check (empty username)
    When I open the browser and navigate to the login page
    And I leave the "Username" field empty
    And I enter "admin123" in the "Password" field
    And I click the "Login" button
    Then the "username" field should have the "is-invalid" class
    And the validation message "Username is required" should appear

  @215557N @UI_Auth_Create_002
  Scenario: User login with valid credentials
    When I open the browser and navigate to the login page
    And I enter "testuser" in the "Username" field
    And I enter "test123" in the "Password" field
    And I click the "Login" button
    Then I should be redirected to the system dashboard

  @215557N @UI_Auth_Create_003
  Scenario: Login failure with incorrect credentials
    When I open the browser and navigate to the login page
    And I enter "testuser" in the "Username" field
    And I enter "invalidpass" in the "Password" field
    And I click the "Login" button
    Then I should see an error alert with the message "Invalid username or password"