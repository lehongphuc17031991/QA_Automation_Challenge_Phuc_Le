This repository is for UI automation testing on site: https://www.demoblaze.com/ and built with Playwright using TypeScript
The scope is:
- Login (positive and negative cases)
- Search for 5 products and add to cart successfully, then check the product in cart (also include checking cart when user is not logged in or with empty cart)
- API (just for demo because I don't know the exact API)
- Performance (just for demo too, simply measure the loading time of the page)

---
**Framework Structure and Rationale:**
```
  ├── E2E_test/               # test files (*.spec.ts) for UI, API, and Performance
  ├── fixtures/               # custom fixtures (e.g. log in, log out)
  ├── pages/                  # Page Object Models (encapsulate UI interactions)
  ├── utils/                  # helpers (credentials, env config)
  ├── playwright-reports/     # test reports (HTML, JSON, summary)
  ├── .circleci/              # CircleCI configuration for CI/CD pipelines
  ├── playwright.config.ts    # Playwright configuration (env, base URL, retries, reporters, browsers)
```

**Rationale:**
- **E2E_test/**: Contains all test files, organized by type (UI, API, Performance). Some Tests in UI folder are also reflected in the Excel file for the list of Test Cases - for easy reference
- **fixtures/**: Provides reusable context such as login, logout flows. This is to reduce duplication and make the tests easier to maintain.
- **pages/**: Implements the Page Object Model pattern. Each file is served for a page or feature, making it easier to read and maintain later.
- **utils/**: Contains helpers like credentials.ts to configure the environment and get credentials for testing.
- **playwright-reports/**: Save the reports in HTML, JSON, summaries; mainly used for debug or view results after testing.
- **.circleci/**: Defines CircleCI jobs and workflows, also using the environment variables and parameters, to server for CI CD purposes.
- **playwright.config.ts**: Contains configurations of Playwright like environment, base URL, retries, reporters, browser settings.

---

**Steps to Execute Demo Scripts**

### 1. Install dependencies
npm install

### 2. Install Playwright browsers
npx playwright install --with-deps

### 3. Run all tests
npx playwright test

You can run by tag also (some tags available: UI, API, positive, negative, regression, smoke):  
npx playwright test --grep "@smoke"

### 4. View HTML report
npx playwright show-report

---

### Notes:
- For CI/CD: 
  - The project is integrated with CircleCI for CI/CD:
    - Some configurations in CircleCI are required to run
        - Environment variables: ADMIN_USERNAME, ADMIN_PASSWORD (please use the credentials in .env file)
        - Pipeline parameters: test_env, type_testing
			- These 2 are used for schedule run only in CircleCI
			- test_env: can be staging or production (for testing only, I used the site https://www.demoblaze.com/ for production)
			- type_testing: can be 1 of those tags above, for example: UI, positive etc
  - Please disregard the .github\workflows since it's used for Github Actions, which the project does not use it
- For testing only, I uploaded .env to easily run locally, but I already included .env in gitignore, since uploading .env to git is not supposed to do in a practical project
- The 3 browsers supported to run: Chrome, Firefox, Webkit (I already configured to run 3 browsers in serial instead of parallel, this is because the test to add product in cart and check the cart would be messy if running those 3 browsers in parallel)
- If npx playwright show-report is using a duplicated port, just add --port 9333 to the end to specify the port specifically
