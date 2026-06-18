import { fileURLToPath } from 'url';

import { overriddenConfig } from '../../../jest.config.mjs';

const here = fileURLToPath(new URL('.', import.meta.url));

export default overriddenConfig({
  globalSetup: `${here}test/global-setup.mjs`,
  globalTeardown: `${here}test/global-teardown.mjs`,
});
