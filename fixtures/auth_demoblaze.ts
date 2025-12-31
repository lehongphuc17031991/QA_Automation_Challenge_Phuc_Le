import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { LogoutPage } from '../pages/logout';
import { credentials } from '../utils/credentials';

const AdminUsername: string = credentials.AdminUsername;
const AdminPassword: string = credentials.AdminPassword;

// Extend Playwright's base test
const test = base.extend<{ authPage_demoblaze: Page }>({
    authPage_demoblaze: async ({ page }, use) => {
    // Setup: login
        await page.goto('/');

        const login = new LoginPage(page);

        // Wait for login button to be visible
        await expect(login.getLoginButton()).toBeVisible();
        
        // Open login modal
        await login.openLoginModal();

        // ----------------------------- TC # 1 -----------------------------
        // Perform login
        await login.login(AdminUsername, AdminPassword);

        // Verify login was successful - less common but just to be sure
        await expect(page.locator(`//a[text()="Welcome ${credentials.AdminUsername}"]`)).toBeVisible();

        // Provide the logged-in page to tests
        await use(page);

        // Teardown: logout        
        const logout = new LogoutPage(page);
        await logout.logout();

        // Verify logout was successful by checking login button is visible again
        await expect(login.getLoginButton()).toBeVisible();
    },
});

export { test, expect, Page };