const { test, expect } = require('@playwright/test')


test("API POST request",async({request})=>{
    const POSTresponse = await request.post('/booking',{
        data:{
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    })

    console.log(await POSTresponse.json())
    expect(POSTresponse.status()).toBe(200)
    expect(POSTresponse.statusText()).toBe('OK')
    expect(POSTresponse.ok()).toBeTruthy()

    //to assert the object
    expect((await POSTresponse.json()).booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    })

    //to assert an item within the object
    expect((await POSTresponse.json()).booking.additionalneeds).toEqual("Breakfast")
    
})


