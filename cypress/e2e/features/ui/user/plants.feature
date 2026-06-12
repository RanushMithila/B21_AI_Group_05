@ui @user @plants @215512A
Feature: User - Plants UI

  Background:
    Given User is login as user

  @PLNT_UI_USR_001
  Scenario: Confirm that the Add Plant button is hidden from regular users
    When I navigate to the plants page
    Then the Add Plant button should not be visible

  @PLNT_UI_USR_002
  Scenario: Confirm that the Edit icon is not displayed to regular users on plant records
    When I navigate to the plants page
    Then the edit icon should not be visible on any plant row

  @PLNT_UI_USR_003
  Scenario: Confirm that the Delete icon is not visible to regular users on plant records
    When I navigate to the plants page
    Then the delete icon should not be visible on any plant row
