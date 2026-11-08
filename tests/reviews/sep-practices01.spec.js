import { test, expect } from "@playwright/test";

import { CommonUI } from "./CommonUI";

test.describe("Start application test cases @start-app-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);

    });


    test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab", async ({page}) => {

        const popupEvent = page.waitForEvent("popup");

        const termsAndConditionsLink = page.getByRole('link', { name: 'Terms and conditions', exact: true });

        //verify that the link is visible and enabled
        await expect(termsAndConditionsLink).toBeVisible();
        await expect(termsAndConditionsLink).toBeEnabled();

        //click the link and wait for the popup to open
        await termsAndConditionsLink.click();
        const newPage = await popupEvent;

        const termsAndConditionsHeading = newPage.getByRole('heading', { name: 'Terms and Conditions', exact: true });

        // verify visible.
        await expect(termsAndConditionsHeading).toBeVisible();


    });


    test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async ({page}) => {

    });


    test("Verify that personal input fields are enabled and accept user input", async ({page}) => {

    });


});