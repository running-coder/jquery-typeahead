/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: "http://localhost"
    },
    setupFiles: [
        "<rootDir>/test/jestSetupFile.js"
    ]
};

module.exports = config;
