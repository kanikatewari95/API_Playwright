const{test,expect} = require('@playwright/test')

test.beforeEach(async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
})

test('View Timesheets', async({page})=>{
    await expect(page.locator('#app')).toContainText('Quick Launch');
    await expect(page.getByRole('button', { name: 'Timesheets' })).toBeVisible();
    await page.getByRole('link', { name: 'Time' }).click();
    await expect(page.locator('li').filter({ hasText: 'Timesheets' })).toBeVisible();
})

test('Fill Info section', async({page})=>{
    await page.getByRole('link', { name: 'My Info' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Kantt');
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill('Matt');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('mathew');
    await expect(page.getByRole('link', { name: 'Job' })).toBeVisible();
    await page.locator('label').filter({ hasText: /^Male$/ }).locator('span').click();
    await page.getByRole('link', { name: 'Claim' }).click();
    await expect(page.locator('h6')).toContainText('Claim');
    await expect(page.locator('li').filter({ hasText: 'Configuration' })).toBeVisible();
})