import { expect, type Locator, type Page } from '@playwright/test';

export class Checkout2Page {
  readonly page: Page;
  readonly subtotalLabel: Locator;


  constructor(page: Page) {
    this.page = page;
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
  }

  async assertPage(subtotal: string) {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.subtotalLabel).toContainText(subtotal);
  }
}
