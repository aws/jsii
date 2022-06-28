import { createRequire } from 'node:module';
import { overriddenConfig } from '../../jest.config.mjs';

export default overriddenConfig({
  setupFiles: [createRequire(import.meta.url).resolve('./jestsetup.js')],
});
