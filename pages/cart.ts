import { Page, expect, Locator } from '@playwright/test';

export class AddToCart {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async addToCart(nameOfProduct: string): Promise<void> {
        const addToCartButton = this.page.locator(`//a[text()="Add to cart"]`);

        // Start waiting for a dialog but don't block forever — short timeout so we can fallback
        const dialogPromise = this.page.waitForEvent('dialog', { timeout: 3000 }).catch(() => null);

        // If the click may navigate, coordinate it; otherwise just click.
        // Use Promise.all only if navigation is expected:
        await addToCartButton.waitFor({ state: 'visible', timeout: 3000 });
        await addToCartButton.click()


        // If a dialog appeared, assert and accept it
        const dialog = await dialogPromise;
        if (dialog) {
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        } else {
            this.page.reload()
        }
    }


    async numberOfSpecificProductAddedToCart(nameOfProduct: string): Promise<number> {
        // Check product is visible and wait for visibility in table
        const productRow = this.page.locator(`//tbody[@id="tbodyid"]//td[contains(text(),"${nameOfProduct}")]`);
        try {
            await productRow.first().waitFor({ state: 'visible', timeout: 3000 });
        } catch (error) {
            // console.log('No products found');
        }

        const count = await productRow.count();

        if (count === 0) {
            return 0; // nothing in cart
        }

        // Count number of products in cart
        return count;
    }

    async numberOfTotalProductAddedToCart(): Promise<number> {
        // Check product is visible and wait for visibility in table
        const productRow = this.page.locator('//tbody[@id="tbodyid"]//td[last()]');
        try {
            await productRow.first().waitFor({ state: 'visible', timeout: 3000 });
        } catch (error) {
            // console.log('No products found');
        }

        const count = await productRow.count();

        if (count === 0) {
            return 0; // nothing in cart
        }

        // Count number of products in cart
        return count;
    }

    async goToCartPage(): Promise<void> {
        const cartLink = this.page.locator(`//a[text()="Cart"]`);
        await cartLink.waitFor({ state: 'visible', timeout: 3000 });
        await cartLink.click();
    }

    async clearCart(): Promise<void> {
        // Locator for the rows in the cart table
        const tableRows = this.page.locator(`//tbody[@id="tbodyid"]/tr`);

        // Loop as long as there are any rows in the table
        while (await tableRows.count() > 0) {
            const currentCount = await tableRows.count();
            console.log(`Items in cart: ${currentCount}. Deleting the first one.`);

            // 1. Click the first "Delete" link found in the table body
            await this.page.locator(`//tbody[@id="tbodyid"]//a[text()="Delete"]`).first().click();

            // 2. Wait until the number of rows in the table decreases by one
            await expect(tableRows).toHaveCount(currentCount - 1);

            console.log(`Items remaining: ${await tableRows.count()}`);
        }
        console.log(`Cart is now empty.`);
    }
}