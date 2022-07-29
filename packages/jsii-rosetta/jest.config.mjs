import { createRequire } from 'node:module';
import { default as defaultConfig, overriddenConfig } from '../../jest.config.mjs';

export default overriddenConfig({
  setupFiles: [createRequire(import.meta.url).resolve('./jestsetup.js')],
  testTimeout: process.env.CI === 'true' ? 30_000 : defaultConfig.testTimeout,
});
