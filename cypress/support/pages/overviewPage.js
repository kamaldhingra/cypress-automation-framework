/**
 * OverviewPage class - Handles account overview page interactions
 * Extends BasePage to inherit common page navigation methods
 * Contains selectors and methods specific to viewing account information and balances
 */
import BasePage from "./basePage";

export default class OverviewPage extends BasePage {
  
  // ===== Account Overview Page Selectors =====
  accountOverviewText = "h1.title";
  allAccountsTable = "table#accountTable";
  tableRows = "tbody tr";

  /**
   * Retrieve all account overview table rows
   * @function getAccountOverviewTableRows
   * @description Gets all rows from the accounts table
   * @returns {Cypress.Chainable} - Cypress chainable that resolves to all table rows
   */
  getAccountOverviewTableRows() {
    return cy.get(this.allAccountsTable).find(this.tableRows);
  }

  /**
   * Retrieve the account number from a specific row in the overview table
   * @function getAccountNumber
   * @description Gets the account number (first column) from the specified row in the accounts table
   * @param {number} rowCount - The row number to retrieve the account number from (1-indexed)
   * @returns {Cypress.Chainable<string>} - Cypress chainable that resolves to the account number text
   */
  getAccountNumber(rowCount) {
    return this.getAccountOverviewTableRows()
      .eq(rowCount - 1)
      .find("td")
      .first()
      .find("a").invoke("text");
  }

  /**
   * Retrieve the account balance from a specific row in the overview table
   * @function getAccountBalance
   * @description Gets the account balance (second column) from the specified row in the accounts table
   * @param {number} rowCount - The row number to retrieve the balance from (1-indexed)
   * @returns {Cypress.Chainable<string>} - Cypress chainable that resolves to the account balance text
   */
  getAccountBalance(rowCount) {
    return this.getAccountOverviewTableRows()
      .eq(rowCount - 1)
      .find("td")
      .eq(1).invoke("text");
  }
}