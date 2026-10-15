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

    await expect(page).toHaveURL(/.*dashboard/)

})

test('Navegación dando click una a una', async ({page}) => {
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()
    const leftMenuItems = await page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count();

    for(let i=0; i<currentMenuItemsCount; i++){
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText();

        console.log('Navegando a la página: ', menuText);

         await menuItem.click();

        if (menuText === 'Maintenance'){
            await page.goBack();
            continue;
        }
       
   
    }
})

test('Clic en los qualifications links', async ({page}) => {

    const ExpectedPages = [
        {
            name: 'Skills',
            url: '/web/index.php/admin/viewSkills'

        },
        {
            name: 'Education',
            url: '/web/index.php/admin/viewEducation'
        
        }, 
        {
            name: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },

    ]

    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()
    await page.getByRole('link', {name: 'Admin'}).click();
    await page.getByRole('navigation', {name:'Topbar Menu'}).getByText('Qualifications').click();
    const qualificationsOptions= page.getByRole('menu').locator('li');

    for (let ExpectedPage of ExpectedPages){

        const menuOption= qualificationsOptions.filter({hasText: ExpectedPage.name});
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(ExpectedPage.url));
        await page.getByRole('navigation', {name:'Topbar Menu'}).getByText('Qualifications').click();
    }

})


