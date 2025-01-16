const { test, expect } = require('@playwright/test')


test("API PUT request",async({request})=>{
    const PUTresponse = await request.put('/booking/1',{
        headers:{
            Authorization:"Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data:{
            "firstname" : "Kantt",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Lunch"
        }
    })

    console.log(await PUTresponse.json())
    expect(PUTresponse.status()).toBe(200)
    expect(PUTresponse.statusText()).toBe('OK')
    expect(PUTresponse.ok()).toBeTruthy()

    expect(await PUTresponse.json()).toMatchObject({
        "firstname" : "Kantt",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Lunch"
    })

    expect((await PUTresponse.json()).additionalneeds).toEqual("Lunch")

    //GET call to check the updated data
    const GETresponse = await request.get('booking/1')
    console.log(await GETresponse.json())
    expect(await GETresponse.json()).toMatchObject({
        "firstname" : "Kantt",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Lunch"
    })    
})