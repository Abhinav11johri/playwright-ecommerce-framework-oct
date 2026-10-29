import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path:string):Promise<void>
    {
        await this.page.goto(path);
    }

    async clickElement(locator:Locator):Promise<void>{
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    }

    async fillInput(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }
    async getElementText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return (await locator.textContent())?.trim() ?? '';
    }
}












