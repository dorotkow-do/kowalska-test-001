import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('login to saucedemo', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Swag Labs/);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
});

test('try to login as locked_out_user', async ({ page }) => {
  await page.goto('/');

  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.LOCKED_OUT_USER || 'locked_out_user', process.env.PASSWORD || 'secret_sauce');
  await expect(loginPage.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
