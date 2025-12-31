import { test, expect, Page } from '../../fixtures/auth_demoblaze.ts';
import { credentials } from '../../utils/credentials.ts';
import { LoginPage } from '../../pages/login.ts';
import fs from 'fs';
import path from 'path';

interface LoginScenario {
    name: string;
    username: string;
    password: string;
    expectedResult: string;
}

// Load, read JSON file
const jsonPath = path.resolve(__dirname, './../../test_data/loginScenarios.json');
const rawData = fs.readFileSync(jsonPath, 'utf-8');

// Replace ENV placeholders with real credentials
const loginScenarios = JSON.parse(rawData).map((scenario: LoginScenario) => ({
    ...scenario,
    username: scenario.username.replace('ENV:ADMIN_USERNAME', credentials.AdminUsername),                                 // replace ENV placeholder if present
    password: scenario.password.replace('ENV:ADMIN_PASSWORD', credentials.AdminPassword) 
}));

// ----------------------------- TC # 2 --> 10 -----------------------------
// Negative login scenarios (use built-in fixture - page)
test.describe(`Login Edge Cases @UI @negative`, () => {
    for (const scenario of loginScenarios) {
        test(`Login with ${scenario.name}`, async ({ page }) => {
            await page.goto('/');
            const login = new LoginPage(page);

            // Open login modal
            await login.openLoginModal();

            // Handle alert dialog if any
            page.once('dialog', async dialog => {
                expect(dialog.message()).toContain(scenario.expectedResult);
                await dialog.accept();
            });

            await login.login(scenario.username, scenario.password);
        });
    }
});

// ----------------------------- TC # 11 -----------------------------
test.describe(`Verify @UI @positive`, () => {
    test(`Close login modal using Close button`, async ({ page }) => {
        await page.goto('/');
        const login = new LoginPage(page);

        // Open login modal
        await login.openLoginModal();

        // Close login modal using Close button
        await login.closeLoginModalUsingCloseButton();
    });

    test(`Close login modal using X button`, async ({ page }) => {
        await page.goto('/');
        const login = new LoginPage(page);

        // Open login modal
        await login.openLoginModal();

        // Close login modal using X button
        await login.closeLoginModalUsingXButton();
    });
});