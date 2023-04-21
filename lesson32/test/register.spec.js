import { test, expect } from '@playwright/test';

test('Correct keyboard transitions in the register form', async ({ page }) => {
    await page.goto('http://localhost:3000/register.html');

    const userNameArea = page.getByLabel('UserName必須');
    const emailArea = page.getByLabel('E-mail必須');
    const passwordArea = page.getByLabel('Password ( 8文字以上の大小英数字 )必須');
    const modalCloseButton = page.getByRole('button', { name: 'Close' });
    const modalContents = page.getByTestId('modal-contents');
    const submitButton = page.getByRole('button', { name: 'Create My Account' });

    // form tab遷移
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'メニューを開閉する' })).toBeFocused(); //hamburger button

    await page.keyboard.press('Tab');
    await expect(userNameArea).toBeFocused();
    await userNameArea.fill('takeda');

    await page.keyboard.press('Tab');
    await expect(emailArea).toBeFocused();
    await emailArea.fill('fafafa@sample.com');

    await page.keyboard.press('Tab');
    await expect(passwordArea).toBeFocused();
    await passwordArea.fill('Fafafa0000');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'パスワードが表示されます' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByTestId('terms-link')).toBeFocused(); //利用規約リンク
    await page.keyboard.press('Enter');

    // 利用規約モーダル内 tab遷移
    await page.keyboard.press('Tab');
    await expect(modalCloseButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalContents).toBeFocused();
    await page.getByTestId('last-sentence').scrollIntoViewIfNeeded(); //最後の文章までスクロール
    
    await page.keyboard.press('Tab');
    await expect(modalCloseButton).toBeFocused();
    await page.keyboard.press('Enter');

    // submitボタン tab遷移
    await expect(submitButton).toBeFocused();
    page.keyboard.press('Enter');

    await expect(page.getByTestId("complete-text")).toContainText('アカウント登録が完了しました。');
});
