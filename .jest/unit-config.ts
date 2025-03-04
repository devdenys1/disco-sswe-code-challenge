import type { Config } from 'jest';
import { baseConfig } from './base-config';

const config: Config = {
  ...baseConfig,
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '!**/integration/**'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/integration/**',
    '!src/config/**',
    '!src/mocks/**',
    '!src/**/*.model.ts',
  ],
};

export default config;
