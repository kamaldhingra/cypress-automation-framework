
import BasePage from "./basePage.js";
export default class IndexPage extends BasePage {
  
  // ===== Login Form Selectors =====
  userNameInput = '[name="username"]';
  passwordInput = '[name="password"]';
  loginButton = 'input[value="Log In"]';
 
  /**
   * Login to the application with provided credentials
   * @function loginToApplication
   * @description Fills in username and password fields, then clicks the login button
   * @param {Object} userDetails - Object containing user login credentials
   * @property {string} userDetails.username - The username to enter in the username field
   * @property {string} userDetails.password - The password to enter in the password field
   * @returns {void}
   */
  loginToApplication(userDetails) {
    cy.get(this.userNameInput).type(userDetails.username);
    cy.get(this.passwordInput).type(userDetails.password);
    cy.get(this.loginButton).click();
  }
}
