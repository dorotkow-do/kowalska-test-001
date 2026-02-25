import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login to saucedemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.STANDARD_USER || 'standard_user', process.env.PASSWORD || 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);
});

test('try to login as locked_out_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.LOCKED_OUT_USER || 'locked_out_user', process.env.PASSWORD || 'secret_sauce');
  await expect(loginPage.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
