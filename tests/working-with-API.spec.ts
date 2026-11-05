import { test, expect } from '@playwright/test';
//API Mocking (Network Interception) in Playwright
test.beforeEach('has title', async ({ page }) => {

  await page.route('https://conduit-api.bondaracademy.com/api/tags', async route=>{
    const tags= {
      "tags":[
        "Automation",
        "Playwright"
      ]
    }
    await route.fulfill({ //route.fulfill() sends your custom response back to the application.
      json:tags
    })
  })
  await page.goto('https://conduit.bondaracademy.com/');
})
test('get started link', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText(/conduit/);

  await expect(page.locator('.sidebar .tag-pill')).toContainText(["Automation","Playwright"])           
  // Expect a title "to contain" a substring.

});

/*test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/
