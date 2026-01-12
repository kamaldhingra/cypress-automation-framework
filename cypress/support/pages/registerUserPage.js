import pageText from "../constants/ui/appConstants";
export default class RegisterUserPage {
  
  // ===== Registration Page Selectors =====
  fistNameInput = '[id="customer.firstName"]';
  lastNameInput = '[id="customer.lastName"]';
  addressInput = '[id="customer.address.street"]';
  cityInput = '[id="customer.address.city"]';
  stateInput = '[id="customer.address.state"]';
  zipCodeInput = '[id="customer.address.zipCode"]';
  phoneInput = '[id="customer.phoneNumber"]';
  ssnInput = '[id="customer.ssn"]';
  usernameInput = '[id="customer.username"]';
  passwordInput = '[id="customer.password"]';
  confirmPasswordInput = '#repeatedPassword';
  registerButton = 'input[value="Register"]';
  welcomeMessage = "h1.title";

  /**
   * Register a new user with the provided user details
   * @function registerNewUser
   * @description Fills in all registration form fields and clicks the register button
   * @param {Object} userDetails - Object containing user registration information
   * @property {string} firstname - User's first name
   * @property {string} lastname - User's last name
   * @property {string} address - User's street address
   * @property {string} city - User's city
   * @property {string} state - User's state
   * @property {string} zip - User's zip code
   * @property {string} phone - User's phone number
   * @property {string} ssn - User's social security number
   * @property {string} username - Desired username for login
   * @property {string} password - Desired password for login
   * @returns {void}
   */
  registerNewUser(userDetails) {
    cy.get(this.fistNameInput).type(userDetails.firstname);
    cy.get(this.lastNameInput).type(userDetails.lastname);
    cy.get(this.addressInput).type(userDetails.address);
    cy.get(this.cityInput).type(userDetails.city);
    cy.get(this.stateInput).type(userDetails.state);
    cy.get(this.zipCodeInput).type(userDetails.zip);
    cy.get(this.phoneInput).type(userDetails.phone);
    cy.get(this.ssnInput).type(userDetails.ssn);
    cy.get(this.usernameInput).type(userDetails.username);
    cy.get(this.passwordInput).type(userDetails.password);
    cy.get(this.confirmPasswordInput).type(userDetails.password);
    cy.get(this.registerButton).click();
  }

  /**
   * Retrieve the registration success welcome message
   * @function getRegistrationSuccess
   * @description Gets the welcome message displayed after successful user registration
   * @returns {Cypress.Chainable} - Cypress chainable that resolves to the welcome message element
   */
  getRegistrationSuccess() {
    return cy.get(this.welcomeMessage);
  }

  /**
   * Create a new user and verify successful registration
   * @function createNewUser
   * @description Registers a new user with provided details and verifies the welcome message contains the username
   * @param {Object} userDetails - Object containing user registration information
   * @returns {void}
   */
  createNewUser(userDetails) {
    this.registerNewUser(userDetails);
    this.getRegistrationSuccess().then((welcomeMessage) => {
      expect(welcomeMessage).to.contain(`${pageText.WELCOME_MESSAGE} ${userDetails.username}`);
    });
  }
}
