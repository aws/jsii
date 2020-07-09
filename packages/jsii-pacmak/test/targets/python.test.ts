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
    const osMock = jest.fn();
    let tmpdir: string;

    beforeEach(async () => {
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(util, 'shell', { value: shellMock });
      // eslint-disable-next-line no-import-assign
      Object.defineProperty(os, 'homedir', { value: osMock });
      tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-black-'));
      osMock.mockImplementation(() => tmpdir);
    });

    afterEach(async () => {
      shellMock.mockClear();
      osMock.mockClear();
      await fs.remove(tmpdir);
    });

    test('black is installed globally', async () => {
      shellMock.mockImplementation((cmd: string, args: string[], _) => {
        return new Promise((ok, ko) => {
          if (cmd === 'which' && args[0] === 'black') {
            ok('/path/to/black');
          }
          ko(`Unexpected call to shell ${cmd} ${args}`);
        });
      });

      const python = new Python({
        targetName: 'python',
        packageDir: '/dir',
        assembly: {} as Assembly,
        rosetta: new Rosetta(),
        arguments: {},
      });
      const path = await (python as any).blackPath();
      expect(path).toBe('black');
    });
  });
});
