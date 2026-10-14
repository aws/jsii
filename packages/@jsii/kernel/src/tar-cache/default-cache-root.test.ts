import * as os from 'os';
import { join } from 'path';

import { defaultCacheRoot } from './default-cache-root';

const mockHomedir = jest.fn<string, []>();
jest.mock('os', () => ({
  ...jest.requireActual('os'),
  homedir: () => mockHomedir(),
}));

const realPlatform = process.platform;
let savedLocalAppData: string | undefined;

beforeEach(() => {
  savedLocalAppData = process.env.LOCALAPPDATA;
});
afterEach(() => {
  mockHomedir.mockReset();
  Object.defineProperty(process, 'platform', { value: realPlatform });
  if (savedLocalAppData == null) {
    delete process.env.LOCALAPPDATA;
  } else {
    process.env.LOCALAPPDATA = savedLocalAppData;
  }
});

function mockPlatform(platform: NodeJS.Platform) {
  Object.defineProperty(process, 'platform', { value: platform });
}

function mockHome(home: string | Error) {
  mockHomedir.mockImplementation(() => {
    if (home instanceof Error) {
      throw home;
    }
    return home;
  });
}

test.each([
  ['darwin', '/Users/jsii/Library/Caches/com.amazonaws.jsii/package-cache'],
  ['linux', '/Users/jsii/.cache/aws/jsii/package-cache'],
  ['freebsd', '/Users/jsii/.cache/aws/jsii/package-cache'],
  ['openbsd', '/Users/jsii/.cache/aws/jsii/package-cache'],
] as const)('is under the home directory on %s', (platform, expected) => {
  mockPlatform(platform);
  mockHome('/Users/jsii');
  expect(defaultCacheRoot().split(/[\\/]/).join('/')).toBe(expected);
});

test.each(['darwin', 'linux', 'freebsd'] as const)(
  'is a per-user directory in tmpdir() on %s without a usable home directory',
  (platform) => {
    mockPlatform(platform);
    for (const home of ['', 'relative/home', new Error('ENOENT')]) {
      mockHome(home);
      expect(defaultCacheRoot()).toBe(tmpdirRoot());
    }
  },
);

describe('win32', () => {
  beforeEach(() => mockPlatform('win32'));

  test('uses LOCALAPPDATA', () => {
    process.env.LOCALAPPDATA = os.tmpdir();
    expect(defaultCacheRoot()).toContain(os.tmpdir());
  });

  test('uses the home directory without LOCALAPPDATA', () => {
    for (const value of [undefined, '', 'relative']) {
      if (value == null) {
        delete process.env.LOCALAPPDATA;
      } else {
        process.env.LOCALAPPDATA = value;
      }
      mockHome('/Users/jsii');
      expect(defaultCacheRoot().split(/[\\/]/).join('/')).toBe(
        '/Users/jsii/AppData/Local/AWS/jsii/package-cache',
      );
    }
  });

  test('uses tmpdir() without LOCALAPPDATA and home directory', () => {
    delete process.env.LOCALAPPDATA;
    mockHome('');
    expect(defaultCacheRoot()).toBe(tmpdirRoot());
  });
});

test('the tmpdir() location is not the shared directory older versions used', () => {
  if (process.getuid?.() == null) {
    return;
  }
  mockHome('');
  expect(defaultCacheRoot()).not.toBe(
    join(os.tmpdir(), 'aws-jsii-package-cache'),
  );
});

function tmpdirRoot(): string {
  const uid = process.getuid?.();
  return join(
    os.tmpdir(),
    uid != null ? `aws-jsii-package-cache-${uid}` : 'aws-jsii-package-cache',
  );
}
