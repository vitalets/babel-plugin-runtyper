/**
 * Sauce configuration docs:
 * https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
 * https://wiki.saucelabs.com/display/DOCS/Desired+Capabilities+Required+for+Selenium+and+Appium+Tests
 */

'use strict';

const baseFn = require('./karma.conf');

module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    // eslint-disable-next-line no-console
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  baseFn(config);

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  const customLaunchers = {
    edge_win10: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: '15.15063'
    },
    chrome_osx_beta: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: 'latest'
    },
    chrome_win7: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: 'latest'
    },
    firefox_osx: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'OS X 10.11',
      version: 'latest'
    },
    safari_osx: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '10.0'
    },
  };

  config.set({
    sauceLabs: {
      testName: 'runtyper',
      recordScreenshots: false,
      public: 'public'
    },
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120 * 1000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true
  });
};
