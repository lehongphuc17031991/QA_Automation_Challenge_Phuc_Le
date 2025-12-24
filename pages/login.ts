import { Page, Locator } from '@playwright/test';

// General XPath for buttons inside login modal
const buttonsInLoginModal = '//*[@id="logInModal"]//button';
export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitLoginButton: Locator;
  private openLoginModalButton: Locator;
  private closeLoginModalButton: Locator;
  private closeLoginModalXButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openLoginModalButton = page.locator('//*[@id="login2"]');
    this.usernameInput = page.locator('//*[@id="loginusername"]');
    this.passwordInput = page.locator('//*[@id="loginpassword"]');
    this.submitLoginButton = page.locator(`${buttonsInLoginModal}[text()="Log in"]`);
    this.closeLoginModalButton = page.locator(`${buttonsInLoginModal}[text()="Close"]`);
    this.closeLoginModalXButton = page.locator(`${buttonsInLoginModal}/span`);
  }

  // Open login modal
  async openLoginModal(): Promise<void> {
    await this.openLoginModalButton.waitFor({ state: 'visible' });
    await this.openLoginModalButton.click();
  }

  // For login action
  async login(username: string, password: string): Promise<void> {
    // Wait for all fields to be visible
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });

    // Avoid flaky by clicking before filling
    await this.usernameInput.click();
    await this.usernameInput.fill(username);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.submitLoginButton.click();
  }

  getLoginButton(): Locator {
    return this.openLoginModalButton;
  }

  // For close login modal action
  async closeLoginModalUsingCloseButton(): Promise<void> {
    await this.closeLoginModalButton.click();
  }

  async closeLoginModalUsingXButton(): Promise<void> {
    await this.closeLoginModalXButton.click();
  }
}