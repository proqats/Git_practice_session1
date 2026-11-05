//here, we are replacing the first artical header(title) and description
const { test, expect } = require('@playwright/test')
//You are fetching the actual API response, modifying only the first article's title and description, and sending the modified response back to the application.
test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()//Fetch the all articals
        const responseJSON = await response.json()//Fetch all articals in json formate.
        responseJSON.articles[0].title = 'This is mock title for the article'
        responseJSON.articles[0].description = 'This is the mock description of the article'
        await route.fulfill({
            json: responseJSON
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})
test('assertions on test scripts', async ({ page }) => {
    await expect(page.locator('.preview-link h1').first()).toContainText('This is mock title for the article')
    await expect(page.locator('.preview-link p').first()).toContainText('This is the mock description of the article')
})

