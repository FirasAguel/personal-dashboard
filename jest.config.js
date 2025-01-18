const nextJest = require("next/jest");
const { defaults: tsjPreset } = require('ts-jest/presets');


const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Support absolute imports
  },
};

module.exports = createJestConfig(customJestConfig);
