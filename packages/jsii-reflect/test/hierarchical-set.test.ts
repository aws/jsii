import { HierarchicalSet } from '../lib/hierarchical-set';

test('set iteration', () => {
  const hs = new HierarchicalSet([
    ['a'],
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'e'],
    ['f'],
  ]);

  expect(Array.from(hs)).toEqual([
    ['a'],
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'e'],
    ['f'],
  ]);
});

test('add prefix after child', () => {
  const hs = new HierarchicalSet();
  hs.add([['a', 'b']]);
  hs.add([['a']]);

  expect(Array.from(hs)).toEqual([['a'], ['a', 'b']]);
});

describe('remove', () => {
  test('remove literals', () => {
    const x = new HierarchicalSet([['a', 'b'], ['c'], ['d']]);

    x.remove([['a', 'b'], ['c']]);

    expect(Array.from(x)).toEqual([['d']]);
  });

  test('remove parents', () => {
    const x = new HierarchicalSet([['a', 'b'], ['c'], ['d']]);

    x.remove([['a']]);

    expect(Array.from(x)).toEqual([['c'], ['d']]);
  });
});

describe('intersect', () => {
  test('retains literal elements', () => {
    const x = new HierarchicalSet([['a', 'b'], ['c'], ['d']]);
    x.intersect(new HierarchicalSet([['a', 'b'], ['c']]));

    expect(Array.from(x)).toEqual([['a', 'b'], ['c']]);
  });

  test('retains children of parents', () => {
    const x = new HierarchicalSet([['a', 'b'], ['c'], ['d']]);

    x.intersect(new HierarchicalSet([['a']]));

    expect(Array.from(x)).toEqual([['a', 'b']]);
  });
});
