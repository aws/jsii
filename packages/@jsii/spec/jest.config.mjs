import { overriddenConfig } from '../../../jest.config.mjs';

export default overriddenConfig({
  coverageThreshold: {
    global: {
      branches: 28,
    },
  },
});
