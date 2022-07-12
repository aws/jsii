import { overriddenConfig } from '../../../jest.config.mjs';

export default overriddenConfig({
  coveragePathIgnorePatterns: [
    // This cannot be tested in a way that enables collection of coverage
    '<rootDir>/lib/sync-stdio.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 48,
    },
  },
});
