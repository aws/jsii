import { Config } from '@jest/types';
import base from '../../jest.config';

const config: Config.InitialOptions = {
  ...base,

  coverageThreshold: {
    ...base.coverageThreshold,

    global: {
      ...base.coverageThreshold?.global,

      branches: 12,
      statements: 15,
    },
  },
};

export default config;
