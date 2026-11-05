
const { test: setup, expect } = require('@playwright/test');
const path = require('path'); //npm i --save-dev @types/node

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {

    // Open the login page
    await page.goto('https://conduit.bondaracademy.com/')

    //login
    await page.getByRole('link', { name: ' Sign in ' }).click()
    //Sign in page


    const email = page.getByPlaceholder('Email')
    await email.fill('pangabros1@gmail.com')
    const password = page.getByPlaceholder('Password')
    await password.fill('pangabros@1234')
    await page.getByRole('button', { name: ' Sign in ' }).click()



    await expect(
        page.getByRole('link', { name: 'New Article' })
    ).toBeVisible();

    // Save authentication state
    await page.context().storageState({ path: authFile });

});
