import BasePage from "./basePage";

export default class OpenAccountPage extends BasePage {
  
  // ===== Page Selectors =====
  accountTypeDropdown = "#type";
  esixtingAccountDropdown = "#fromAccountId";
  openNewAccountButton = 'input[value="Open New Account"]';
  accountOPenedMessage = "div#openAccountResult h1";
  newAccountNumber = "#openAccountResult  a#newAccountId";

  /**
   * Open a new account with specified account type and existing account
   * @function openNewAccount
   * @description Selects account type and existing account from dropdowns, then clicks the open account button
   * @param {string} accountType - The type of account to open
   * @property {string} existingAccountNumber - The existing account number to link with the new account
   * @returns {void}
   */
  openNewAccount(accountType, existingAccountNumber) {
    cy.get(this.accountTypeDropdown).select(accountType);
    cy.get(this.esixtingAccountDropdown).select(existingAccountNumber);
    cy.get(this.openNewAccountButton).click();
  }

  /**
   * Retrieve the account opened success message
   * @function getAccountOpenedMessage
   * @description Gets the text of the account opened confirmation message displayed after successful account creation
   * @returns {Cypress.Chainable<string>} - Cypress chainable that resolves to the account opened message text
   */
  getAccountOpenedMessage() {
    return cy.get(this.accountOPenedMessage).invoke("text");
  }

  /**
   * Retrieve the newly created account number
   * @function getNewAccountNumber
   * @description Gets the newly created account number from the confirmation page and stores it as an alias
   * @returns {Cypress.Chainable} - Cypress chainable that resolves to the new account number
   */
  getNewAccountNumber() {
    cy.get(this.newAccountNumber).should('not.be.empty');
    cy.get(this.newAccountNumber).then((element) => {
        cy.wrap(element.text()).as("newAccountNumber");
    });
    return cy.get("@newAccountNumber");
  }
}
