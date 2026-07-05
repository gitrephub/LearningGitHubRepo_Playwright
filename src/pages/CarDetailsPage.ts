import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CarDetailsPage extends BasePage {
  readonly onRoadPriceLink: Locator;

  constructor(page: Page) {
    super(page);
    this.onRoadPriceLink = page.locator('a').filter({ hasText: /on road price/i }).first();
  }

  async openOnRoadPriceSection() {
    await this.onRoadPriceLink.waitFor({ state: 'visible', timeout: 20_000 });
    await this.onRoadPriceLink.click();
  }

  async getOnRoadPriceText() {
    await this.page.waitForLoadState('domcontentloaded');
    const pageText = await this.page.locator('body').innerText();
    const priceMatch = pageText.match(/Rs\.\s*[0-9,.]+(?:\s*-\s*[0-9,.]+)?\s*(?:Lakh|Crore)/i);
    return priceMatch?.[0] ?? pageText;
  }
}
