const { test, expect } = require('@playwright/test')


test("API GET request",async({request})=>{
    const GETresponse = await request.get('/booking')
    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)
})

test("API GET request2",async({request})=>{
    const GETresponse = await request.get('/booking/241')
    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)
    expect(await GETresponse.json()).toMatchObject({
        firstname: 'John',
        lastname: 'Smith',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    })
    //expect((await GETresponse.json()).firstname).toEqual('John')
})

test("API GET request3",async({request})=>{
    const GETresponse = await request.get('/booking?firstname:John&lastname:Smith')
    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)
})

//pass query parameters as params
test("API GET request4",async({request})=>{
    const GETresponse = await request.get('/booking',{
        params:{
            firstname: 'John',
            lastname: 'Smith'
        }
    })
    console.log(await GETresponse.json())
    expect(GETresponse.status()).toBe(200)
    expect(GETresponse.ok()).toBeTruthy()
})

test("API with UI verification",async({request,page})=>{
    const resp2 = await request.get('https://api.demoblaze.com/entries')
    const jsonResp2 = await resp2.json()
   // console.log(jsonResp2)
    console.log(jsonResp2.Items[0].title)

    await page.goto("https://demoblaze.com/")
    await expect(page.getByRole('link', {name: 'Samsung galaxy s6'})).toHaveText(jsonResp2.Items[0].title)
})

