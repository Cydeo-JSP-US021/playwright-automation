import { expect } from "@playwright/test";

export class CommonUI {

    static async login(page) {
        const credentials = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");

        await page.setExtraHTTPHeaders(
            {"Authorization": `Basic ${credentials}`}
        );

        await page.goto(process.env.SEP_QA_URL);
    }

    static async enterPersonalDetails(page, firstName, lastName, email, phoneNumber) {

        const firstNameInput = page.getByRole("textbox", { name: "First Name" });
        const lastNameInput = page.getByRole("textbox", { name: "Last Name" });
        const emailInput = page.getByRole("textbox", { name: "Email Address" });
        const phoneNumberInput = page.getByRole("textbox", { name: "Phone" });

        await expect(firstNameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(phoneNumberInput).toBeVisible();

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await phoneNumberInput.fill(phoneNumber);
    }

    static async completeStartApplicationStep(page, firstName, lastName, email, phoneNumber) {
        const startApplicationStepper = page
            .locator(".step")
            .filter({ hasText: "Start Application" })
            .locator(".step-circle");

        await expect(startApplicationStepper).toHaveCSS("background-color", "rgb(1, 201, 255)");
        await this.enterPersonalDetails(page, firstName, lastName, email, phoneNumber);

        const nextButton = page.getByRole("button", { name: "Next", exact: true });
        await nextButton.click();

        await expect(startApplicationStepper).toHaveCSS("background-color", "rgb(172, 245, 138)");
    }

}