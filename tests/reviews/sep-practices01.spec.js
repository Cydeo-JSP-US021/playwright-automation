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

        const startApplicationStepper = page
            .locator(".step")
            .filter({ hasText: "Start Application" })
            .locator(".step-circle");

        const firstNameInput = page.getByRole("textbox", { name: "First Name" });
        const lastNameInput = page.getByRole("textbox", { name: "Last Name" });
        const emailInput = page.getByRole("textbox", { name: "Email Address" });
        const phoneNumberInput = page.getByRole("textbox", { name: "Phone" });
        const referralSourceDropdown = page.getByRole("combobox", { name: "How did you hear about us?" });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(startApplicationStepper).toHaveCSS("background-color", "rgb(1, 201, 255)");
        await expect(firstNameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(phoneNumberInput).toBeVisible();
        await expect(referralSourceDropdown).toBeVisible();

        await firstNameInput.fill("Ada");
        await lastNameInput.fill("Lovelace");
        await emailInput.fill("ada.lovelace@example.com");
        await phoneNumberInput.fill("2025550100");
        await nextButton.click();

        await expect(startApplicationStepper).toHaveCSS("background-color", "rgb(172, 245, 138)");

        await page.waitForTimeout(5000); // Wait for 1 second to ensure the stepper color change is reflected

    });


    test("Verify that personal input fields are enabled and accept user input", async ({page}) => {

    });


});