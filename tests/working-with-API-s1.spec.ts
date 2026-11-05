import {test, expect} from '@playwright/test'
import tags from '../test-data/tags.json'//Json file
//Mocking data
test.beforeEach(async ({page})=>{
    //2nd way of mock of data with waild card

    await page.route('*/**/api/tags', async route=>{
        await route.fulfill({
            json:tags
        })

    }) 

    await page.goto('https://conduit.bondaracademy.com/')
})

test('has title',async ({page}) =>{

    await expect(page.locator('.navbar-brand')).toContainText('conduit')//Assortions must need otherwise test will fails due to timeout, here if we don't have assertion the route action show failed
    await expect(page.locator('.sidebar .tag-pill')).toContainText(["Automation", "Playwright"])

})
