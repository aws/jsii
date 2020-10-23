import { overriddenConfig } from '../../jest.config';

export default overriddenConfig({
  coverageThreshold: {
    global: {
      branches: 10.4,
      statements: 14.8,
    },
  },
});
