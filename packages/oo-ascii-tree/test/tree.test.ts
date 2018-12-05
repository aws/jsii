import fs = require('fs');
import path = require('path');
import { AsciiTree } from '../lib';

test('big tree', cb => {
  const tree = new AsciiTree('root',
    new AsciiTree('child1',
      new AsciiTree('child1.1'),
      new AsciiTree('child1.2'),
      new AsciiTree('child1.3'),
      new AsciiTree('child1.4',
        new AsciiTree('child1.4.1'),
        new AsciiTree('child1.4.2'),
        new AsciiTree('child1.4.3'),
      ),
      new AsciiTree('child1.6'),
      new AsciiTree('child1.7'),
      new AsciiTree('child1.8'),
    ),
    new AsciiTree('child2',
      new AsciiTree('child2.1',
        new AsciiTree('child2.1.1',
          new AsciiTree('child.2.1.1.1'),
          new AsciiTree('child.2.1.1.2'),
          new AsciiTree('child.2.1.1.3',
            new AsciiTree('child.2.1.1.3.1'),
            new AsciiTree('child.2.1.1.3.2'),
          ),
          new AsciiTree('child.2.1.1.4'),
          new AsciiTree('child.2.1.1.5'),
          new AsciiTree('child.2.1.1.5'),
        ),
        new AsciiTree('child2.1.2'),
      )
    ),
    new AsciiTree('child3'),
  );

  diff(tree, 'big.expected.txt', cb);
});

test('basic example', cb => {
  const tree = new AsciiTree('root');

  tree.add(new AsciiTree('child1'));

  tree.add(new AsciiTree('child2',
    new AsciiTree('grandchild1'),
    new AsciiTree('grandchild2')
  ));

  tree.add(new AsciiTree('child3'));

  diff(tree, 'basic.expected.txt', cb);
});

test('extensability', cb => {
  class TitleNode extends AsciiTree {
    constructor(title: string, ...children: AsciiTree[]) {
      super([
        title.toLocaleUpperCase(),
        '='.repeat(title.length)
      ].join('\n'), ...children);
    }
  }

  class KeyValueNode extends AsciiTree {
    constructor(key: string, value: string) {
      super(`${key}: ${value}`);
    }
  }

  const tree = new AsciiTree();

  tree.add(new TitleNode('props',
    new KeyValueNode('shape', 'circle'),
    new KeyValueNode('color', 'red'),
    new KeyValueNode('background', 'blue')
  ));

  tree.add(new TitleNode('dimensions',
    new KeyValueNode('width', '30px'),
    new KeyValueNode('height', '40px')
  ));

  diff(tree, 'extend.expected.txt', cb);
});

test('multiline', cb => {
  class MultiLine extends AsciiTree {
    constructor(line: string, times: number) {
      let text = '';
      for (let i = 0; i < times; ++i) {
        text += `${line} [#${i}]`;
        if (i < times - 1) {
          text += '\n';
        }
      }
      super(text);
    }
  }

  const multi = new MultiLine('hello-child-A', 3);
  multi.add(new AsciiTree('child of multi',
    new MultiLine('boom', 3)));

  multi.add(new AsciiTree('multi\nline\nchild-of-multi'));

  const tree = new AsciiTree('root',
    new AsciiTree('hello',
      multi,
      new MultiLine('hello-child-B', 10),
      new AsciiTree('just-a-node')
    ),
    new AsciiTree('world'),
    new AsciiTree('boom',
    new AsciiTree('trach',
      new MultiLine('multi', 4)
    )
  ));

  diff(tree, 'multiline.expected.txt', cb);
});

test('toString', cb => {
  const tree = new AsciiTree('root');
  tree.add(new AsciiTree('1'));
  tree.add(new AsciiTree('2', new AsciiTree('2.1'), new AsciiTree('2.2')));
  tree.add(new AsciiTree('3'));
  expect(tree.toString()).toEqual(`root
 ├── 1
 ├─┬ 2
 │ ├── 2.1
 │ └── 2.2
 └── 3
`);
  cb();
});

function diff(tree: AsciiTree, expectedFile: string, cb: jest.DoneCallback) {
  const actualFilePath = path.join(__dirname, '.actual.txt');
  const expectedFilePath = path.join(__dirname, expectedFile);
  const out = fs.createWriteStream(actualFilePath);
  tree.printTree(out);
  out.close();

  out.on('close', () => {
    const actual = fs.readFileSync(actualFilePath).toString();
    const expected = fs.readFileSync(expectedFilePath).toString();
    expect(actual).toStrictEqual(expected);
    cb();
  });
}