import { test, expect } from '@playwright/test';

test('Pressing a link in the drawer menu closes the menu and transitions the screen', async ({ page }) => {
    //login.htmlに遷移
    await page.goto('http://localhost:3000/lesson33/login.html');

    //ハンバーガーボタンを押す
    await page.getByRole('button', { name: 'メニューを開閉する' }).click();
    
    //ドロワーメニュー内の「Sign up」リンクを押す
    await page.getByRole('link', { name: 'Sign up', exact: true }).click();

    //register.htmlに遷移
    await page.goto('http://localhost:3000/lesson33/register.html');
    await expect(page.getByTestId('signup-page')).toContainText('Login ▶︎ Sign Up');
});
