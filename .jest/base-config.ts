import type { Config } from 'jest';

export const baseConfig: Config = {
  preset: 'ts-jest',
  rootDir: `..`,
  setupFiles: ['./.jest/setup.js'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['text', 'lcov', 'cobertura'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
