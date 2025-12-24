import { Page, Locator } from '@playwright/test';

export class AddToCart {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart(nameOfProduct: string): Promise<void> {
        const addToCartButton: Locator = this.page.locator("//a[text()='Add to cart']");
        await addToCartButton.click();
    }

    async numberOfProductAddedToCart(nameOfProduct: string): Promise<number> {
        // Go to cart page
        const cartLink = this.page.locator("//a[text()='Cart']");
        await cartLink.click();

        // Check product is visible and wait for visibility in table
        const productRow = this.page.locator(`//tbody[@id='tbodyid']//td[contains(text(),"${nameOfProduct}")]`);
        await productRow.first().waitFor({ state: 'visible' });

        // Count number of products in cart
        return await productRow.count();
    }
}