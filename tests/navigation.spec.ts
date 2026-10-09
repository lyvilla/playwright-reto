import {test, expect} from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});
test('navegación entre páginas', async ({page}) => {

    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()

    const leftMenuItem = await page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItem.count();
    console.log('Cantidad de elementos en el menú lateral: ', currentMenuItemsCount);

    const currentMenuItems: String[] = []

    for (let i=0; i<currentMenuItemsCount; i++){
        const menuItem= await leftMenuItem.nth(i).innerText();
        currentMenuItems.push(menuItem);
    }
    console.log('Elementos del menú lateral: ', currentMenuItems);

    const ExpectMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ]

    expect(currentMenuItems).toEqual(ExpectMenuItems);
    expect(currentMenuItems[0]).toBe('Admin');
})


