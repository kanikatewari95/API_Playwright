const { test, expect } = require('@playwright/test')


test("Fetch and validate response header",async({request})=>{
    const GETresponse = await request.get('/booking/1')
    const headersValue = GETresponse.headers()
    console.log(headersValue)
    expect(headersValue.server).toEqual("Cowboy")
    expect(headersValue["x-powered-by"]).toEqual("Express")

    console.log("**************")

    //to get headers in array format
    const headersArrayValue = GETresponse.headersArray()
    console.log(headersArrayValue)
    console.log("number of header response : "+ headersArrayValue.length)

    //to fetch the key and value one by one
    headersArrayValue.forEach((header)=>{
        console.log("Keys are: "+ header.name)
        console.log("values are: "+header.value)
    })
   
})


