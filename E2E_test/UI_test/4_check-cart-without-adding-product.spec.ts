import { test, expect, Page } from '../../fixtures/auth_demoblaze.ts';
import { AddToCart } from '../../pages/cart.ts';

// ----------------------------- TC # 13 -----------------------------
test(`Check cart without adding any product @UI @positive @regression`, async ({ authPage_demoblaze }) => {
    // just to make sure page is stable
    await authPage_demoblaze.reload();

    const addToCart = new AddToCart(authPage_demoblaze);
    await addToCart.goToCartPage();
    let numberOfTotalProducts = await addToCart.numberOfTotalProductAddedToCart();
    expect(numberOfTotalProducts).toBe(0); // cart is empty at the start
});