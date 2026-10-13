import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { SyncStdio } from '../lib/sync-stdio';

// `fs.writeSync` cannot be spied on directly, so we wrap the module.
jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return { ...actual, writeSync: jest.fn(actual.writeSync) };
});
const mockWriteSync = fs.writeSync as unknown as jest.Mock;
const realWriteSync: typeof fs.writeSync = jest.requireActual('fs').writeSync;

let tmpdir: string;
beforeEach(() => {
  tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii-sync-stdio.'));
});
afterEach(() => {
  mockWriteSync.mockImplementation(realWriteSync);
  fs.rmSync(tmpdir, { recursive: true, force: true });
});

describe('readLine', () => {
  test('reads lines', () => {
    withInput('{"api":"stats"}\n{"exit":0}\n', (stdio) => {
      expect(stdio.readLine()).toBe('{"api":"stats"}');
      expect(stdio.readLine()).toBe('{"exit":0}');
      expect(stdio.readLine()).toBeUndefined();
    });
  });

  test('accepts a line of exactly the maximum length', () => {
    withInput(
      `${'x'.repeat(16)}\n`,
      (stdio) => {
        expect(stdio.readLine()).toBe('x'.repeat(16));
      },
      16,
    );
  });

  test('rejects a line longer than the maximum length', () => {
    withInput(
      `${'x'.repeat(17)}\nnext\n`,
      (stdio) => {
        expect(() => stdio.readLine()).toThrow(/longer than 16 bytes/);
      },
      16,
    );
  });

  test('rejects an unterminated stream longer than the maximum length', () => {
    // Larger than the 1MiB read buffer, so this needs multiple reads
    withInput(
      'x'.repeat(3 * 1_048_576),
      (stdio) => {
        expect(() => stdio.readLine()).toThrow(
          /longer than 2097152 bytes without a line terminator/,
        );
      },
      2 * 1_048_576,
    );
  });

  test('reads a line split across multiple reads', () => {
    const line = 'y'.repeat(2 * 1_048_576 + 7);
    withInput(`${line}\nend\n`, (stdio) => {
      expect(stdio.readLine()).toBe(line);
      expect(stdio.readLine()).toBe('end');
    });
  });
});

test('writeLine backs off on EAGAIN instead of spinning', () => {
  const out = path.join(tmpdir, 'out');
  const fd = fs.openSync(out, 'w');
  try {
    let calls = 0;
    mockWriteSync.mockImplementation((...args: any[]) => {
      if (++calls <= 5) {
        throw Object.assign(new Error('EAGAIN'), { code: 'EAGAIN' });
      }
      return (realWriteSync as any)(...args);
    });

    const stdio = new SyncStdio({ errorFD: fd, readFD: fd, writeFD: fd });
    const start = Date.now();
    stdio.writeLine('hello');
    const elapsed = Date.now() - start;

    expect(calls).toBe(6);
    // Backoffs of 1 + 2 + 4 + 8 + 10 (capped) ms
    expect(elapsed).toBeGreaterThanOrEqual(25);
  } finally {
    fs.closeSync(fd);
  }
  expect(fs.readFileSync(out, 'utf-8')).toBe('hello\n');
});

test('writeLine propagates errors other than EAGAIN', () => {
  mockWriteSync.mockImplementation(() => {
    throw Object.assign(new Error('EPIPE'), { code: 'EPIPE' });
  });
  const stdio = new SyncStdio({ errorFD: 2, readFD: 0, writeFD: 1 });
  expect(() => stdio.writeLine('hello')).toThrow('EPIPE');
});

function withInput(
  content: string,
  cb: (stdio: SyncStdio) => void,
  maxLineLength?: number,
) {
  const file = path.join(tmpdir, 'input');
  fs.writeFileSync(file, content);
  const fd = fs.openSync(file, 'r');
  try {
    cb(new SyncStdio({ errorFD: 2, readFD: fd, writeFD: 1, maxLineLength }));
  } finally {
    fs.closeSync(fd);
  }
}
