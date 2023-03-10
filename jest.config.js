/** @type {import('jest').Config} */
const config = {
    coverageDirectory: "./coverage/",
    collectCoverage: true,
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: "http://localhost"
    },
    setupFiles: [
        "<rootDir>/test/jestSetupFile.js"
    ]
};

module.exports = config;
