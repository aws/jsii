import * as fs from 'fs-extra'
import * as path from 'path'
import { Test } from 'nodeunit'
import { CodeMaker } from '../lib'

export async function testSourceFiles(test: Test) {
    let sources = new CodeMaker();
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

    let yourfileRelativePath = './relative/subdirs/are/also/supported/yourfile.js';
    sources.openFile(yourfileRelativePath);
    sources.line('this is your file speaking');

    // change indentation and block chars
    sources.indentation = 10;
    sources.openBlockFormatter = s => `(--- ${s} ---`;
    sources.closeBlockFormatter = s => `--- ${s} ---)`;

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

    let dirname = await fs.mkdtemp('/tmp/source-files');
    let files = await sources.save(dirname);

    test.equal(2, files.length);

    let myfilePath = path.join(dirname, 'myfile.js');
    let yourfilePath = path.join(dirname, yourfileRelativePath);

    test.equal(myfilePath, files[0]);
    test.equal(yourfilePath, files[1]);

    let myfile = (await fs.readFile(files[0])).toString();
    let yourfile = (await fs.readFile(files[1])).toString();

    test.equals(expectedMyFile, myfile);
    test.equals(expectedYourFile, yourfile);

    console.log(myfile);
    console.log();
    console.log(yourfile);

    test.done();
}

/**
 * Should fail if openFile and closeFile have are not matched.
 */
export function closeFileMismatch(test: Test) {
    let sources = new CodeMaker();
    sources.openFile('A');
    sources.closeFile('B');
    test.done();
}

export async function testCustomMultilineBlocks(test: Test) {
    let maker = new CodeMaker();
    
    maker.openBlock = function(s) {
      this.line(s);
      this.open('{');
    };

    maker.openFile('custom-blocks.cpp');
    maker.openBlock('Block1()');
    maker.line('L1');
    maker.openBlock('Block2()');
    maker.line('L2');
    maker.closeBlock();
    maker.closeBlock();
    maker.closeFile('custom-blocks.cpp');

    const dirname = await fs.mkdtemp('/tmp/source-files');
    const files = await maker.save(dirname);

    const actual = (await fs.readFile(files[0])).toString();
    
    console.log(actual);
    
    test.deepEqual(actual, expectedCustomBlocks);
    test.done();
}

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
`

const expectedCustomBlocks = `Block1()
{
    L1
    Block2()
    {
        L2
    }
}
`;