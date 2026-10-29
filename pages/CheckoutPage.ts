import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { StringUtils } from '../utils/StringUtils';
import { Logger } from '../utils/Logger';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly summaryTotalLabel: Locator;
  readonly completeHeader: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.backToProductsButton = page.locator('#back-to-products');
  }

  async fillCustomerInformation(first: string, last: string, zip: string): Promise<void> {
    Logger.info(`Filling customer information: ${first} ${last}, ZIP: ${zip}`);
    await this.fillInput(this.firstNameInput, first);
    await this.fillInput(this.lastNameInput, last);
    await this.fillInput(this.postalCodeInput, zip);
    await this.clickElement(this.continueButton);
  }

  async clickFinish(): Promise<void> {
    await this.clickElement(this.finishButton);
  }

  async getParsedTotal(): Promise<number> {
    const rawText = await this.getElementText(this.summaryTotalLabel);
    return StringUtils.extractPrice(rawText);
  }}
  