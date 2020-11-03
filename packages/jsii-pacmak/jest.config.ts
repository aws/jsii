import { overriddenConfig } from '../../jest.config';

export default overriddenConfig({
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test'],
});
