import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { CodeMaker } from '../lib';

test('cannot write before opening a file', () => {
  const sources = new CodeMaker();
  expect(() => sources.line('Nope!')).toThrow(
    /Cannot emit source lines without opening a file/,
  );
});

test('source files', async () => {
  const sources = new CodeMaker();
  sources.openFile('myfile.js');
  sources.line('first line');
  sources.openBlock('open');
  sources.line('second line');
  sources.closeBlock();
  sources.open('generic open [');
  sources.line('boom');
  sources.line('bam');
  sources.close(']');
  sources.closeFile('myfile.js');

  const yourfileRelativePath =
    './relative/subdirs/are/also/supported/yourfile.js';
  sources.openFile(yourfileRelativePath);
  sources.line('this is your file speaking');

  // change indentation and block chars
  sources.indentation = 10;
  sources.openBlockFormatter = (s) => `(--- ${s} ---`;
  sources.closeBlockFormatter = (s) => `--- ${s} ---)`;

  sources.openBlock('block1');
  sources.line('block1.line1');
  sources.line('block1.line2');
  sources.openBlock('block2');
  sources.line('block2.line1');
  sources.closeBlock('block2 (close)');
  sources.line('block1.line3');
  sources.closeBlock('block1 (close)');

  sources.closeFile(yourfileRelativePath);

  // files can also be excluded by adding their path to exclude()
  sources.openFile('excluded.txt');
  sources.line('this file will not be emitted in save()');
  sources.closeFile('excluded.txt');

  // later in the day
  sources.exclude('excluded.txt');

  const dirname = await fs.mkdtemp(path.join(os.tmpdir(), 'source-files'));
  const files = await sources.save(dirname);

  expect(files).toHaveLength(2);

  const myfilePath = path.join(dirname, 'myfile.js');
  const yourfilePath = path.join(dirname, yourfileRelativePath);

  expect(files[0]).toBe(myfilePath);
  expect(files[1]).toBe(yourfilePath);

  const myfile = (await fs.readFile(files[0])).toString();
  const yourfile = (await fs.readFile(files[1])).toString();

  expect(myfile).toBe(expectedMyFile);
  expect(yourfile).toBe(expectedYourFile);
});

/**
 * Should fail if openFile and closeFile have are not matched.
 */
test('close file mismatch', () => {
  const sources = new CodeMaker();
  sources.openFile('A');
  expect(() => sources.closeFile('B')).toThrow(/Cannot close file/);
});

test('custom multi-line block', async () => {
  const maker = new CodeMaker();

  maker.openBlock = (s) => {
    maker.line(s);
    maker.open('{');
  };

  maker.openFile('custom-blocks.cpp');
  maker.openBlock('Block1()');
  maker.line('L1');
  maker.openBlock('Block2()');
  maker.line('L2');
  maker.closeBlock();
  maker.closeBlock();
  maker.closeFile('custom-blocks.cpp');

  const dirname = await fs.mkdtemp(path.join(os.tmpdir(), 'source-files'));
  const files = await maker.save(dirname);

  const actual = (await fs.readFile(files[0])).toString();

  expect(actual).toBe(expectedCustomBlocks);
});

const expectedMyFile = `first line
open {
    second line
}
generic open [
    boom
    bam
]
`;

const expectedYourFile = `this is your file speaking
(--- block1 ---
          block1.line1
          block1.line2
          (--- block2 ---
                    block2.line1
          --- block2 (close) ---)
          block1.line3
--- block1 (close) ---)
`;

const expectedCustomBlocks = `Block1()
{
    L1
    Block2()
    {
        L2
    }
}
`;
