import { overriddenConfig } from '../../jest.config.mjs';

export default overriddenConfig({
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test'],
  watchPathIgnorePatterns: ['.*\\.tsx?$'],
});
