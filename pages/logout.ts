import { Page, Locator } from '@playwright/test';

export class LogoutPage {
  private page: Page;
  private logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator(`//*[@id="logout2"]`);
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}