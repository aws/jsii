import { overriddenConfig } from '../../../jest.config.mjs';

export default overriddenConfig({
  // We don't need coverage for the integration tests
  collectCoverage: false,
});
