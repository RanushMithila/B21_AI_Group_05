import { After, Before } from "@badeball/cypress-cucumber-preprocessor";
import * as allure from "allure-cypress";

const VALID_TAGS = [
  "api",
  "ui",
  "admin",
  "user",
  "categories",
  "sales",
  "plants",
  "dashboard",
  "215548M",
  "215512A"
];

Before((scenario) => {
  scenario.pickle.tags.forEach((tag) => {
    const tagName = tag.name.replace("@", "");
    if (VALID_TAGS.includes(tagName)) {
      allure.label("tag", tagName);
    }
  });
});

// Re-seed the database after any scenario that deliberately clears sales,
// so subsequent tests in the same spec run with a full dataset.
After({ tags: "@TC_SAL_UI_USR_004 or @TC_SAL_API_USR_005" }, () => {
  cy.seedDatabase();
});

import { After, Before } from "@badeball/cypress-cucumber-preprocessor";
import * as allure from "allure-cypress";

const VALID_TAGS = [
  "api",
  "ui",
  "admin",
  "user",
  "categories",
  "sales",
  "plants",
  "dashboard",
  "215548M",
  "215512A",
  "215557N"
];

Before((scenario) => {
  scenario.pickle.tags.forEach((tag) => {
    const tagName = tag.name.replace("@", "");
    if (VALID_TAGS.includes(tagName)) {
      allure.label("tag", tagName);
    }
  });
});

// Re-seed the database after any scenario that deliberately clears sales,
// so subsequent tests in the same spec run with a full dataset.
After({ tags: "@TC_SAL_UI_USR_004 or @TC_SAL_API_USR_005" }, () => {
  cy.seedDatabase();
});
