import {test, expect}  from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test('Login to HRM', async ({page}) => {
  //  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()

     await expect(page).toHaveURL(/.*dashboard/)

});

test('Login fallido', async ({page}) => {
   //  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 await page.getByRole('textbox', {name: 'Username'}).fill('Prueba');
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click(); 
    
     await expect(page.getByText(/invalid credentials/i)).toBeVisible();

})