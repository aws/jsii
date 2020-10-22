import { overriddenConfig } from '../../../jest.config';

export default overriddenConfig({
  // We don't need coverage for the integration tests
  collectCoverage: false,
});
