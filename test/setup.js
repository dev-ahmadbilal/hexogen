// Test setup file
process.env.NODE_ENV = 'test';

// Increase timeout for template generation tests
jest.setTimeout(30000);

// Mock console.log to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 