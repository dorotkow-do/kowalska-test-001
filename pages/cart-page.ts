import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartHeader: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly itemName: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartHeader = page.locator('[data-test="title"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
  }

  async assertPage(items: number) {
    await expect(this.cartHeader).toHaveText('Your Cart');
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.page.getByRole('button', { name: 'Remove' })).toHaveCount(items);
    await expect(this.itemName).toHaveCount(items);
  }
}
