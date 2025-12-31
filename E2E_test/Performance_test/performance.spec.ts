import { test, expect } from '@playwright/test';

test(`Measure page loading time @performance @regression`, async ({ page }) => {
  const start = Date.now();

  await page.goto('/');

  const end = Date.now();
  const loadingTime = end - start;

  console.log(`Page loading time: ${loadingTime} ms`);
  expect(loadingTime).toBeLessThan(6000); // Example threshold: 5 seconds
});