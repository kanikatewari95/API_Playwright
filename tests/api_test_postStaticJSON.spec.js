const { test, expect } = require('@playwright/test')
const staticBody = require('../test_data/postReqBody.json')

//create a static json file and use it in this test as POST data

test("API POST request", async ({ request }) => {

    const POSTresponse = await request.post('https://reqres.in/api/users', {

        data: staticBody

    })

    //validate status code
    expect(POSTresponse.ok()).toBeTruthy()
    expect(POSTresponse.status()).toBe(201)

    const text = await POSTresponse.text()
    expect(text).toContain('Kanika')

    console.log(await POSTresponse.json())

})

