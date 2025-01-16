const { test, expect } = require('@playwright/test')
import{ faker } from '@faker-js/faker'
const{ dateTime } = require('luxon')


test("API POST request", async ({ request }) => {

    const firstname = faker.person.firstName()

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

