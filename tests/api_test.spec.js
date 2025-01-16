const { test, expect } = require('@playwright/test')

test("API GET request", async ({ request }) => {

    const GETresponse = await request.get('https://reqres.in/api/users?page=2')

    expect(GETresponse.status()).toBe(200)
    expect(GETresponse.ok()).toBeTruthy()

    const text = await GETresponse.text()
    expect(text).toContain('Edwards')

    console.log(await GETresponse.json())

})

test("API POST request", async ({ request }) => {

    const POSTresponse = await request.post('https://reqres.in/api/users', {

        data: {
            "name": "Kanika",
            "job": "tester"
        }

    })

    //validate status code
    expect(POSTresponse.ok()).toBeTruthy()
    expect(POSTresponse.status()).toBe(201)

    const text = await POSTresponse.text()
    expect(text).toContain('Kanika')

    console.log(await POSTresponse.json())
    expect(await POSTresponse.json()).toHaveProperty('name');

})

test("API PUT request", async ({ request }) => {

    const PUTresponse = await request.put('https://reqres.in/api/users/2', {

        data: {
            "name": "Kanika",
            "job": "tester"
        }

    })

    expect(PUTresponse.status()).toBe(200)

    const text = await PUTresponse.text()
    expect(text).toContain('Kanika')

    console.log(await PUTresponse.json())

})

test("API DELETE request", async ({ request }) => {

    const response = await request.put('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)

})

