import { Page, Locator } from '@playwright/test';
export class HeaderComponent {
    readonly page:Page;
    readonly cartIcon:Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');

    }
    // Define an asynchronous method to trigger navigation to the shopping cart view
    async openCart(): Promise<void>{
        await this.cartIcon.click();
    }

   // Define an asynchronous method to extract and return the current number of items shown on the cart badge

   async getCartCount():Promise<string>{
        // Read the text content of the badge, trim surrounding whitespace, or return '0' if the badge is absent/null
        return(await this.cartBadge.textContent())?.trim() ?? '0';
   }
}




