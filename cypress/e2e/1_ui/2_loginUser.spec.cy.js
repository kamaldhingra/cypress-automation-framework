/**
 * Test Suite: Sign In User Flow
 * Description: Verifies user login functionality and account overview page display
 * Tests user authentication and validates initial account data is correctly displayed
 */
import IndexPage from "../../support/pages/indexPage";
import OverviewPage from "../../support/pages/overviewPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import pageText from "../../support/constants/ui/appConstants";

const indexPage = new IndexPage();
const overviewPage = new OverviewPage();
const outputFilePath = `${Cypress.config("outputFilesPath")}/${Cypress.config("outputFileNameUI")}.json`;

describe("Sign In User Flow", () => {
  // Load test data fixture before all tests in this suite
  before(() => {
    cy.fixture("testData").as("testData");
    cy.visit(urlConstants.indexPageUrl);
  });

  it("Should register a new user successfully", () => {
    // Retrieve test data from fixture
    cy.get("@testData").then(($testData) => {
      const userDetails = $testData.userDetails;
      const accoountDefaultBalance = $testData.accoountDefaultBalance.checking;
      
      // Perform login with user credentials
      indexPage.loginToApplication(userDetails);
      
      // Verify welcome message contains user's full name
      overviewPage.getLoggedInUserWelcomeMessage().then((welcomeMessage) => {
        expect(welcomeMessage).to.contain(
          `${pageText.WELCOME_MESSAGE} ${userDetails.firstname} ${userDetails.lastname}`
        );
      });
      
      // Verify URL redirects to account overview page
      cy.url().should("include", urlConstants.overviewPageUrl);
      
      // Verify account overview page title is displayed
      cy.get(overviewPage.accountOverviewText).then((text) => {
        expect(text).to.contain(pageText.ACCOUNT_OVERVIEW);
      });
      
      // Verify accounts table has at least one account
      overviewPage
        .getAccountOverviewTableRows()
        .should("have.length.greaterThan", 0);
      
      // Extract first account number
      overviewPage.getAccountNumber(1).should("not.be.empty");
      overviewPage.getAccountNumber(1).then((accNumber) => {
        cy.wrap(accNumber).as("accountNumber");
      });
      
      // Extract and validate first account balance matches default balance
      overviewPage.getAccountBalance(1).then((accountBalance) => {
        expect(accountBalance).to.contain(accoountDefaultBalance);
        cy.wrap(accountBalance).as("accountBalance");
      });
      
      // Save account details to fixture file for use in other test suites
      cy.get("@accountNumber").then((accountNumber) => {
        cy.get("@accountBalance").then((accountBalance) => {
          cy.writeFile(outputFilePath, {
            checkingAccount: {
              accountNumber: accountNumber,
              accountBalance: parseFloat(accountBalance.replace('$', '')),
            },
          });
        });
      });
    });
  });
});
