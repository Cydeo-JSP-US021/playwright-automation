import { test } from "@playwright/test";

import { CommonUI } from "./CommonUI";

test.describe("Start application test cases @start-app-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        
    });


    test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab", async () => {


    });


    test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async () => {

    });


    test("Verify that personal input fields are enabled and accept user input", async () => {

    });


});