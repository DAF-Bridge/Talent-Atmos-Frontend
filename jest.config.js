// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // transform: {
    //   '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    // },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/', // Exclude node_modules from transformation (unless specific modules need it)
  ],
};