import { test, expect } from '@playwright/test';

test('If your email address was already registered in the member registration, you will get an error', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');

    // 会員登録する
    await page.getByLabel('UserName必須').fill('takeda');
    await page.getByLabel('E-mail必須').fill('fafafa@sample.com');
    await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').fill('Fafafa0000');
    await page.getByTestId('terms-link').click();
    await page.getByTestId('modal-contents').click();
    await page.mouse.wheel(0, 10000); // modalを一番下までスクロールする
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Create My Account' }).click();
    await page.getByRole('link', { name: 'ログインページへ移動する' }).click();
    await page.getByRole('link', { name: 'Sign Up' }).click();

    // 再度同じメールアドレスで会員登録する
    await page.getByLabel('UserName必須').fill('takeda');
    await page.getByLabel('E-mail必須').fill('fafafa@sample.com');
    await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').fill('Fafafa0000');
    await page.getByTestId('terms-link').click();
    await page.getByTestId('modal-contents').click();
    await page.mouse.wheel(0, 10000);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Create My Account' }).click();

    const locator = page.getByTestId('error-area');
    await expect(locator).toHaveText('既に登録済みのメールアドレスです');
    await page.screenshot({ path: "./src/playwright/register/error-duplicate-entry.png", fullPage: true });
});
