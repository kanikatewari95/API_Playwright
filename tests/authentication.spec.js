const { test, expect } = require('@playwright/test')

let tokenValue;
test.beforeAll("get token using basic authentication",async({request})=>{

    const token = await request.post("https://restful-booker.herokuapp.com/auth",{
        data:{
            "username":"admin",
            "password":"password123"
        }
    })

    
    tokenValue = (await token.json()).token
    console.log("Authentication token is : " + tokenValue)
    
})

test("basic auth for PUT call",async({request})=>{

    const PUTresponse = await request.put("https://restful-booker.herokuapp.com/booking/1",{
        headers:{
            Cookie: "token="+ tokenValue
        },
        data:{
            "firstname" : "Charles",
            "lastname" : "Day",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Lunch"
        }
    })

    expect(PUTresponse.status()).toBe(200)

})