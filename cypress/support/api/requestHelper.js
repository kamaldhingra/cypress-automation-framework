import apiUrlConstants from "../constants/api/urlConstants";

/**
 * RequestHelper - Utility to perform backend API calls used by tests
 * Encapsulates Cypress cy.request calls for various test-supporting endpoints.
 */
export default class RequestHelper {

  /**
   * Call the backend endpoint to clean the database
   * @function callCleanDB
   * @description Sends a POST request to the clean database endpoint
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callCleanDB(){
    const cleanDBUrl = apiUrlConstants.cleanDBUrl;
    return cy.request({
            method: "POST",
            url: cleanDBUrl,
            headers: {
              Accept: "application/json",
            },
          });
  }

  /**
   * Call the backend endpoint to initialize the database
   * @function callInitializeDB
   * @description Sends a POST request to initialize the database with test data
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callInitializeDB(){
    const initializeDBUrl = apiUrlConstants.initializeDBUrl;
    return cy.request({
            method: "POST",
            url: initializeDBUrl,
            headers: {
              Accept: "application/json",
            },
          });
  }

  /**
   * Call the login API with provided credentials
   * @function callLoginAPI
   * @param {string} username - Username to authenticate
   * @param {string} password - Password to authenticate
   * @description Performs a GET request to the login API; does not fail test on non-2xx status
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callLoginAPI(username, password) {
    const loginApiUrl = `${apiUrlConstants.loginApiUrl}/${username}/${password}`;
    return cy.request({
      method: "GET",
      url: loginApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Get all accounts for a given customer
   * @function callGetAllAccountsAPI
   * @param {string|number} customerId - Customer identifier
   * @description Performs a GET request to fetch all account details for the customer
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callGetAllAccountsAPI(customerId) {
    const customerAllAccountsDetailApiUrl = apiUrlConstants.customerAllAccountsDetailApiUrl.replace(
      "<customerId>",
      customerId
    );
    return cy.request({
      method: "GET",
      url: customerAllAccountsDetailApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  }
  
  /**
   * Create a new account for a customer
   * @function callCreateAccountAPI
   * @param {string|number} customerId - Customer identifier
   * @param {string} accountTypeCode - Account type code to create (e.g., SAVINGS/CHECKING)
   * @param {string|number} fromAccountId - Existing account id to link or fund from
   * @description Sends a POST request to create an account for the given customer
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callCreateAccountAPI(customerId, accountTypeCode, fromAccountId) {
    const createAccountApiUrl = apiUrlConstants.createAccountApiUrl
      .replace("<customerId>", customerId)
      .replace("<accountTypeCode>", accountTypeCode)
      .replace("<fromAccountId>", fromAccountId);
    return cy.request({
      method: "POST",
      url: createAccountApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  }
  
  /**
   * Get account details for a specific account id
   * @function callGetAccountDetailAPI
   * @param {string|number} accountId - Account identifier
   * @description Performs a GET request to retrieve account details
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callGetAccountDetailAPI(accountId) {
    const accountDetailApiUrl = apiUrlConstants.accountDetailApiUrl.replace(
      "<accountId>",
      accountId
    );
    return cy.request({
      method: "GET",
      url: accountDetailApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Transfer funds between accounts via API
   * @function callTransferFundsAPI
   * @param {string|number} fromAccountId - Source account id
   * @param {string|number} toAccountId - Destination account id
   * @param {number|string} amount - Amount to transfer
   * @description Sends a POST request to trigger a funds transfer
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callTransferFundsAPI(fromAccountId, toAccountId, amount) {
    const transferFundsApiUrl = apiUrlConstants.transferFundsApiUrl
      .replace("<fromAccountId>", fromAccountId)
      .replace("<toAccountId>", toAccountId)
      .replace("<amount>", amount);
    return cy.request({
      method: "POST",
      url: transferFundsApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  } 

  /**
   * Request a loan via API
   * @function callRequestLoanAPI
   * @param {string|number} customerId - Customer identifier requesting the loan
   * @param {string|number} fromAccountId - Account id to debit down payment from
   * @param {number|string} loanRequestAmount - Requested loan amount
   * @param {number|string} downPayment - Down payment amount
   * @description Sends a POST request to create a loan request
   * @returns {Cypress.Chainable} - Cypress chainable resolving to the request response
   */
  callRequestLoanAPI(customerId, fromAccountId, loanRequestAmount, downPayment) {
    const requestLoanApiUrl = apiUrlConstants.requestLoanApiUrl
      .replace("<customerId>", customerId)
      .replace("<fromAccountId>", fromAccountId)
      .replace("<loanAmount>", loanRequestAmount)
      .replace("<downPayment>", downPayment);
    return cy.request({
      method: "POST",
      url: requestLoanApiUrl,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    });
  }
}