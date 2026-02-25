import { overriddenConfig } from '../../../jest.config.mjs';

export default overriddenConfig({
  coveragePathIgnorePatterns: [
    'lib/validators.js'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
    },
  },
});
