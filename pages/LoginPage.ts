import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Config } from '../config/env.config';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page); // Passes page to BasePage
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate(): Promise<void> {
    Logger.info(`Navigating to URL: ${Config.baseUrl}`);
    await this.navigateTo(Config.baseUrl);
  }

  async login(user: string, pass: string): Promise<void> {
    Logger.info(`Logging in with username: ${user}`);
    await this.fillInput(this.usernameInput, user);
    await this.fillInput(this.passwordInput, pass);
    await this.clickElement(this.loginButton);
  }
}
