
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is present
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Use one worker on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: 'html',

  // Shared settings
  use: {
    // baseURL: 'http://localhost:3000',

    // Collect trace when retrying a failed test
    trace: 'on-first-retry',
  },

  // Browser projects
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',

      },
      dependencies: ['setup'],


    },


    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Chrome
    // {
    //     name: 'Mobile Chrome',
    //     use: { ...devices['Pixel 5'] },
    // },

    // Mobile Safari
    // {
    //     name: 'Mobile Safari',
    //     use: { ...devices['iPhone 12'] },
    // },

    // Microsoft Edge
    // {
    //     name: 'Microsoft Edge',
    //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },

    // Google Chrome
    // {
    //     name: 'Google Chrome',
    //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Start your local development server if required
  // webServer: {
  //     command: 'npm run start',
  //     url: 'http://localhost:3000',
  //     reuseExistingServer: !process.env.CI,
  // },
})
