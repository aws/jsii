import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { AllAttemptsFailed, retry, subprocess, wait } from '../lib/util';

// Lets tests exercise Windows-only code paths on any host.
const mockPlatform = jest.fn<NodeJS.Platform, []>();
jest.mock('os', () => {
  const actual = jest.requireActual('os');
  return {
    ...actual,
    platform: () => mockPlatform() ?? actual.platform(),
  };
});

// Exercises Windows binary resolution on any host by pretending to be win32.
describe('subprocess binary resolution on Windows', () => {
  let workdir: string;
  let cwdDir: string;
  let binDir: string;
  const env = {
    PATH: process.env.PATH,
    PATHEXT: process.env.PATHEXT,
    COMSPEC: process.env.COMSPEC,
  };

  beforeEach(async () => {
    workdir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-util-'));
    cwdDir = path.join(workdir, 'cwd');
    binDir = path.join(workdir, 'bin');
    await fs.mkdirp(cwdDir);
    await fs.mkdirp(binDir);
    mockPlatform.mockReturnValue('win32');
    jest.spyOn(process, 'cwd').mockReturnValue(cwdDir);
    process.env.PATH = binDir;
    process.env.PATHEXT = '.EXE;.CMD';
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    mockPlatform.mockReset();
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    await fs.remove(workdir);
  });

  // Uses a `#!` script standing in for cmd.exe, which only runs on POSIX hosts.
  (process.platform === 'win32' ? test.skip : test)(
    'runs a binary found on PATH',
    async () => {
      const fakeCmd = path.join(workdir, 'fake-cmd');
      // Invoked as `<COMSPEC> /d /c <resolved> ...args`; print the resolved path.
      await fs.writeFile(fakeCmd, '#!/bin/sh\necho "$3"\n', { mode: 0o755 });
      process.env.COMSPEC = fakeCmd;
      await fs.writeFile(path.join(binDir, 'tool.CMD'), '');

      await expect(subprocess('tool', [])).resolves.toBe(
        `${path.join(binDir, 'tool.CMD')}\n`,
      );
    },
  );

  test('refuses a binary found in the current working directory', async () => {
    await fs.writeFile(path.join(binDir, 'tool.CMD'), '');
    await fs.writeFile(path.join(cwdDir, 'tool.CMD'), '');

    await expect(subprocess('tool', [])).rejects.toThrow(
      /Refusing to run tool: found .* in the current working directory/,
    );
  });

  test('fails if the binary is not found', async () => {
    await expect(subprocess('tool', [])).rejects.toThrow(
      /Unable to resolve command: tool/,
    );
  });
});

type Waiter = typeof wait;

describe(retry, () => {
  const mockWaiter = jest.fn<ReturnType<Waiter>, Parameters<Waiter>>();

  beforeEach((done) => {
    mockWaiter.mockImplementation(() => Promise.resolve());
    done();
  });

  afterEach((done) => {
    jest.resetAllMocks();
    done();
  });

  test('throws on invalid maxTries', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(fakeCallback, { maxAttempts: 0 }, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow('maxTries must be > 0');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws on invalid backoffBaseMilliseconds', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(
      fakeCallback,
      { backoffBaseMilliseconds: 0 },
      mockWaiter,
    );

    // THEN
    await expect(result).rejects.toThrow('backoffBaseMilliseconds must be > 0');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws on invalid backoffMultiplier', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(fakeCallback, { backoffMultiplier: 1 }, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow('backoffMultiplier must be > 1');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws when it exhausted all attempts', async () => {
    // GIVEN
    const alwaysFail = () => Promise.reject(new Error('Always'));

    // WHEN
    const result = retry(alwaysFail, {}, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow(AllAttemptsFailed);
    expect(mockWaiter).toHaveBeenCalledTimes(4);
    for (let i = 0; i < 4; i++) {
      expect(mockWaiter).toHaveBeenNthCalledWith(i + 1, 150 * Math.pow(2, i));
    }
  });

  test('behaves correctly if callback throws non-Error', async () => {
    // GIVEN
    const alwaysFail = () => Promise.reject(new Error('Always'));

    // WHEN
    const result = retry(
      alwaysFail,
      { maxAttempts: 3, backoffBaseMilliseconds: 1337, backoffMultiplier: 42 },
      mockWaiter,
    );

    // THEN
    await expect(result).rejects.toThrow(AllAttemptsFailed);
    expect(mockWaiter).toHaveBeenCalledTimes(2);
  });

  test('correctly implements exponential back-off and calls onFaieldAttempt appropriately', async () => {
    // GIVEN
    const expectedResult = Math.random();
    let attemptNumber = 0;
    const failFourTimes = () =>
      new Promise((ok, ko) => {
        attemptNumber++;
        if (attemptNumber <= 4) {
          ko(new Error(`Attempt #${attemptNumber}`));
        } else {
          ok(expectedResult);
        }
      });
    const onFailedAttempt = jest
      .fn()
      .mockName('onFailedAttempt')
      .mockImplementation(
        (error: Error, attemptsLeft: number, backoffMs: number) => {
          expect(error.message).toBe(`Attempt #${attemptNumber}`);
          expect(attemptsLeft).toBe(5 - attemptNumber);
          expect(backoffMs).toBe(1337 * Math.pow(42, attemptNumber - 1));
        },
      );

    // WHEN
    const result = await retry(
      failFourTimes,
      {
        backoffBaseMilliseconds: 1337,
        backoffMultiplier: 42,
        onFailedAttempt,
      },
      mockWaiter,
    );

    // THEN
    expect(result).toBe(result);

    expect(onFailedAttempt).toHaveBeenCalledTimes(4);
    expect(mockWaiter).toHaveBeenCalledTimes(4);
    for (let i = 0; i < 4; i++) {
      expect(mockWaiter).toHaveBeenNthCalledWith(i + 1, 1337 * Math.pow(42, i));
    }
  });
});
