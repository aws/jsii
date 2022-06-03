import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import FileBuffer from './filebuff';

test('file buffer', async () => {
  const fb = new FileBuffer('hello.source');
  fb.write('hello');
  fb.write('\n');
  fb.write('world');

  // save the file
  const tempdir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-file-buffer'));
  await fb.save(tempdir);

  // verify the contents was as expected
  const data = (await fs.readFile(path.join(tempdir, fb.filePath))).toString();
  expect(data).toBe('hello\nworld');
});
