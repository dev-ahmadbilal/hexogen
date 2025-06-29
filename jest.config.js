module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: [
    'bin/**/*.js',
    '!**/node_modules/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 30000, // 30 seconds timeout for template generation tests
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test-output/'
  ],
  clearMocks: true,
  restoreMocks: true
}; 