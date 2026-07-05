import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {
  readonly newCarsLink: Locator;
  readonly brandSection: Locator;
  readonly tataLink: Locator;

  constructor(page: Page) {
    super(page);
    this.newCarsLink = page.getByRole('link', { name: /new cars/i }).first();
    this.brandSection = page.locator('text=Popular Brands').first();
    this.tataLink = page.locator('a[href*="/tata/"]', { hasText: 'Tata' }).first();
  }

  async openHomePage() {
    await this.open('/');
  }

  async navigateToNewCars() {
    await this.clickWhenVisible(this.newCarsLink);
  }

  async openTataBrandPage() {
    await this.tataLink.waitFor({ state: 'visible', timeout: 15_000 });
    await this.tataLink.click();
  }
}
