import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { SyncReader } from '../lib/sync-reader';

describe('allows synchronous access to a non-blocking file descriptor', () => {
  const bufferSizes = [
    // Test once with a sync buffer much smaller than the read buffer
    { syncBufferSize: 500, readBufferSize: 4_096 },
    // And once with a sync buffer much larger than the read buffer
    { syncBufferSize: 4_096, readBufferSize: 500 },
  ];

  for (const { syncBufferSize, readBufferSize } of bufferSizes) {
    test(`with a sync buffer of ${syncBufferSize} and read buffer of ${readBufferSize}`, () => {
      /** A buffer containing random data */
      const fileContent = crypto.pseudoRandomBytes(1337);
      /** A file descriptor open for read-only, non-blocking access */
      let fd: number;

      const file = fs.mkdtempSync(
        path.join(os.tmpdir(), 'jsii-kernel.sync-reader.test.'),
      );
      // Remove the directory - we'll make it a file...
      fs.rmdirSync(file);
      try {
        fs.writeFileSync(file, fileContent);
        fd = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NONBLOCK);
      } finally {
        fs.unlinkSync(file);
      }

      // This test operates with a tiny, tiny buffer size, just to be sure...
      const reader = new SyncReader(fd, syncBufferSize);

      let ptr = 0;

      const readBuffer = Buffer.alloc(readBufferSize);
      let readBytes = 0;
      while ((readBytes = reader.readSync(readBuffer)) > 0) {
        const expected = fileContent.subarray(ptr, ptr + readBytes);
        const actual = readBuffer.subarray(0, readBytes);

        expect(actual).toEqual(expected);
        ptr += readBytes;
      }

      expect(ptr).toBe(fileContent.length);
    });
  }
});
