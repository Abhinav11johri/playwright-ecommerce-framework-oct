import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { SidebarMenuComponent } from './components/SidebarMenuComponent';
import { Logger } from '../utils/Logger';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productSortDropdown: Locator;
  readonly header: HeaderComponent;
  readonly sidebar: SidebarMenuComponent;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.productSortDropdown = page.locator('.product_sort_container');
    // Compose reusable components
    this.header = new HeaderComponent(page);
    this.sidebar = new SidebarMenuComponent(page);
  }

  async addProductToCart(productDataTestName: string): Promise<void> {
    Logger.info(`Adding item to cart: ${productDataTestName}`);
    await this.page.locator(`[data-test="add-to-cart-${productDataTestName}"]`).click();
  }

  async removeProductFromCart(productDataTestName: string): Promise<void> {
    Logger.info(`Removing item from cart: ${productDataTestName}`);
    await this.page.locator(`[data-test="remove-${productDataTestName}"]`).click();
  }

  // Delegated convenience methods (or tests can call inventoryPage.header.openCart())
  async openCart(): Promise<void> {
    await this.header.openCart();
  }

  async logout(): Promise<void> {
    await this.sidebar.logout();
  }
}