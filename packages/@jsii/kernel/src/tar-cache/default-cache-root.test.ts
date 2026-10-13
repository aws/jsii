import * as os from 'os';

import { defaultCacheRoot, fallbackCacheRoot } from './default-cache-root';

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
  expect(defaultCacheRoot()?.split(/[\\/]/).join('/')).toBe(expected);
});

test.each(['darwin', 'linux', 'freebsd'] as const)(
  'is undefined on %s without a usable home directory',
  (platform) => {
    mockPlatform(platform);
    for (const home of ['', 'relative/home', new Error('ENOENT')]) {
      mockHome(home);
      expect(defaultCacheRoot()).toBeUndefined();
    }
  },
);

describe('win32', () => {
  beforeEach(() => mockPlatform('win32'));

  test('uses LOCALAPPDATA', () => {
    process.env.LOCALAPPDATA = os.tmpdir();
    expect(defaultCacheRoot()).toContain(os.tmpdir());
  });

  test('falls back to the home directory without LOCALAPPDATA', () => {
    for (const value of [undefined, '', 'relative']) {
      if (value == null) {
        delete process.env.LOCALAPPDATA;
      } else {
        process.env.LOCALAPPDATA = value;
      }
      mockHome('/Users/jsii');
      expect(defaultCacheRoot()?.split(/[\\/]/).join('/')).toBe(
        '/Users/jsii/AppData/Local/AWS/jsii/package-cache',
      );
    }
  });

  test('is undefined without LOCALAPPDATA and home directory', () => {
    delete process.env.LOCALAPPDATA;
    mockHome('');
    expect(defaultCacheRoot()).toBeUndefined();
  });
});

test('is never under tmpdir()', () => {
  for (const platform of ['darwin', 'linux', 'win32', 'aix'] as const) {
    mockPlatform(platform);
    delete process.env.LOCALAPPDATA;
    mockHome('');
    expect(defaultCacheRoot()).toBeUndefined();
  }
});

describe(fallbackCacheRoot, () => {
  test('is a per-user directory under tmpdir()', () => {
    const root = fallbackCacheRoot();
    expect(root.startsWith(os.tmpdir())).toBe(true);
    const uid = process.getuid?.();
    if (uid != null) {
      expect(root).toMatch(new RegExp(`aws-jsii-package-cache-${uid}$`));
    }
  });

  test('is not the shared directory older versions used', () => {
    if (process.getuid?.() == null) {
      return;
    }
    expect(fallbackCacheRoot()).not.toBe(
      `${os.tmpdir()}/aws-jsii-package-cache`,
    );
  });
});
