import apiUrlConstants from "../../support/constants/api/urlConstants";
import responseText from "../../support/constants/api/responseConstants";
import RequestHelper from "../../support/api/requestHelper";
const requestHelperObject = new RequestHelper();
const outputDataAccountDetailsFileName = Cypress.config("outputFileNameAPI");
describe("Create New Bank Account API Test", () => {
  before(() => {
    cy.fixture(outputDataAccountDetailsFileName).as("testData");
  });

  it("Should create a new bank account using API", () => {
    cy.get("@testData").then(($testData) => {
      const customerId = $testData.customerDetails.id;
      const checkingAccountId = $testData.checkingAccount.accountNumber;
      const checkingAccountBalance = $testData.checkingAccount.accountBalance;
      const bankTypecodeSavings = 1;
      requestHelperObject.callCreateAccountAPI(customerId, bankTypecodeSavings, checkingAccountId).then((response) => {
        cy.log(
          "Create New Bank Account API Response:",
          JSON.stringify(response)
        );
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.SAVINGS);
        const savingAccountId = response.body.id;
        cy.log("New Saving Account ID:", savingAccountId);
        cy.wrap(savingAccountId).as("newSavingAccountId");
      });
      cy.get("@newSavingAccountId").then(($newSavingAccountId) => {
       requestHelperObject.callGetAccountDetailAPI($newSavingAccountId).then((accountResponse) => {
          cy.log(
            "New Saving Account Details API Response:",
            JSON.stringify(accountResponse)
          );
          expect(accountResponse.status).to.eq(200);
          expect(accountResponse.body)
            .to.have.property("id")
            .that.equals($newSavingAccountId);
          expect(accountResponse.body)
            .to.have.property("type")
            .that.equals(responseText.ACCOUNT_TYPES.SAVINGS);
          cy.fixture("testData").then(($defaultData) => {
            expect(accountResponse.body)
              .to.have.property("balance")
              .that.equals($defaultData.accoountDefaultBalance.savings);
          });
          const savingAccountDetails = {
            savingAccount: {
              accountNumber: $newSavingAccountId,
              accountBalance: parseFloat(accountResponse.body.balance),
            },
          };

          requestHelperObject.callGetAccountDetailAPI(checkingAccountId).then((checkingAccountResponse) => {
            cy.log(
              "Checking Account Details API Response:",
              JSON.stringify(checkingAccountResponse)
            );
            expect(checkingAccountResponse.status).to.eq(200);
            expect(checkingAccountResponse.body)
              .to.have.property("id")
              .that.equals(checkingAccountId);
            expect(checkingAccountResponse.body)
              .to.have.property("type")
              .that.equals(responseText.ACCOUNT_TYPES.CHECKING);
            const updatedCheckingBalance = checkingAccountBalance - accountResponse.body.balance;
            expect(checkingAccountResponse.body)
                .to.have.property("balance")
                .that.equals(updatedCheckingBalance);
            const checkingAccountDetails = {
              checkingAccount: {
                accountNumber: checkingAccountId,
                accountBalance: parseFloat(
                  checkingAccountResponse.body.balance
                ),
              },
            };
            cy.updateFixture(
              outputDataAccountDetailsFileName,
              checkingAccountDetails
            );
          });

          cy.updateFixture(outputDataAccountDetailsFileName, savingAccountDetails);
        });
      });
    });
  });
});
