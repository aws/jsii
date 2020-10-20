import type { Config } from '@jest/types';
import base from '../../../jest.config';

const config: Config.InitialOptions = {
  ...base,
  // We don't need coverage for the integration tests
  collectCoverage: false,
};

export default config;
