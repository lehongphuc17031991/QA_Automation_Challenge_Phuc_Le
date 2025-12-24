import { test, expect, Page } from '../../fixtures/auth_demoblaze.ts';
import { credentials } from '../../utils/credentials.ts';
import { LoginPage } from '../../pages/login.ts';


// Negative login scenarios (built-in fixture - page)
const loginScenarios = [
    {
        name: 'Wrong Password',
        username: credentials.AdminUsername,
        password: '123',
        expected: 'Wrong password',
    },
    {
        name: 'Empty Password',
        username: credentials.AdminUsername,
        password: '',
        expected: 'Please fill out Username and Password',
    },
    {
        name: 'Empty Username',
        username: '',
        password: '123456',
        expected: 'Please fill out Username and Password',
    },
    {
        name: 'Empty Username and Empty Password',
        username: '',
        password: '',
        expected: 'Please fill out Username and Password',
    },
    {
        name: 'NonExisting User',
        username: 'test_demo123@gmail.com',
        password: '123456',
        expected: 'User does not exist',
    },
];

test.describe('Login Edge Cases @UI @negative', () => {
    for (const scenario of loginScenarios) {
        test(`Login with ${scenario.name}`, async ({ page }) => {
            await page.goto('/');
            const login = new LoginPage(page);

            // Open login modal
            await login.openLoginModal();

            // Handle alert dialog
            page.once('dialog', async dialog => {
                expect(dialog.message()).toContain(scenario.expected);
                await dialog.accept();
            });

            await login.login(scenario.username, scenario.password);
        });
    }
});

test.describe('Verify @UI @positive', () => {
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