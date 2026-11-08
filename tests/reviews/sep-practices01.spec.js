import { test } from "@playwright/test";

test.describe("Start application test cases @start-app-step", () => {

    test.beforeEach(async ({ page }) => {

        const credentials = Buffer.from("automation-user:123abc").toString("base64");

        await page.setExtraHTTPHeaders(
            {"Authorization": `Basic ${credentials}`}
        );

        await page.goto("https://qa.sep.tdtm.cydeo.com/taws");

        await page.waitForTimeout(2000);

        
    });


    test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab", async () => {


    });


    test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async () => {

    });


    test("Verify that personal input fields are enabled and accept user input", async () => {

    });


});