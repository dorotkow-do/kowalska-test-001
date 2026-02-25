import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly bikeLightAddToCartButton: Locator;
  readonly boltTShirtAddToCartButton: Locator;
  readonly bikeLightRemoveButton: Locator;
  readonly boltTShirtRemoveButton: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeader = page.locator('[data-test="title"]');
    this.bikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.boltTShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.bikeLightRemoveButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.boltTShirtRemoveButton = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async assertPage() {
    await expect(this.productsHeader).toHaveText('Products');
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async addToCart(item: 'bike-light' | 'bolt-t-shirt') {
    let addToCartButton = this.boltTShirtAddToCartButton;
    if (item === 'bike-light') {
      addToCartButton = this.bikeLightAddToCartButton;
    }
    await expect(addToCartButton).toHaveText('Add to cart');
    await addToCartButton.click();
    await expect(addToCartButton).not.toBeVisible();
  }

  async removeFromCart(item: 'bike-light' | 'bolt-t-shirt') {
    let removeButton = this.boltTShirtRemoveButton;
    if (item === 'bike-light') {
      removeButton = this.bikeLightRemoveButton;
    }
    await expect(removeButton).toHaveText('Remove');
    await removeButton.click();
    await expect(removeButton).not.toBeVisible();
  }
}
