// Import base config from jest-present-angular
const jestPreset = require('jest-preset-angular/jest-preset');

const { globals } = jestPreset;
const tsjest = globals['ts-jest'];

// Set the correct path to the spect ts-config file.
// The default for the jest-preset-angular package points to an incorrect path,
// <rootDir/src/tsconfig.spec.js
const tsjestOverrides = {
  ...tsjest,
  tsConfig: '<rootDir>/tsconfig.spec.json'
};

const globalOverrides = {
  ...globals,
  'ts-jest': { ...tsjestOverrides }
};

// Make sure to add in the required preset and setup file entries
module.exports = {
  ...jestPreset,
  globals: { ...globalOverrides },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  roots: ['<rootDir>/src/app']
};