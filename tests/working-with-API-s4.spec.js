const {test, expect}=require ('@playwright/test')

test('create artical', async ({page, request})=>{
    await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByText(' Sign in ').click()
    // await page.getByPlaceholder('Email').fill('pangabros1@gmail.com')
    // await page.getByPlaceholder('Password').fill('pangabros@1234')
    // await page.getByRole('button', { name: ' Sign in ' }).click()
    //Hybrid Testing (UI + API Automation) using Playwright.*****************************************

    await page.getByText(' New Article ').click()
    await page.getByPlaceholder('Article Title').fill('test test test')
    await page.getByPlaceholder("What's this article about?").fill('fergerge')
    await page.getByPlaceholder('Write your article (in markdown)').fill('gjgjgjgnvhguturdjfn dmof')
    await page.getByPlaceholder('Enter tags').fill('test')
    await page.getByRole('button', {name:' Publish Article '}).click()

    //Once we create the article by that we get the slug of the article and we can use that slug to verify the article is created or not
    const articleResponse=await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseJson=await articleResponse.json()
    const articleSlugID=articleResponseJson.article.slug
    

    await expect(page.locator('.article-page h1')).toContainText('test test test')// Before run this remove the article from the home page

    //Home page
    await page.getByRole('link',{name: 'Home'}).click()
    await expect(page.locator('.article-preview h1').first()).toContainText('test test test')

     const loginrequest = await page.request.post('https://conduit-api.bondaracademy.com/api/users/login', {//https://conduit-api.bondaracademy.com/api/users
        data: {
            "user": {
                "email": "pangabros1@gmail.com",
                "password": "pangabros@1234",
                
            }
        }
    })
    expect(loginrequest.status()).toBe(200)
    const loginrequestjson = await loginrequest.json()
    const token = loginrequestjson.user.token
    console.log(token)

    //Delete the article using API
    const deletearticlerequest=await page.request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlugID}`,{
        headers:{
            'Authorization': `Token ${token}`
        }
    })
    expect(deletearticlerequest.status()).toBe(204)

})
