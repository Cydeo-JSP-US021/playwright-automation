import { test, expect, firefox } from '@playwright/test';


test('Context fixture @context', async ({ context }) => {

    let page1 = await context.newPage();
    let page2 = await context.newPage();
    let page3 = await context.newPage();
    let page4 = await context.newPage();

   
    await page1.bringToFront();
    await page1.goto('https://www.facebook.com/');
    await page1.waitForTimeout(3000);


    await page2.bringToFront();
    await page2.goto('https://www.linkedin.com/');
    await page2.waitForTimeout(3000);


    await page3.bringToFront();
    await page3.goto('https://cydeo.com/');
    await page3.waitForTimeout(3000);


    await page4.bringToFront();
    await page4.goto('https://www.youtube.com/');
    await page4.waitForTimeout(3000);



    
});



test('Browser fixture @browser', async ({ browser }) => {

    let context1 = await browser.newContext();
    let context2 = await browser.newContext();


    let page1 = await context1.newPage();
    let page2 = await context1.newPage();

    let page3 = await context2.newPage();
    let page4 = await context2.newPage();
    let page5 = await context2.newPage();


    await page1.bringToFront();
    await page1.goto('https://www.facebook.com/');
    await page1.waitForTimeout(3000);


    await page2.bringToFront();
    await page2.goto('https://www.linkedin.com/');
    await page2.waitForTimeout(3000);


    await page3.bringToFront();
    await page3.goto('https://cydeo.com/');
    await page3.waitForTimeout(3000);


    await page4.bringToFront();
    await page4.goto('https://www.youtube.com/');
    await page4.waitForTimeout(3000);


    await page5.bringToFront();
    await page5.goto('https://www.google.com/');
    await page5.waitForTimeout(3000);



    
});



test('custom context & custom browser @custom', async () => {

    let browser = await firefox.launch();
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto('https://www.facebook.com/');
    await page.waitForTimeout(4000);


});



test('Request fixture', async ({ request }) => {

    const baseURL = 'https://spartan-app-new-nonsecure.onrender.com';
    const endpoint = '/api/v2/spartans/search';

    const response = await request.get(`${baseURL}${endpoint}`);
    

    // verify status code.
    expect(response.status()).toBe(200);

    const headers = response.headers();

    // verify content type is JSON
    expect(headers['content-type']).toContain('application/json');

    const responseBody = await response.json();

    // verify that the message in body is "Successfully queried all the Spartans."
    expect(responseBody.message).toBe('Successfully queried all the Spartans.');

    console.log('Response Body:', responseBody);


});