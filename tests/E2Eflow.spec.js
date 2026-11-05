const { test, expect } = require('@playwright/test')
const tags = require('../test-data/tags.json')

test('e2e testing', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/')


})

//Mocking
test('Mock testing', async ({ page }) => {
    //Mock the Data
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            json: tags
        })

    })
    await page.goto('https://conduit.bondaracademy.com/')
    //Sign in page


})

// here we are doing replacement
test('replace article using mock testing', async ({ page }) => {
    await page.route('*/**/api/articles', async route => {
        const response = await route.fetch()
        const JsonResponse = await response.json()
        JsonResponse.articles[0].title = 'means Playwright Email textbox kosam wait chestundi, kani page lo Email field ledu.',
            JsonResponse.articles[0].description = 'Since your project uses Playwright + JavaScript (CommonJS), you can import a JSON file using require().'
        await route.fulfill({
            json: JsonResponse
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
    //Sign in page


})

//create article
test('Create Article', async ({ page, request }) => {
    const loginRequest = await page.request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data:
        {
            user:
            {
                email: "pangabros1@gmail.com",
                password: "pangabros@1234"
            }
        }
    })
    await expect(loginRequest.status()).toBe(200)
    const Jsonrequest = await loginRequest.json()
    const Token = await Jsonrequest.user.token
    console.log(Token)

    const newArticleCretion = await page.request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data:
        {
            "article":
            {
                "title": "tesdvsasf",
                "description": "vsdvs",
                "body": "svass",
                "tagList": []
            }
        },

        headers: {
            'Authorization': `Token ${Token}`
        }
    })
})