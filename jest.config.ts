import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
import { env } from 'process';

/**
 * This is the shared Jest configuration for all the project. Jest does not
 * typically look for this file in parent directories, so it should be symlinked
 * in all the packages, so it gets properly discovered. If some values need to
 * be overridden (for example, the coverage threshold), then a new
 * `jest.config.ts` file should be created that imports from this one and
 * modifies just what needs to be modified, typically using `overriddenConfig`.
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
  // When in Continuous Integration, allow double the default test timeout (assuming "frugal" runner type)
  testTimeout: env.CI === 'true' ? 10_000 : undefined,
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
};

/**
 * Overrides the default configuration with the provided values. The merge
 * operation works deeply on objects, but overrides that are not objects (e.g:
 * arrays, strings, ...) simply replace the original value.
 *
 * @param overrides values to be used for overriding the orignal configuration.
 */
export function overriddenConfig(overrides: Config.InitialOptions) {
  return merge(config, overrides);

  function merge<T>(original: T, override: T): T {
    if (typeof original === 'object') {
      const result: any = {};
      const allKeys = new Set([
        ...Object.keys(original),
        ...Object.keys(override),
      ]);
      for (const key of Array.from(allKeys).sort()) {
        const originalValue: unknown = (original as any)[key];
        const overrideValue: unknown = (override as any)[key];
        if (originalValue == null) {
          result[key] = overrideValue;
        } else if (overrideValue == null) {
          result[key] = originalValue;
        } else {
          result[key] = merge(originalValue, overrideValue);
        }
      }
      return result;
    }
    return override;
  }
}

export default config;
