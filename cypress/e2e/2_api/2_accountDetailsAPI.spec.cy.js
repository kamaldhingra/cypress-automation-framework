import apiUrlConstants from "../../support/constants/api/urlConstants";
import responseText from "../../support/constants/api/responseConstants";
import RequestHelper from "../../support/api/requestHelper";
const requestHelperObject = new RequestHelper();
const outputDataAccountDetailsFileName = Cypress.config("outputFileNameAPI");

describe("Account Details API Test", () => {
  before(() => {
    
    cy.fixture(outputDataAccountDetailsFileName).as("testData");
    });

  it("Should fetch account details using API", () => {
    cy.get("@testData").then(($testData) => {
      const customerId = $testData.customerDetails.id;
      cy.log("Fetching account details for Customer ID:", customerId);
      requestHelperObject.callGetAllAccountsAPI(customerId).then((response) =>{
        cy.log("Account Details API Response:", JSON.stringify(response));
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.equal(1);
        expect(response.body[0]).to.have.property("id");
        expect(response.body[0]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.CHECKING);
        cy.fixture("testData").then(($defaultData) => {
          expect(response.body[0]).to.have.property("balance").that.equals($defaultData.accoountDefaultBalance.checking);
        });
         const checkingAccount = { checkingAccount: {
              accountNumber: response.body[0].id,
              accountBalance: response.body[0].balance,
            }
        };
         cy.updateFixture(outputDataAccountDetailsFileName, checkingAccount);
      });
    });
  });
});