/**
 * Test Suite: Register New User Flow
 * Description: Verifies user registration functionality
 * Tests that new users can successfully register and receive confirmation
 */
import RegisterUserPage from "../../support/pages/registerUserPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import pageText from "../../support/constants/ui/appConstants";

const registerUserPage = new RegisterUserPage();

describe("Register New User Flow", () => {
  // Load test data fixture before all tests in this suite
  before(() => {
    cy.fixture("testData").as("testData");
    cy.visit(urlConstants.registerPageUrl);
  });

  it("Should register a new user successfully", () => {
    cy.get("@testData").then(($testData) => {
      const userDetails = $testData.userDetails;
      // Submit registration form
      registerUserPage.registerNewUser(userDetails);
      
      // Verify success message displays with username
      registerUserPage.getRegistrationSuccess().then((welcomeMessage) => {
        expect(welcomeMessage).to.contain(`${pageText.WELCOME_MESSAGE} ${userDetails.username}`);
      });
    });
  });
});
