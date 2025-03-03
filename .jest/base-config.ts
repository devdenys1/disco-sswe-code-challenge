import type { Config } from 'jest';

export const baseConfig: Config = {
  preset: 'ts-jest',
  rootDir: `..`,
  testRegex: '.*.spec.ts$',
  setupFiles: ['./.jest/setup.js'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['text', 'lcov', 'cobertura'],
  collectCoverageFrom: ['src/**/*.ts']
};
