const { test, expect } = require('@playwright/test')
const staticData = require('../test_data/postData2.json')


test("Pass Req body from JSON for POST call",async({request})=>{
    const POSTresponse = await request.post('/booking',{
        data: staticData.postCallData
    })

    console.log(await POSTresponse.json())
    expect((await POSTresponse.json()).booking).toMatchObject(staticData.postCallData)
    expect((await POSTresponse.json()).booking.additionalneeds).toEqual(staticData.postCallData.additionalneeds)
    
})


