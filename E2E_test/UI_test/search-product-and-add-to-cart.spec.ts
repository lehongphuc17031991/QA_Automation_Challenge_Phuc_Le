import { test, expect, Page } from '../../fixtures/auth_demoblaze.ts';
import { SearchProduct } from '../../pages/search-product.ts';
import { AddToCart } from '../../pages/add-to-cart.ts';

const validProductName: string = 'Apple';
const invalidProductName: string = 'NonExistingProduct';

// Login using fixture auth_demoblaze

test('Search product and add to Cart @UI @regression @smoke @positive', async ({ authPage_demoblaze }) => {
    const searchProduct = new SearchProduct(authPage_demoblaze);
    const found = await searchProduct.searchAndAddProduct(validProductName);

    // Search for product and add to cart if found
    await expect(found).toBe(true);

    // Add to cart
    const addToCart = new AddToCart(authPage_demoblaze);
    await addToCart.addToCart(validProductName);

    // Verify number of product added to cart
    const numberOfProducts = await addToCart.numberOfProductAddedToCart(validProductName);

    // For testing purpose: when we run on multiple browsers simultaneously, the product is added more than once
    expect(numberOfProducts).toBeGreaterThanOrEqual(1);
});

test('Search invalid product, cannot add to cart @UI @regression @sanity @smoke @negative', async ({ authPage_demoblaze }) => {
    const searchProduct = new SearchProduct(authPage_demoblaze);
    const found = await searchProduct.searchAndAddProduct(invalidProductName);

    // Search for product and add to cart if found
    await expect(found).toBe(false);
    console.log(`Product "${invalidProductName}" not found.`);
});