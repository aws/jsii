import FileBuffer from '../lib/filebuff'
import { Test } from 'nodeunit'
import * as fs from 'fs-extra'
import * as path from 'path'

export async function testFileBuffer(test: Test) {
    let fb = new FileBuffer('hello.source');
    fb.write('hello');
    fb.write('\n');
    fb.write('world');

    // save the file
    let tempdir = await fs.mkdtemp('/tmp/test-file-buffer');
    await fb.save(tempdir);

    // verify the contents was as expected
    let data = (await fs.readFile(path.join(tempdir, fb.filePath))).toString();
    test.deepEqual(data, 'hello\nworld');
    test.done();
}
