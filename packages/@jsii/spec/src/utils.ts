import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

export function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));
}
