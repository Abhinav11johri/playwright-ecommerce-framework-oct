import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { SidebarMenuComponent } from './components/SidebarMenuComponent';
export class CartPage extends BasePage{
    
    readonly removeButton:Locator;
    readonly continueShoppingButton:Locator;
    readonly checkoutButton:Locator;
    readonly cartItems:Locator;
    readonly header: HeaderComponent;
    readonly sidebar: SidebarMenuComponent;

    constructor(page:Page)
    {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.removeButton = page.locator('.btn_small.cart_button');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
        this.header = new HeaderComponent(page);
        this.sidebar = new SidebarMenuComponent(page);
    }
     async clickCheckOut(): Promise<void> {
        await this.clickElement(this.checkoutButton);
    }

     async clickContinueShopping(): Promise<void> {
        await this.clickElement(this.continueShoppingButton);
    }

}



