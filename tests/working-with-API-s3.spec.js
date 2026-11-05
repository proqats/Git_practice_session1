const { test, expect } = require('@playwright/test')
// test.beforeEach(async ({ page }) => {
   
//     await page.goto('https://conduit.bondaracademy.com/')
// })

test('login api testing ', async ({ page, request }) => {

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

    const newarticalrequest = await page.request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
            "article": {
                "title": "test",
                "description": "ddfggg@1234",
                "body": "fgdsgdsg",
                "tagList": []
            }
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    expect(newarticalrequest.status()).toBe(201)

})