import { test, expect } from "@playwright/test";

import { CommonUI } from "./CommonUI";

import { faker } from "@faker-js/faker";

test.describe("Payment Plan test cases @payment-plan-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page, faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.numeric(10));

    });


    test("Test case 1", async ({page}) => {


    });


    test("test case 2", async ({page}) => {


    });


    test("Test case 3", async ({page}) => {


    });

    test("Test case 4", async ({page}) => {


    });


});