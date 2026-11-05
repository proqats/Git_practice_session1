const { test, expect, request } = require('@playwright/test')

test('GET response 1st way', async ({ request }) => {
    const response1 = await request.get('https://restful-booker.herokuapp.com/booking',{
        headers:{
            Accept:'application/json'
        }
    })
    await expect(response1.status()).toBe(200)
    const responseJson = await response1.json()
    console.log(responseJson)

})

//newContext way 2
test('GET response 2nd way', async () => {
    //'https://restful-booker.herokuapp.com/booking
    const requestContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
        headers:{
            Accept: 'application/json'
        }

    })
    const response2=await requestContext.get('/booking')
    await expect(response2.status()).toBe(200)
    const responseJson = await response2.json()
    console.log(responseJson)

})
// we can keep the bases url in .config and 
test.only('Get response of any perticular ID', async({request})=>{
    const response=await request.get('https://restful-booker.herokuapp.com/booking/100')
    await expect(response.status()).toBe(200)
    const reponseJson=await response.json()
    console.log(reponseJson)
})