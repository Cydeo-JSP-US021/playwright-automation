import { test, expect } from '@playwright/test';


test('Context fixture', async ({ context }) => {

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



    
})
