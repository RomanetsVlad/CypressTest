const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1040,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    cpecPattern: 'cypress/e2e/*.js'
  },
});