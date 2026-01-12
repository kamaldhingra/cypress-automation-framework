/**
 * Test Suite: Verify Request New Loan
 * Description: Verifies user ability to request new loans from checking account
 * Tests loan request process and validates loan account is created with correct balance
 */
import IndexPage from "../../support/pages/indexPage";
import OverviewPage from "../../support/pages/overviewPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import RequestLoanPage from "../../support/pages/requestLoanPage";
import pageText from "../../support/constants/ui/appConstants";

const indexPage = new IndexPage();
const requestLoanPage = new RequestLoanPage();
const overviewPage = new OverviewPage();
const testDataAccountDetailsFileName = Cypress.config("outputFileNameUI");
const loanAmountToRequest = 100.00;
const downPaymentAmount = 20.00;

describe("Verify Request New Loan", () => {
  // Login before each test in this suite
  before(() => {
    cy.fixture("testData").then(($testData) => {
    cy.visit(urlConstants.indexPageUrl);
    // Authenticate with test user credentials
    indexPage.loginToApplication({
      username: $testData.userDetails.username,
      password: $testData.userDetails.password,
    });
    });
  });

  it("User should be able to request a new Loan from Savings Account ", () => {
    // Retrieve current account details from fixture
    cy.fixture(testDataAccountDetailsFileName).then(($testData) => {
      const checkingAccountNumber = $testData.checkingAccount.accountNumber;
      const checkingAccountBalance = $testData.checkingAccount.accountBalance;
      
      // Navigate to loan request page
      indexPage.navigateToLoanRequest();
      
      // Request loan with specified amount and down payment
      requestLoanPage.requestLoan(loanAmountToRequest, downPaymentAmount, checkingAccountNumber);
      
      // Verify loan approval status
      requestLoanPage.getLoanStatus().should("contain", pageText.LOAN_STATUS_APPROVED);
      
      // Extract and store new loan account number
      requestLoanPage.getNewLoanAccountNumber().then((newLoanAccountNumber) => {
        cy.log("New Loan Account Number:", newLoanAccountNumber);
        cy.wrap(newLoanAccountNumber).as("newLoanAccountNumber");
      });

      // Navigate to account overview to verify loan account creation
      overviewPage.navigateToAccountOverview();
      
      // Calculate expected checking account balance after down payment
      const updatedCheckingBalance =
        checkingAccountBalance - downPaymentAmount;
      
      // Verify accounts table has more than 3 accounts
      overviewPage.getAccountOverviewTableRows().should("have.length.greaterThan", 3);
      
      // Verify checking account number appears in row 1
      overviewPage.getAccountNumber(1).should("eq", checkingAccountNumber);
      
      // Verify checking account balance decreased by down payment amount
      overviewPage.getAccountBalance(1).should("eq", `$${updatedCheckingBalance.toFixed(2)}`);

      // Verify new loan account appears in row 3 with correct details
      cy.get("@newLoanAccountNumber").then(($newLoanAccountNumber) => {
        // Verify loan account number appears in row 3
        overviewPage.getAccountNumber(3).should("eq", $newLoanAccountNumber);
        
        // Verify loan account balance equals requested loan amount
        overviewPage.getAccountBalance(3).should("eq", `$${loanAmountToRequest.toFixed(2)}`);
        
        // Create checking account details object with updated balance
        const checkingAccountDetails = {
          checkingAccount: {
            accountNumber: checkingAccountNumber,
            accountBalance: parseFloat(updatedCheckingBalance.toFixed(2)),
          },
        };
        
        // Create loan account details object
        const loanAccountDetails = {
          loanAccount: {
            accountNumber: $newLoanAccountNumber,
            accountBalance: parseFloat(loanAmountToRequest.toFixed(2)),
          },
        };
        
        // Save updated checking account balance to fixture
        cy.updateFixture(testDataAccountDetailsFileName, checkingAccountDetails);
        
        // Save new loan account details to fixture for use in other test suites
        cy.updateFixture(testDataAccountDetailsFileName, loanAccountDetails);
      });
    });
  });
});
