import apiUrlConstants from "../../support/constants/api/urlConstants";
import responseText from "../../support/constants/api/responseConstants";
import RequestHelper from "../../support/api/requestHelper";
const requestHelperObject = new RequestHelper();
const outputDataAccountDetailsFileName = Cypress.config("outputFileNameAPI");

describe("Transfer Funds API Test", () => {
    before(() => {
        cy.fixture(outputDataAccountDetailsFileName).as("testData");
    });

    it("Should transfer funds using API", () => {
        cy.get("@testData").then(($testData) => {
            const customerId = $testData.customerDetails.id;
            const fromAccountId = $testData.checkingAccount.accountNumber;
            const checkingAccountBalanceBeforeTransfer = $testData.checkingAccount.accountBalance;
            const savingAccountBalanceBeforeTransfer = $testData.savingAccount.accountBalance;
            cy.log("Transferring funds for Customer ID:", customerId);
            const toAccountId = $testData.savingAccount.accountNumber;
            const transferAmount = 100.00;
            requestHelperObject.callTransferFundsAPI(fromAccountId, toAccountId, transferAmount).then((response) => {
                cy.log("Transfer Funds API Response:", JSON.stringify(response));
                expect(response.status).to.eq(200);
                expect(response.body).eqls(`Successfully transferred $${transferAmount} from account #${fromAccountId} to account #${toAccountId}`);
            });

            requestHelperObject.callGetAllAccountsAPI(customerId).then((response) => {
            cy.log("Account Details API Response:", JSON.stringify(response));
            const updatedCheckingBalance = checkingAccountBalanceBeforeTransfer - transferAmount;
            const updatedSavingBalance = savingAccountBalanceBeforeTransfer + transferAmount;
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.CHECKING);
            expect(response.body[0]).to.have.property("balance").that.equals(updatedCheckingBalance);
            expect(response.body[1]).to.have.property("type").that.equals(responseText.ACCOUNT_TYPES.SAVINGS);
            expect(response.body[1]).to.have.property("balance").that.equals(updatedSavingBalance);
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
            cy.updateFixture(outputDataAccountDetailsFileName, checkingAccount);
            cy.updateFixture(outputDataAccountDetailsFileName, savingAccount);       

        });
    });
    });
});