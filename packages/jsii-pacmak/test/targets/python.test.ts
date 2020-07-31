import * as util from '../../lib/util';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import Python from '../../lib/targets/python';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';

describe('python', () => {
  describe('blackPath', () => {
    const shellMock = jest.fn();
    const homedirMock = jest.fn();
    let homedir: string;
    let python: Python;

    beforeEach((done) => {
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(util, 'shell', { value: shellMock });
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(os, 'homedir', { value: homedirMock });
      homedir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii-pacmak-black-'));
      homedirMock.mockImplementation(() => homedir);
      python = new Python({
        targetName: 'python',
        packageDir: '/dir',
        assembly: {} as Assembly,
        rosetta: new Rosetta(),
        arguments: {},
      });

      done();
    });

    afterEach((done) => {
      shellMock.mockClear();
      homedirMock.mockClear();
      fs.removeSync(homedir);

      done();
    });

    test('black is installed globally', async () => {
      let badShellCommand: string | undefined;
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ok('/path/to/black');
          } else {
            badShellCommand = `Unexpected call to shell [${cmd} ${args.join(
              ' ',
            )}]`;
            ko(new Error(badShellCommand));
          }
        });
      });

      const path = await (python as any).blackPath(); // call private method blackPath()
      expect(badShellCommand).toBeUndefined();
      expect(path).toBe('black');
    });

    test('black is installed if not found globally', async () => {
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ko(new Error('black not found'));
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'show' &&
            args[1] === 'black'
          ) {
            ko(new Error());
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'install' &&
            args[1] === '--no-input' &&
            args[2] === 'black'
          ) {
            fs.mkdirpSync(
              path.join(
                homedir,
                '.jsii-cache',
                'python-black',
                'venv',
                process.platform === 'win32' ? 'Scripts' : 'bin',
                `black${process.platform === 'win32' ? '.exe' : ''}`,
              ),
            );
            ok();
          } else {
            ok();
          }
        });
      });

      const blackPath = await (python as any).blackPath(); // call private method blackPath()
      expect(blackPath).toBe(
        path.join(
          homedir,
          '.jsii-cache',
          'python-black',
          'venv',
          process.platform === 'win32' ? 'Scripts' : 'bin',
          `black${process.platform === 'win32' ? '.exe' : ''}`,
        ),
      );
    });

    test('local cache is reused', async () => {
      let installCount = 0;
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ko(new Error('black not found'));
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'show' &&
            args[1] === 'black'
          ) {
            ko(new Error());
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'install' &&
            args[1] === '--no-input' &&
            args[2] === 'black'
          ) {
            installCount++;
            fs.mkdirpSync(
              path.join(
                homedir,
                '.jsii-cache',
                'python-black',
                'venv',
                process.platform === 'win32' ? 'Scripts' : 'bin',
                `black${process.platform === 'win32' ? '.bat' : ''}`,
              ),
            );
            ok();
          } else {
            ok();
          }
        });
      });

      await (python as any).blackPath();
      await (python as any).blackPath();
      await (python as any).blackPath();
      expect(installCount).toEqual(1);
    });
  });
});
