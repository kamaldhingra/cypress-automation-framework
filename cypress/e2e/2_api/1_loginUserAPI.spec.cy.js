import RegisterUserPage from "../../support/pages/registerUserPage";
import urlConstants from "../../support/constants/ui/urlConstants";
import RequestHelper from "../../support/api/requestHelper";
const requestHelperObject = new RequestHelper();

describe("Login API Test", () => {
  before(() => {
    cy.fixture("testData").as("testData");
    cy.task("fileExists", `${Cypress.config("outputFilesPath")}/${Cypress.config("outputFileNameUI")}.json`).then(
      (exists) => {
        if (exists) {
          cy.log("Account details file exists, resetting database.");
          requestHelperObject.callCleanDB().then((response) => {
            expect(response.status).to.eq(204);
          });
          requestHelperObject.callInitializeDB().then((response) => {
            expect(response.status).to.eq(204);
          });
        } else {
          cy.log("No account details found, proceeding with user registration.");
        }
          const registerUserPage = new RegisterUserPage();
          cy.get("@testData").then((testData) => {
            const userDetails = testData.userDetails;
            cy.visit(urlConstants.registerPageUrl);
            registerUserPage.createNewUser(userDetails);
          });
      }
    );
  });
  it("Should login successfully with valid credentials", () => {
    cy.get("@testData").then((testData) => {
      const userDetails = testData.userDetails;
      requestHelperObject.callLoginAPI(userDetails.username, userDetails.password).then((response) => {
        cy.log("Login API Response:", JSON.stringify(response));
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        cy.writeFile(`${Cypress.config("outputFilesPath")}/${Cypress.config("outputFileNameAPI")}.json`, {
          customerDetails: {
            id: response.body.id,
          },
        });
      });
    });
  });
});
