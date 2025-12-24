This repository is for UI automation testing on site: https://www.demoblaze.com/ and built with Playwright using TypeScript
The scope is:
- Login (functional and negative cases)
- Search for a random product and add to cart successfully, then check the product in cart (also include the search for a non-existing product)
- API (just for demo because I don't know the exact API)

---
**Framework Structure and Rationale:**
```
  ├── E2E_test/               # test files (*.spec.ts) for UI, API, and performance
  ├── fixtures/               # custom fixtures (e.g. log in, log out)
  ├── pages/                  # Page Object Models (encapsulate UI interactions)
  ├── utils/                  # helpers (credentials, env config)
  ├── playwright-reports/     # test reports (HTML, JSON, summary)
  ├── .circleci/              # CircleCI configuration for CI/CD pipelines
  ├── playwright.config.ts    # Playwright configuration (env, base URL, retries, reporters, browsers)
  └── ci/                     # Summary scripts for reporting test case counts in CI
```

**Rationale:**
- **E2E_test/**: Contains all test files, organized by type (UI, API, Performance). For performance, it's currently a placeholder, with no specific test file; it can be used later.
- **fixtures/**: Provides reusable context such as login, logout flows. This is to reduce duplication and make the tests easier to maintain.
- **pages/**: Implements the Page Object Model pattern. Each file is served for a page or feature, making it easier to read and maintain later.
- **utils/**: Contains helpers like credentials.ts to configure the environment and get credentials for testing.
- **playwright-reports/**: Save the reports in HTML, JSON, summaries; mainly used for debug or view results after testing.
- **.circleci/**: Defines CircleCI jobs and workflows, also using the environment variables and parameters.
- **playwright.config.ts**: Contains configurations of Playwright like environment, base URL, retries, reporters, browser settings.
- **ci/**: Custom scripts for reporting test case counts in CI, including total test cases, number of test cases passed, failed, skipped.

---

**Steps to Execute Demo Scripts**

### 1. Install dependencies
npm ci

### 2. Install Playwright browsers
npx playwright install --with-deps

### 3. Run all tests
npx playwright test

You can run by tag also (some tags available: UI, API, positive, negative, regression, smoke)
npx playwright test --grep "@smoke"

### 4. View HTML report
npx playwright show-report

---

### Notes:
- For CI/CD: 
  - The project is integrated with CircleCI for CI/CD:
    - Some configurations in CircleCI are required to run
        - Environment variables: ADMIN_USERNAME, ADMIN_PASSWORD
        - Pipeline parameters: test_env, type_testing
  - The project has configuration to send notifications to Slack (requires having more configurations in Slack too to run)
  - The project has customized the notification sent to Slack to include:
      - Number of test cases passed
      - Number of test cases failed
      - Number of test cases skipped
      - Total of test cases run
      - CI link
      - HTML report link
      - Branch name
  - Please disregard the .github\workflows since it's used for Github Actions, which the project does not use it
- For testing only, I uploaded .env to easily run locally, but I already included .env in gitignore, since uploading .env to git is not supposed to do in a practical project
- The 3 browsers supported to run: Chrome, Firefox, Webkit (all 3 are running simultaneously when using npx playwright test)
- If npx playwright show-report is using a duplicated port, just add --port 9333 to the end to specify the port specifically
