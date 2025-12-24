import { Page, Locator } from '@playwright/test';

export class SearchProduct {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchAndAddProduct(nameOfProduct: string): Promise<boolean> {
        // Check visibility and click on the product if possible
        while (true) {
            const productLocator: Locator = this.page.locator(`//a[contains(text(),'${nameOfProduct}')]`);

            // Product found at 1st page
            // Use count() instead of isVisible() to avoid waiting for timeout
            if (await productLocator.count() > 0) {
                await productLocator.first().click();
                return true;
            }
            else {
                // Navigate to next page to continue to find product
                // Only match if not hidden by inline style
                const NextButton = this.page.locator("//button[@id='next2' and not(contains(@style,'display: none'))]");
                if (await NextButton.count() > 0) {
                    await NextButton.click();
                    await this.page.waitForTimeout(1000);
                }
                // Product not found
                else {
                    return false;
                }
            }
        }
    }
}