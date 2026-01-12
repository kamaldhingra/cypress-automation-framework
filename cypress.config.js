import { defineConfig } from 'cypress'
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin'
import { beforeRunHook } from 'cypress-mochawesome-reporter/lib';
import { json } from 'stream/consumers';
const fs = require('fs')

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: "https://parabank.parasoft.com/parabank",
    defaultCommandTimeout: 10000,
    retries: { runMode: 0, openMode: 0 },

    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on,config)

      on('before:run', async (details) => {
        console.log("Resetting the data...")
        await beforeRunHook(details);
        const cleanDBResponse = await fetch(
          `${config.baseUrl}/services/bank/cleanDB`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' } }
        )

        if (cleanDBResponse.status !== 204) {
          console.log(`Failed to clean DB. Status: ${cleanDBResponse.status}`)
        }

        const initDBResponse = await fetch(
          `${config.baseUrl}/services/bank/initializeDB`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' } }
        )

        if (initDBResponse.status !== 204) {
          console.log(`Failed to initialize DB. Status: ${initDBResponse.status}`)
        }
      })

      on('task', {
        log(args) {
          console.log(...args)
          return null
        },

        fileExists(filePath) {
          return fs.existsSync(filePath)
        }
      })

      return config
    },

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      json: true,
      html: true,
      saveJson: true,
      inlineAssets: true,
      charts: true,
      reportPageTitle: "Tests Execution Report",
      reportFilename: "execution-report",
      screenshots: true,
    },
    outputFilesPath: "cypress/fixtures",
    outputFileNameUI: "accountDetailsUI",
    outputFileNameAPI: "accountDetailsBackend",
  }
})
