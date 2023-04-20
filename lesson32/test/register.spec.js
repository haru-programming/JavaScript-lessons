import { test, expect } from '@playwright/test';

test('If your email address was already registered in the member registration, you will get an error', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');

    const name = 'takeda';
    const email = 'fafafa@sample.com';
    const password = 'Fafafa0000';

    // 会員登録する
    await page.getByLabel('UserName必須').fill(name);
    await page.getByLabel('E-mail必須').fill(email);
    await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').fill(password);
    await page.getByTestId('terms-link').click();
    await page.getByTestId('modal-contents').click();
    await page.getByTestId('last-sentence').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Create My Account' }).click();
    await page.getByRole('link', { name: 'ログインページへ移動する' }).click();
    await page.getByRole('link', { name: 'Sign Up' }).click();

    // 再度同じメールアドレスで会員登録する
    await page.getByLabel('UserName必須').fill(name);
    await page.getByLabel('E-mail必須').fill(email);
    await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').fill(password);
    await page.getByTestId('terms-link').click();
    await page.getByTestId('modal-contents').click();
    await page.getByTestId('last-sentence').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Close' }).click();

    const button = page.getByRole('button', { name: 'Create My Account' });
    await button.click();
    await expect(button).toBeDisabled();

    const errorArea = page.getByTestId('error-area');
    await expect(errorArea).toHaveText('既に登録済みのメールアドレスです');
});
