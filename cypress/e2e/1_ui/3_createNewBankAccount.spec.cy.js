/**
 * Test Suite: Create New Bank Account
 * Description: Verifies user ability to create new savings accounts
 * Tests account creation process and validates account balances are correctly updated
 */
import IndexPage from "../../support/pages/indexPage";
import OverviewPage from "../../support/pages/overviewPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import OpenAccountPage from "../../support/pages/openAccountPage";
import pageText from "../../support/constants/ui/appConstants";

const indexPage = new IndexPage();
const openAccountPage = new OpenAccountPage();
const overviewPage = new OverviewPage();
const testDataAccountDetailsFileName = Cypress.config("outputFileNameUI");

describe("Create New Bank Account", () => {
  // Login before each test in this suite
  before(() => {
    cy.fixture("testdata").as("testData");
    cy.get("@testData").then(($testData) => {
      cy.visit(urlConstants.indexPageUrl);
      // Authenticate with test user credentials
      indexPage.loginToApplication({
        username: $testData.userDetails.username,
        password: $testData.userDetails.password,
      });
    });
  });

 
  it("User should be able to create a new bank account ", () => {
    // Retrieve test data and account details from fixtures
    cy.get("@testData").then(($testData) => {
      cy.fixture(testDataAccountDetailsFileName).then(($testDataAccounts) => {
        const existingAccountNumber =
          $testDataAccounts.checkingAccount.accountNumber;
        
        // Navigate to open new account page
        indexPage.navigateToOpenNewAccount();
        
        // Create new savings account
        openAccountPage.openNewAccount(
          pageText.ACCOUNT_TYPES.SAVINGS,
          existingAccountNumber
        );
        
        // Verify account opened success message
        openAccountPage.getAccountOpenedMessage().then((message) => {
          expect(message).to.contain(pageText.ACCOUNT_OPENED_SUCCESS);
        });
        
        // Extract and store new account number
        openAccountPage.getNewAccountNumber().then((newAccountNumber) => {
          cy.log("New Account Number:", newAccountNumber);
          cy.wrap(newAccountNumber).as("savingsAccountNumber");
        });
        
        // Navigate to account overview to verify account creation
        openAccountPage.navigateToAccountOverview();
        
        // Verify accounts table has at least 2 accounts
        overviewPage
          .getAccountOverviewTableRows()
          .should("have.length.greaterThan", 1);
        
        // Verify new savings account appears in correct position with correct details
        cy.get("@savingsAccountNumber").then((savingsAccountNumber) => {
          // Verify new savings account number appears in row 2
          overviewPage.getAccountNumber(2).should("eq", savingsAccountNumber);
          
          // Verify new savings account balance matches default balance
          overviewPage
            .getAccountBalance(2)
            .should("eq", `$${$testData.accoountDefaultBalance.savings.toFixed(2)}`);
          
          // Verify existing checking account still in row 1
          overviewPage.getAccountNumber(1).should("eq", existingAccountNumber);
          
          // Calculate updated checking account balance after savings account creation
          const checkingAccountUpdatedBalance =
            $testDataAccounts.checkingAccount.accountBalance -
            $testData.accoountDefaultBalance.savings;
          
          // Verify checking account balance decreased by savings account amount
          overviewPage
            .getAccountBalance(1)
            .should("eq", `$${checkingAccountUpdatedBalance.toFixed(2)}`);
          
          // Update fixture with new savings account details
          const savingAccountDetails = {
            savingAccount: {
              accountNumber: savingsAccountNumber,
              accountBalance: $testData.accoountDefaultBalance.savings,
            },
          };
          
          // Update fixture with updated checking account balance
          const checkingAccountDetails = {
            checkingAccount: {
              accountNumber: existingAccountNumber,
              accountBalance: checkingAccountUpdatedBalance,
            },
          };
          
          // Save updated account details to fixture for use in other test suites
          cy.updateFixture(
            testDataAccountDetailsFileName,
            savingAccountDetails
          );
          cy.updateFixture(
            testDataAccountDetailsFileName,
            checkingAccountDetails
          );
        });
      });
    });
  });
});
