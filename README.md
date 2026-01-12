# Cypress Automation Framework

Comprehensive test automation framework built with Cypress and JavaScript designed to simplify and streamline your UI and API tests. This framework demonstrates best practices for writing UI and API tests, implementing CI/CD pipelines with GitHub Actions, and managing tests across different environments. 🚀

<img src="data:image/jpeg;base64,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" width="200" height="200">

## :rocket: Quick Start

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/) (v14 or higher)
2. Install [Git](https://git-scm.com/download)
3. Install a code editor (e.g., [VS Code](https://code.visualstudio.com/download))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cypress-automation-framework
```

2. Install dependencies:
```bash
npm ci
```

3. Verify Cypress installation:
```bash
npx cypress --version
```

## :pushpin: Project Structure

```
cypress-automation-framework/
├── cypress/
│   ├── e2e/
│   │   ├── 1_ui/                 # UI test specifications
│   │   │   ├── 1_registerNewUser.spec.cy.js
│   │   │   ├── 2_loginUser.spec.cy.js
│   │   │   ├── 3_createNewBankAccount.spec.cy.js
│   │   │   ├── 4_transferFunds.spec.cy.js
│   │   │   └── 5_requestLoan.spec.cy.js
│   │   └── 2_api/                # API test specifications
│   │       ├── 1_loginUserAPI.spec.cy.js
│   │       ├── 2_accountDetailsAPI.spec.cy.js
│   │       ├── 3_createNewBankAccountAPI.spec.cy.js
│   │       ├── 4_requestLoanApi.spec.cy.js
│   │       └── 5_transferFundsApi.spec.cy.js
│   ├── fixtures/                 # Test data files
│   │   ├── testData.json
│   │   ├── accountDetailsUI.json
│   │   └── accountDetailsBackend.json
│   ├── support/
│   │   ├── commands.js           # Custom Cypress commands
│   │   ├── e2e.js               # Global support file
│   │   ├── api/
│   │   │   └── requestHelper.js # API request utilities
│   │   ├── constants/
│   │   │   ├── api/
│   │   │   │   ├── responseConstants.js
│   │   │   │   └── urlConstants.js
│   │   │   └── ui/
│   │   │       ├── appConstants.js
│   │   │       └── urlConstants.js
│   │   └── pages/               # Page Object Model classes
│   │       ├── basePage.js
│   │       ├── indexPage.js
│   │       ├── openAccountPage.js
│   │       ├── overviewPage.js
│   │       ├── registerUserPage.js
│   │       ├── requestLoanPage.js
│   │       └── transferFundsPage.js
│   └── reports/                # Test execution reports
│       ├── execution-report.html
│       └── execution-report.json
├── .github/
│   └── workflows/
│       └── regression-tests.yml # GitHub Actions CI/CD pipeline
├── cypress.config.js           # Cypress configuration
├── package.json               # Project dependencies
└── README.md
```

## :pushpin: Running Tests

### Run All Regression Tests

```bash
npm run regression-tests
```

This command runs all UI and API tests with Chrome browser.

### Run UI Tests Only

```bash
npm run ui-tests
```

This runs all tests in the `cypress/e2e/1_ui/` directory.

### Run API Tests Only

```bash
npm run api-tests
```

This runs all tests in the `cypress/e2e/2_api/` directory.

### Run Tests with Cypress UI

```bash
npx cypress open
```

Opens the Cypress Test Runner UI where you can:
- Select and run individual tests
- Watch tests run in real-time
- Debug tests with developer tools
- View test failures and errors

### Run Specific Test File

```bash
npx cypress run --spec cypress/e2e/1_ui/1_registerNewUser.spec.cy.js
```

## :pushpin: Configuration

Edit `cypress.config.js` to customize:

- **Base URL**: Default is set to `https://parabank.parasoft.com/parabank`
- **Browsers**: Configure supported browsers (chrome, firefox, edge, electron)
- **Timeouts**: Adjust command and test timeouts
- **Viewport**: Set default screen resolution for tests
- **Video Recording**: Enable/disable video capture
- **Screenshots**: Configure screenshot behavior for passed/failed tests

### Environment Variables

Tests use the following environment variable:

```bash
CYPRESS_BASE_URL=https://parabank.parasoft.com/parabank
```

You can override this when running tests:

```bash
CYPRESS_BASE_URL=http://localhost:3000 npm run regression-tests
```

## :rocket: Key Features

:point_right: **UI Test Automation** - Comprehensive test coverage for user interface interactions

:point_right: **API Test Automation** - REST API testing with response validation

:point_right: **Page Object Model (POM)** - Maintainable and scalable test structure

:point_right: **Custom Commands** - Reusable Cypress commands for common actions

:point_right: **Test Data Management** - Centralized fixture and constant files for test data

:point_right: **CI/CD Integration** - GitHub Actions workflow for automated test execution

:point_right: **Manual Workflow Trigger** - Run tests manually from GitHub Actions if needed

:point_right: **Test Reports** - HTML and JSON test execution reports with detailed results

:point_right: **Multiple Environments** - Easy configuration for different test environments

:point_right: **Request Helpers** - Centralized API request utilities for consistent API testing

## :pushpin: CI/CD Pipeline (GitHub Actions)

The framework includes automated test execution through GitHub Actions:

### Automatic Triggers
- Tests run automatically on `push` to `main` or `develop` branches

### Manual Trigger
- Tests can be triggered manually from the GitHub Actions tab by clicking "Run workflow"

### Pipeline Stages
1. Checkout code
2. Setup Node.js v21
3. Install dependencies
4. Run regression tests
5. Upload test reports (HTML)
6. Upload JSON output files

Test reports are retained for 30 days and available as artifacts.

## :pushpin: Test Data & Fixtures

Test data is managed through JSON fixture files:

- **testData.json** - General test data for UI and API tests
- **accountDetailsUI.json** - UI-specific account details (generated during tests)
- **accountDetailsBackend.json** - Backend API response data (generated during tests)

Fixture files can be loaded in tests using:

```javascript
cy.fixture('testData.json').then(testData => {
  // Use test data
});
```

## :pushpin: API Testing

API tests use the request helper utility for making HTTP requests:

- POST requests for login and account creation
- GET requests for account details and verification
- Error response validation
- Response schema validation

All API endpoints are configured in `support/constants/api/urlConstants.js`

## :pushpin: Reporting

### HTML Reports

After test execution, detailed HTML reports are generated in `cypress/reports/execution-report.html`

### JSON Reports

Machine-readable JSON reports are generated in `cypress/reports/execution-report.json` for integration with CI/CD tools

### Artifact Upload

GitHub Actions automatically uploads:
- HTML test reports
- JSON output files (account details from tests)

These are available as workflow artifacts for 30 days.

## :pushpin: Troubleshooting

### Tests Failing Locally?

1. Clear node_modules and reinstall: `rm -rf node_modules && npm ci`
2. Clear Cypress cache: `npx cypress cache clear`
3. Check that the application is running and accessible
4. Verify CYPRESS_BASE_URL environment variable

### Chrome Browser Not Found?

Ensure Chrome is installed or use Firefox:
```bash
npx cypress run --browser firefox
```

### Port Already in Use?

Change the port in `cypress.config.js` or kill the process using the port

## :pushpin: Best Practices

:check: Use Page Object Model for UI tests to keep selectors centralized

:check: Use descriptive test names that explain what is being tested

:check: Keep tests independent and avoid test dependencies

:check: Use appropriate waits and avoid hard `cy.wait()` when possible

:check: Validate both positive and negative scenarios

:check: Keep test data in fixtures, not hardcoded in tests

:check: Use custom commands for repeated actions

:check: Review test reports to understand failures

## Authors

<a href="https://github.com/kamaldhingra"><img align="center" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="kamaldhingra" height="40" width="40" /></a>
[@kamaldhingra](https://github.com/kamaldhingra)

## About Me

I'm a QA Automation Architect trying to help the community with driving quality with Innovation across Web, Mobile, API & IoT Platforms


## Connect With Me

Connect with me over LinkedIn if you need any help or you want to provide any feedback...

<a href="https://www.linkedin.com/in/kamaldhingra21/"><img align="center" src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" alt="kamaldhingra" height="35"/></a>

## License

ISC
