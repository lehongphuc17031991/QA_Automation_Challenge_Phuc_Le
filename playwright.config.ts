// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const ENV = process.env.TEST_ENV || 'production'; // default to production

const baseURLs: Record<string, string> = {
  staging: 'https://staging.demoblaze.com/',
  production: 'https://www.demoblaze.com/',
};


export default defineConfig({
  testDir: './E2E_test',
  /* Run tests in files in parallel */
  fullyParallel: false, 
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // playwright.config.js (reporter section)
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never', port: 9333 }], // custom port
    ['junit', { outputFile: 'test-results/results.xml' }],

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // maximum time for actions (click, fill, waitForSelector, locator actions)
    // this controls how long Playwright will wait for an element/action by default
    actionTimeout: 30000,

    headless: !!process.env.CI, // boolean: true in CI, false locally
    // equivalent to:
    // headless: process.env.CI ? true : false,

    video: 'on-first-retry',
    viewport: null,  // (no fixed viewport)

    launchOptions: {
      slowMo: 200,
      // args: ['--start-maximized'],  // launch browser maximized
    },
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: baseURLs[ENV],

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // test timeout: maximum time a single test can run before being aborted
  // keep this larger than action timeouts; adjust to suit your CI/environment
  timeout: 180000, // 180 seconds
  expect: {
    // default timeout for `expect()` matchers (overrides runtime `expect.setTimeout` absence)
    timeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {

        ...devices['Desktop Chrome']
        // When you use ...devices['Desktop Chrome'], Playwright sets a specific deviceScaleFactor
        // along with a fixed viewport size (e.g., 1280x720)
        // --> Conflict with viewport: null setting above
        // browserName: 'chromium'
      },
    },

    // Uncomment below to run tests in Firefox and WebKit as well
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});