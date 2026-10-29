import { Page, Locator } from '@playwright/test';
export class SidebarMenuComponent {

    readonly page: Page;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
    }

    async openMenu():Promise<void>{
        await this.menuButton.click();
    }

    async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }
}




