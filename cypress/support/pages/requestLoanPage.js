import BasePage from "./basePage";

export default class RequestLoanPage extends BasePage {
    pageHeading = 'div#requestLoanForm h1.title';
    loanAmountInput = '#amount';
    downPaymentInput = '#downPayment';
    fromAccountDropdown = '#fromAccountId';
    applyNowButton = 'input[value="Apply Now"]';
    loanApprovalMessage = '#loanStatus';
    newLoanAccountNumber = '#newAccountId';

    /**
     * Request a loan with the specified amount, down payment, and source account
     * @function requestLoan
     * @param {number|string} loanAmount - The loan amount to request
     * @param {number|string} downPayment - The down payment amount
     * @param {string} fromAccount - The account number to debit for the down payment
     * @returns {void}
     */
    requestLoan(loanAmount, downPayment, fromAccount) {
        cy.get(this.loanAmountInput).type(loanAmount);
        cy.get(this.downPaymentInput).type(downPayment);
        cy.get(this.fromAccountDropdown).select(fromAccount);
        cy.get(this.applyNowButton).click();
    }

    /**
     * Retrieve the loan approval status message
     * @function getLoanStatus
     * @returns {Cypress.Chainable<string>} - Cypress chainable that resolves to the loan status text
     */
    getLoanStatus() {
        return cy.get(this.loanApprovalMessage).invoke("text");
    }

    /**
     * Retrieve the newly created loan account number
     * @function getNewLoanAccountNumber
     * @returns {Cypress.Chainable<string>} - Cypress chainable that resolves to the new loan account number text
     */
    getNewLoanAccountNumber() {
        return cy.get(this.newLoanAccountNumber).invoke("text");
    }   

}