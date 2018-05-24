# codemaker

Makes code. Well.. just a simple text writer with support for:

 1. Blocks (indentation/open/close)
 2. Supports multiple files (with subdirectories)
 3. Exclusion of files

```js
import { CodeMaker } from 'codemaker'

let maker = new CodeMaker();
maker.openFile('myfile.js');
maker.line('first line');
maker.openBlock('open');
maker.line('second line');
maker.closeBlock();
maker.indent('generic open [');
maker.line('boom');
maker.line('bam');
maker.unindent(']');
maker.closeFile('myfile.js');

let yourfileRelativePath = './relative/subdirs/are/also/supported/yourfile.js';
maker.openFile(yourfileRelativePath);
maker.line('this is your file speaking');

// change indentation and block formatting
maker.indentation = 10;
maker.openBlockFormatter = s => `(--- ${s} ---`;
maker.closeBlockFormatter = s => `--- ${s} ---)`;

maker.openBlock('block1');
maker.line('block1.line1');
maker.line('block1.line2');
maker.openBlock('block2');
maker.line('block2.line1');
maker.closeBlock('block2 (close)');
maker.line('block1.line3');
maker.closeBlock('block1 (close)');

// closeFile will ensure that you are closing the same file.
maker.closeFile(yourfileRelativePath);

// files can also be excluded by adding their path to exclude()
maker.openFile('rel/excluded.txt');
maker.line('this file will not be emitted in save()');
maker.closeFile('rel/excluded.txt');

// later in the day
maker.exclude('rel/excluded.txt');

// this is javascript - you can customize openBlock to whatever
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

// returns a sorted list of output files
let files = await maker.save('/tmp/source-files');
```

* /tmp/source-files/myfile.js:

```
first line
open {
    second line
}
generic open [
    boom
    bam
]
```

* /tmp/source-files/relative/subdirs/are/also/supported/yourfile.js:

```
this is your file speaking
(--- block1 ---
          block1.line1
          block1.line2
          (--- block2 ---
                    block2.line1
          --- block2 (close) ---)
          block1.line3
--- block1 (close) ---)
```

* /tmp/source-files/custom-blocks.cpp:

```
Block1()
{
    L1
    Block2()
    {
        L2
    }
}
```

Neat.

Also bundles a couple of case utils from **sindresorhus**:

```js
maker.toCamelCase(s, ...)
maker.toPascalCase(s, ...)
maker.toSnakCase(s, sep = '_')
```
