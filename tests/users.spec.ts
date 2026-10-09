import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test('obtener los usuarios registrados', async ({page}) => {

    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click();

    await page.getByRole('navigation', {name:'Topbar Menu'}).getByText('User Management').click();

    await page.getByRole('menuitem', {name:'Users'}).click();

    const rows= page.getByRole('table').getByRole('row');
    const usernames: String[] = []
    const employeeNames: String[] = []
    const rowsCount = await rows.count();

    for (let i=1; i<rowsCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1);
        const username= await cell.textContent();

        if (username){
            usernames.push(username);
        }
    }
    console.log('Usuarios registrados: ', usernames);

 for (let i=3; i<rowsCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(3);
        const employeeName= await cell.textContent();

        if (employeeName){
            employeeNames.push(employeeName);
        }
    }
    console.log('Nombre de empleados ', employeeNames);


    })