import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class NewCarsPage extends BasePage {
  readonly searchInput: Locator;
  readonly tataCarLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder(/search/i).first();
    this.tataCarLink = page.locator('a').filter({ hasText: /tata nexon/i }).first();
  }

  async searchForCar(carName: string) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 15_000 });
    await this.searchInput.fill(carName);
    await this.page.keyboard.press('Enter');
  }

  async openTataNexon() {
    await this.tataCarLink.waitFor({ state: 'visible', timeout: 20_000 });
    await this.tataCarLink.click();
  }
}
