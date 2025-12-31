import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToHomePage(): Promise<void> {
        const homeLink = this.page.locator(`//a[contains(text(),"Home")]`);
        await homeLink.waitFor({ state: 'visible', timeout: 5000 });
        await homeLink.click();
        
        // Wait for the home page to finish loading by checking visibility of product container
        const tableRows = this.page.locator(`//div[@id="tbodyid"]`);
        await tableRows.waitFor({ state: 'visible', timeout: 5000 });
    }
}