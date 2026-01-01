import { test, expect } from '@playwright/test';
import { AddToCart } from '../../pages/cart.ts';

// ----------------------------- TC # 12 -----------------------------
test(`Check cart without adding any product @UI @positive @regression`, async ({ page }) => {
    await page.goto('/')
    const addToCart = new AddToCart(page);
    await addToCart.goToCartPage();
    let numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();
    expect(numberOfTotalProducts).toBe(0); // cart is empty at the start
});