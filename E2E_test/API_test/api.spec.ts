import { test, expect } from '@playwright/test';
import { credentials } from '../../utils/credentials';

const AdminUsername: string = credentials.AdminUsername;
const AdminPassword: string = credentials.AdminPassword;

test('Login @API @regression', async ({ request }) => {
    const response = await request.post('https://api.demoblaze.com/login', {
        data: {
            username: AdminUsername,
            password: AdminPassword
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body); // inspect token or error message
});