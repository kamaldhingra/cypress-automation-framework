import apiUrlConstants from "../../support/constants/api/urlConstants";
import responseText from "../../support/constants/api/responseConstants";
import RequestHelper from "../../support/api/requestHelper";
const requestHelperObject = new RequestHelper();
const outputDataAccountDetailsFileName = Cypress.config("outputFileNameAPI");

describe("Request Loan API Test", () => {
  before(() => {
    cy.fixture(outputDataAccountDetailsFileName).as("testData");
  });

  it("Should request a loan using API", () => {
    cy.get("@testData").then(($testData) => {
      const customerId = $testData.customerDetails.id;
      const fromAccountId = $testData.checkingAccount.accountNumber;
      const checkingAccountBalance = $testData.checkingAccount.accountBalance;
      const savingAccountBalance = $testData.savingAccount.accountBalance;
      const loanRequestAmount = 100.0;
      const downPayment = 20.0;
      requestHelperObject.callRequestLoanAPI(customerId, fromAccountId, loanRequestAmount, downPayment) .then((response) => {
        cy.log("Request Loan API Response:", JSON.stringify(response));
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("accountId");
        expect(response.body).to.have.property("approved").that.equals(true);
        
        expect(Math.abs(response.body.responseDate - (new Date().getTime()))).to.be.lessThan(5 * 1000);
        const newLoanAccountNumber = response.body.accountId;
        
        cy.wrap(newLoanAccountNumber).as("newLoanAccountNumber");
      });

      requestHelperObject.callGetAllAccountsAPI(customerId).then((response) => {
            cy.log("Account Details API Response:", JSON.stringify(response));
            const updatedCheckingAccountBalance = checkingAccountBalance - downPayment;
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.CHECKING);
            expect(response.body[0]).to.have.property("balance").that.equals(updatedCheckingAccountBalance);
            expect(response.body[1]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.SAVINGS);
            expect(response.body[1]).to.have.property("balance").that.equals(savingAccountBalance);
            expect(response.body[2]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.LOAN);
            expect(response.body[2]).to.have.property("balance").that.equals(loanRequestAmount);
            const checkingAccount = {
                checkingAccount: {
                    accountNumber: response.body[0].id,
                    accountBalance: parseFloat(response.body[0].balance),
                },
            };
            const savingAccount = {
                savingAccount: {
                    accountNumber: response.body[1].id,
                    accountBalance: parseFloat(response.body[1].balance),
                },
            };
            const loanAccount = {
                loanAccount: {
                    accountNumber: response.body[2].id,
                    accountBalance: parseFloat(response.body[2].balance),
                },
            };
            cy.updateFixture(outputDataAccountDetailsFileName, checkingAccount);
            cy.updateFixture(outputDataAccountDetailsFileName, savingAccount);       
            cy.updateFixture(outputDataAccountDetailsFileName, loanAccount);       
        });
    });
  });
});