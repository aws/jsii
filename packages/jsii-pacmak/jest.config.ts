import { overriddenConfig } from '../../jest.config';

export default overriddenConfig({
  coverageThreshold: {
    global: {
      branches: 11.5,
      statements: 15,
    },
  },
});
