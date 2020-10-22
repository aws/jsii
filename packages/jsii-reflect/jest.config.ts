import { overriddenConfig } from '../../jest.config';

export default overriddenConfig({
  coverageThreshold: {
    global: {
      branches: 39,
      statements: 54,
    },
  },
});
