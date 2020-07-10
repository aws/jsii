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

    beforeEach(async () => {
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(util, 'shell', { value: shellMock });
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(os, 'homedir', { value: homedirMock });
      homedir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-black-'));
      homedirMock.mockImplementation(() => homedir);
      python = new Python({
        targetName: 'python',
        packageDir: '/dir',
        assembly: {} as Assembly,
        rosetta: new Rosetta(),
        arguments: {},
      });
    });

    afterEach(async () => {
      shellMock.mockClear();
      homedirMock.mockClear();
      await fs.remove(homedir);
    });

    test('black is installed globally', async () => {
      let badShellCommand: string | undefined;
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ok('/path/to/black');
          } else {
            badShellCommand = `Unexpected call to shell [${cmd} ${args}]`;
            ko(badShellCommand);
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
            ko('black not found');
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'show' &&
            args[1] === 'black'
          ) {
            ko();
          } else {
            ok();
          }
        });
      });

      const path = await (python as any).blackPath(); // call private method blackPath()
      expect(path).toBe(`${homedir}/.jsii-cache/python-black/.env/bin/black`);
    });

    test('local cache is reused', async () => {
      let installCount = 0;
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ko('black not found');
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'show' &&
            args[1] === 'black'
          ) {
            ko();
          } else if (
            /pip.?$/.test(cmd) &&
            args[0] === 'install' &&
            args[1] === 'black'
          ) {
            installCount++;
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
