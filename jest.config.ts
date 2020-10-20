import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
import { env } from 'process';

/**
 * This is the shared Jest configuration for all the project. Jest does not
 * typically look for this file in parent directories, so it should be symlinked
 * in all the packages, so it gets properly discovered. If some values need to
 * be overridden (for example, the coverage threshold), then a new
 * `jest.config.ts` file should be created that imports from this one and
 * modifies just what needs to be modified.
 */
const config: Config.InitialOptions = {
  ...defaults,

  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 60,
      statements: 60,
    },
  },
  errorOnDeprecated: true,
  // When in Continuous Integration, use only 1 worker (assuming "frugal" runner type)
  maxWorkers: env.CI === 'true' ? 1 : defaults.maxWorkers,
  setupFilesAfterEnv: ['jest-expect-message'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
};

export default config;
