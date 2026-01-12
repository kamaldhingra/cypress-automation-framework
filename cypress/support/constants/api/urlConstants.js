
const urlConstants = {
  cleanDBUrl: 'services/bank/cleanDB',
  initializeDBUrl: 'services/bank/initializeDB',
  loginApiUrl: 'services/bank/login',
  customerAllAccountsDetailApiUrl: 'services/bank/customers/<customerId>/accounts',
  accountDetailApiUrl: 'services/bank/accounts/<accountId>',
  createAccountApiUrl: 'services/bank/createAccount?customerId=<customerId>&newAccountType=<accountTypeCode>&fromAccountId=<fromAccountId>',
  transferFundsApiUrl: 'services/bank/transfer?fromAccountId=<fromAccountId>&toAccountId=<toAccountId>&amount=<amount>',
  requestLoanApiUrl: 'services/bank/requestLoan?customerId=<customerId>&fromAccountId=<fromAccountId>&amount=<loanAmount>&downPayment=<downPayment>'
};

export default urlConstants;