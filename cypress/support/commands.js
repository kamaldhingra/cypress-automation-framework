/**
 * Overwrite the default Cypress log command to handle headless and headed modes differently
 * In headless mode: logs are sent to test context and task handler
 * In headed mode: logs are printed to console
 */
Cypress.Commands.overwrite('log', (log, ...args) => {
  if (Cypress.browser.isHeadless) {
    // Add log message to test context for better reporting
    cy.addTestContext(...args);
    return cy.task('log', args, { log: false }).then(() => log(...args));
  }
  console.log(...args);
  return log(...args);
});

/**
 * Custom Cypress command to update fixture data by merging with new values
 * @param {string} file - The fixture file name (without .json extension)
 * @param {object} newData - Object containing new/updated data to merge with existing fixture
 */
Cypress.Commands.add("updateFixture", (file, newData) => {
  cy.readFile(`${Cypress.config("outputFilesPath")}/${file}.json`).then((data) => {
    const updated = { ...data, ...newData };
    cy.writeFile(`${Cypress.config("outputFilesPath")}/${file}.json`, updated);
  });
});