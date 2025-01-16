const { test, expect, request } = require('@playwright/test')

//different ways to pass base url

let reqContext3;
test.beforeAll("befpore all tests", async()=>{
    reqContext3 = await request.newContext({
        baseURL:'https://restful-booker.herokuapp.com'
    })

})

test("API GET request from request fixture ", async ({ request }) => {

    const GETresponse = await request.get('https://restful-booker.herokuapp.com/booking')

    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)

})

test("API GET request using Manually creating context", async () => {

    const reqContext = await request.newContext({
        baseURL:'https://restful-booker.herokuapp.com'
    })

    const GETresponse = await reqContext.get('/booking')

    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)

})

test("API GET request using globally created context", async () => {

    const GETresponse = await reqContext3.get('/booking')

    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)

})

test("API GET request using baseURL defined in config file",async({request})=>{
    const GETresponse = await request.get('/booking')
    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)
})

