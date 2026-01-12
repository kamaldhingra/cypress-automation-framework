import BasePage from "./basePage";

export default class TransferFundsPage extends BasePage {
    pageHeading = 'h1.title';
    fromAccountDropdown = 'select#fromAccountId';
    toAccountDropdown = 'select#toAccountId';
    amountInput = '#amount';
    transferButton = 'input[value="Transfer"]';
    transferSuccessMessage = 'div#showResult h1';
    transferedAmount = 'span#amountResult';
    transferedAmountFromAccount = 'span#fromAccountIdResult';
    transferedAmountToAccount = 'span#toAccountIdResult';

    /**
     * Transfer funds between two accounts
     * @function transferFunds
     * @param {string} fromAccount - Account number to transfer funds from
     * @param {string} toAccount - Account number to transfer funds to
     * @param {number|string} amount - Amount to transfer
     * @returns {void}
     */
    transferFunds(fromAccount, toAccount, amount) {
        cy.get(this.fromAccountDropdown).select(fromAccount);
        cy.get(this.toAccountDropdown).select(toAccount);
        cy.get(this.amountInput).type(amount);
        cy.get(this.transferButton).click();
    }

    /**
     * Get the transfer completion success message text
     * @function getTranferCompleteSuccessMessage
     * @returns {Cypress.Chainable<string>} - Resolves to the success message text
     */
    getTranferCompleteSuccessMessage() {
        return cy.get(this.transferSuccessMessage).invoke("text");
    }
    
    /**
     * Get the transferred amount text
     * @function getTransferedAmount
     * @returns {Cypress.Chainable<string>} - Resolves to the transferred amount text
     */
    getTransferedAmount() {
        return cy.get(this.transferedAmount).invoke("text");
    }

    /**
     * Get the account from which the amount was transferred
     * @function getTransferedFromAccount
     * @returns {Cypress.Chainable<string>} - Resolves to the source account text
     */
    getTransferedFromAccount() {
        return cy.get(this.transferedAmountFromAccount).invoke("text");
    }

    /**
     * Get the account to which the amount was transferred
     * @function getTransferedToAccount
     * @returns {Cypress.Chainable<string>} - Resolves to the destination account text
     */
    getTransferedToAccount() {
        return cy.get(this.transferedAmountToAccount).invoke("text");
    }
}