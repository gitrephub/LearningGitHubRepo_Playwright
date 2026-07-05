import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string = '/') {
    await this.page.goto(path);
    await this.dismissCookieBanner();
  }

  protected async clickWhenVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15_000 });
    await locator.click();
  }

  async dismissCookieBanner() {
    const candidates = [
      this.page.getByRole('button', { name: /continue/i }).first(),
      this.page.getByRole('button', { name: /accept/i }).first(),
      this.page.getByText(/continue in english/i).first()
    ];

    for (const candidate of candidates) {
      try {
        await candidate.click({ timeout: 2_000 });
        return;
      } catch {
        // Ignore and try the next candidate.
      }
    }
  }
}
