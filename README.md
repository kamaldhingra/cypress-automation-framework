# Cypress Automation Framework

Comprehensive test automation framework built with Cypress and JavaScript designed to simplify and streamline your UI and API tests. This framework demonstrates best practices for writing UI and API tests, implementing CI/CD pipelines with GitHub Actions, and managing tests across different environments. 🚀

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cypress_logo.svg/320px-Cypress_logo.svg.png" width="200" height="200">

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
