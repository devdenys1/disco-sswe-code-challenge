import type { Config } from 'jest';
import { baseConfig } from './base-config';

const config: Config = {
  ...baseConfig,
  roots: ['<rootDir>/src/integration'],
  testMatch: ['**/*.integration.spec.ts'],
};

export default config;
