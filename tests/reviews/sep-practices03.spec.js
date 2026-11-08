import { test, expect } from "@playwright/test";

import { CommonUI } from "./CommonUI";

import { faker } from "@faker-js/faker";

test.describe("Review Step test cases @review-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page, faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.numeric(10));
        await CommonUI.completePaymentPlanStep(page, "upfront");

    });


    test("Test case 1", async ({page}) => {


    });


    test("test case 2", async ({page}) => {


    });


    test("Test case 3", async ({page}) => {


    });


});