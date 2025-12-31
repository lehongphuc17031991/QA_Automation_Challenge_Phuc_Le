import { test, expect, Page } from '../../fixtures/auth_demoblaze.ts';
import { HomePage } from '../../pages/home.ts';
import { SearchProduct } from '../../pages/search-product.ts';
import { AddToCart } from '../../pages/cart.ts';
import fs from 'fs';
import path from 'path';

interface ProductName {
    name: string;
    productName: string
}

// Login using fixture auth_demoblaze
test.describe(`Search product and add to Cart @UI @regression @smoke @positive`, () => {

    // Load, read JSON file
    const jsonPath = path.resolve(__dirname, './../../test_data/searchProduct.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const searchProductPositiveScenarios = JSON.parse(rawData).map((scenario: ProductName) => ({
        ...scenario,
    }));


    // to make sure cart is empty before each test
    test.beforeEach(async ({ authPage_demoblaze }) => {
        console.log(`------------- Clearing cart before test -------------`);
        const addToCart = new AddToCart(authPage_demoblaze);
        await addToCart.goToCartPage();

        // Verify number of products still remained in cart by accident
        // To make cart empty before testing
        let numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();
        if (numberOfTotalProducts !== 0) {
            await addToCart.clearCart();
        }
    });

    // ----------------------------- TC # 14 -----------------------------
    // This search is using the Windows-based search, not a built-in search in the web app
    test(`Search product name and add to cart`, async ({ authPage_demoblaze }) => {
        const searchProduct = new SearchProduct(authPage_demoblaze);
        const addToCart = new AddToCart(authPage_demoblaze);
        const homePage = new HomePage(authPage_demoblaze);

        // Verify number of product added to cart
        let numberOfSpecificProducts = await addToCart.numberOfSpecificProductAddedToCart('');

        for (const scenario of searchProductPositiveScenarios) {
            await test.step(`Searching and adding product: ${scenario.productName} to cart`, async () => {

                await homePage.goToHomePage();

                // Search for product and add to cart if found
                const found = await searchProduct.searchAndAddProduct(scenario.productName);
                expect(found).toBe(true);

                // Add to cart
                await addToCart.addToCart(scenario.productName);
                console.log(`Added product: ${scenario.productName} to cart`);

                await addToCart.goToCartPage();

                // Verify specific product is added successfully --> incremdented to 1
                numberOfSpecificProducts = await addToCart.numberOfSpecificProductAddedToCart(scenario.productName);
                expect(numberOfSpecificProducts).toBe(1);
            });
        }
        // Final check after all adds
        // Make sure all products are added by checking the number of total products in cart
        await addToCart.goToCartPage();
        const numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();
        expect(numberOfTotalProducts).toBe(searchProductPositiveScenarios.length);
    });

    // Clear cart after testing
    // ----------------------------- TC # 15 -----------------------------
    test.afterEach(async ({ authPage_demoblaze }) => {
        console.log(`------------- Clearing cart after test -------------`);
        const addToCart = new AddToCart(authPage_demoblaze);
        await addToCart.goToCartPage();

        let numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();
        if (numberOfTotalProducts !== 0) {
            await addToCart.clearCart();
        }
        numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();

        expect(numberOfTotalProducts).toBe(0); // cart is empty at the end
    });
});