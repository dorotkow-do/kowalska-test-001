import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '../pages/cart-page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login to saucedemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.STANDARD_USER || 'standard_user', process.env.PASSWORD || 'secret_sauce');

  const productsPage = new ProductsPage(page);
  await productsPage.assertPage();
  await productsPage.addToCart('bike-light');
  await productsPage.addToCart('bolt-t-shirt');
  await productsPage.shoppingCartLink.click();

  const cartPage = new CartPage(page);
  await cartPage.assertPage(2);
  await expect(cartPage.itemName).toHaveText([
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ]);
  await cartPage.checkoutButton.click();
});

test.skip('try to login as locked_out_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.LOCKED_OUT_USER || 'locked_out_user', process.env.PASSWORD || 'secret_sauce');
  await expect(loginPage.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
