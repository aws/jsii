import { join } from 'path';

import { overriddenConfig } from '../../jest.config';

export default overriddenConfig({
  setupFiles: [join(__dirname, 'jestsetup.js')],
});
