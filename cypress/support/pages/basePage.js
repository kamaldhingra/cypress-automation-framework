/**
 * BasePage class - Contains common page elements and navigation methods
 * Serves as a base class for all page objects in the application
 * Provides methods to navigate between different sections of the application
 */
export default class BasePage {

    // ===== Left Navigation Link Selectors =====
    // CSS selectors for navigation links in the left sidebar menu
    openNewAccountleftNavLink = 'a[href="openaccount.htm"]';
    accountOverviewleftNavLink = 'a[href="overview.htm"]';
    transferFundsleftNavLink = 'a[href="transfer.htm"]';
    billPayleftNavLink = 'a[href="billpay.htm"]';
    findTransactionsleftNavLink = 'a[href="findtrans.htm"]';
    updateContactInfolink = 'a[href="updateprofile.htm"]';
    requestLoanleftNavLink = 'a[href="requestloan.htm"]';
    logOutlink = 'a[href="logout.htm"]';
    
    // ===== User Information Selectors =====
    // CSS selector for the logged-in user welcome message and name display
    loggedInUserWelcomeMsgAndName = '#leftPanel p.smallText';

    /**
     * Navigate to the Account Overview page
     * Clicks on the Account Overview link in the left navigation menu
     */
    navigateToAccountOverview() {
        cy.get(this.accountOverviewleftNavLink).click();
    }

    /**
     * Navigate to the Open New Account page
     * Clicks on the Open New Account link in the left navigation menu
     */
    navigateToOpenNewAccount() {
        cy.get(this.openNewAccountleftNavLink).click();
    }

    /**
     * Navigate to the Transfer Funds page
     * Clicks on the Transfer Funds link in the left navigation menu
     */
    navigateToTransferFunds() {
        cy.get(this.transferFundsleftNavLink).click();
    }

    /**
     * Navigate to the Loan Request page
     * Clicks on the Request Loan link in the left navigation menu
     */
    navigateToLoanRequest() {
        cy.get(this.requestLoanleftNavLink).click();
    }

    /**
     * Logout from the application
     * Clicks on the Logout link in the left navigation menu to end the user session
     */
    logoutFromApplication() {
        cy.get(this.logOutlink).click();
    }
    
    /**
     * Retrieve the logged-in user's welcome message and name
     * @returns {Cypress.Chainable} - Cypress chainable that resolves to the welcome message text
     */
    getLoggedInUserWelcomeMessage() {
        return cy.get(this.loggedInUserWelcomeMsgAndName).invoke("text");
    }

}

