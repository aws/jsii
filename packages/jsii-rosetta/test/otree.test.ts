import { OTree, renderTree } from "../lib/o-tree";

test('test indentation', () => {
  const tree = new OTree(['{'],
    ['\na', '\nb', '\nc'],
    {
      separator: ', ',
      indent: 4,
      suffix: '\n}',
    });

  expect(renderTree(tree)).toEqual('{\n    a,\n    b,\n    c\n}');
});

test('collapse subsequent unused indentation', () => {
  const tree = new OTree(['{'],
    [new OTree([], ['\na', '\nb', '\nc'], { indent: 4, separator: ', ' })],
    {
      separator: ', ',
      indent: 4,
      suffix: '\n}',
    });

  expect(renderTree(tree)).toEqual('{\n    a,\n    b,\n    c\n}');
});

test('don not collapse subsequent USED indentation', () => {
  const tree = new OTree(['{'],
    [
      '\na',
      new OTree(['\n{'], ['\na', '\nb', '\nc'], { indent: 4, separator: ', ', suffix: '\n}' }),
      '\nb',
    ],
    {
      separator: ', ',
      indent: 4,
      suffix: '\n}',
    });

  expect(renderTree(tree)).toEqual([
    '{',
    '    a,',
    '    {',
    '        a,',
    '        b,',
    '        c',
    '    },',
    '    b',
    '}'].join('\n'));
});
