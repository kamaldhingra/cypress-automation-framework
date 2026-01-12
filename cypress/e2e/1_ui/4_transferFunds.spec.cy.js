/**
 * Test Suite: Create New Bank Account
 * Description: Verifies user ability to transfer funds between accounts
 * Tests fund transfer process and validates account balances are correctly updated after transfer
 */
import IndexPage from "../../support/pages/indexPage";
import OverviewPage from "../../support/pages/overviewPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import TransferFundsPage from "../../support/pages/transferFundsPage";
import pageText from "../../support/constants/ui/appConstants";

const indexPage = new IndexPage();
const transferFundsPage = new TransferFundsPage();
const overviewPage = new OverviewPage();
const amountToTransfer = 100.00;
const testDataAccountDetailsFileName = Cypress.config("outputFileNameUI");

describe("Create New Bank Account", () => {
  // Login before each test in this suite
  before(() => {
    cy.fixture("testdata").then(($testData) => {
    cy.visit(urlConstants.indexPageUrl);
    // Authenticate with test user credentials
    indexPage.loginToApplication({
      username: $testData.userDetails.username,
      password: $testData.userDetails.password,
    });
    });
  });

  it("User should be able to create a new bank account ", () => {
    // Retrieve account details from fixture
    cy.fixture(testDataAccountDetailsFileName).then(($testData) => {
      const checkingAccountNumber = $testData.checkingAccount.accountNumber;
      const checkingAccountBalance = $testData.checkingAccount.accountBalance;
      const savingsAccountNumber  = $testData.savingAccount.accountNumber;
      const savingsAccountBalance = $testData.savingAccount.accountBalance;
      
      // Navigate to transfer funds page
      indexPage.navigateToTransferFunds();
      
      // Perform fund transfer from checking to savings account
      transferFundsPage.transferFunds(
        checkingAccountNumber,
        savingsAccountNumber,
        amountToTransfer
      );
      
      // Verify transfer success message
      transferFundsPage.getTranferCompleteSuccessMessage().then((message) => {
        expect(message).to.contain(pageText.TRANSFER_COMPLETED_SUCCESS);
      });
      
      // Verify transfer amount matches what was transferred
      transferFundsPage.getTransferedAmount().should("eq", `$${amountToTransfer.toFixed(2)}`);
      
      // Verify source account is correct
      transferFundsPage.getTransferedFromAccount().should("eq", checkingAccountNumber);
      
      // Verify destination account is correct
      transferFundsPage.getTransferedToAccount().should("eq", savingsAccountNumber);
  
      // Navigate to account overview to verify balances updated
      overviewPage.navigateToAccountOverview();
      
      // Calculate expected checking account balance after transfer
      const updatedCheckingBalance =
        checkingAccountBalance - amountToTransfer;
      
      // Calculate expected savings account balance after transfer
      const updatedSavingsBalance =
        savingsAccountBalance + amountToTransfer;
      
      // Verify checking account number appears in row 1
      overviewPage.getAccountNumber(1).should("eq", checkingAccountNumber);
      
      // Verify checking account balance decreased by transfer amount
      overviewPage.getAccountBalance(1).should("eq", `$${updatedCheckingBalance.toFixed(2)}`);
      
      // Verify savings account number appears in row 2
      overviewPage.getAccountNumber(2).should("eq", savingsAccountNumber);
      
      // Verify savings account balance increased by transfer amount
      overviewPage.getAccountBalance(2).should("eq", `$${updatedSavingsBalance.toFixed(2)}`);
       
      // Update fixture with new savings account balance
      const savingAccountDetails =  {
        savingAccount:{
          accountNumber: savingsAccountNumber,
          accountBalance: updatedSavingsBalance
        }
      };
      
      // Update fixture with new checking account balance
      const checkingAccountDetails = {
        checkingAccount: {
          accountNumber: checkingAccountNumber,
          accountBalance: updatedCheckingBalance
        },
      };
      
      // Save updated balances to fixture for use in other test suites
      cy.updateFixture(testDataAccountDetailsFileName, savingAccountDetails);
      cy.updateFixture(testDataAccountDetailsFileName, checkingAccountDetails);
    });
  });
});
