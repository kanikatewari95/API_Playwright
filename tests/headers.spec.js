const { test, expect, request } = require('@playwright/test')

//different ways to pass headers

let reqContext3;
test.beforeAll("before all tests", async()=>{
    reqContext3 = await request.newContext({
        baseURL:'https://restful-booker.herokuapp.com',
        extraHTTPHeaders:{
            Accept: "application/json"
        }
    })

})

test("define headers in request ", async ({ request }) => {

    const GETresponse = await request.get('https://restful-booker.herokuapp.com/booking',{
        headers:{
            Accept: "application/json",
        }
    })

    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)

})

test("define headers in Manually created context", async () => {

    const reqContext = await request.newContext({
        baseURL:'https://restful-booker.herokuapp.com',
        extraHTTPHeaders:{
            Accept: "application/json"
        }
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