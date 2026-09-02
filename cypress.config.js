const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    env: {
      email: 'svitlana.elias@gmail.com',
      password: 'j!QiDZFMVu2!w',
    },
    setupNodeEvents(on, config) {},
  },
});
