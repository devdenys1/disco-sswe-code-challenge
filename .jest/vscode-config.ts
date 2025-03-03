import type { Config } from 'jest';
import { baseConfig } from './base-config';

const config: Config = {
  ...baseConfig,
  roots: ['src'],
  collectCoverage: false
};

export default config;
