import { expectError } from './util';

// ----------------------------------------------------------------------

test.each([
  ['class', 'constructor'],
  ['class', 'method'],
  ['interface', 'method'],
])(
  'not okay to rename a positional parameter',
  (scope, decl) =>
    expectError(
      /positional parameter was renamed from 'previous' to 'current'/,
      // Note: name is ITest so we're good for both class & interface... Yes, this is ugly.
      `
      export ${scope} ITest {
        ${decl}(previous: any)${decl === 'constructor' ? '' : ': void'}${scope === 'class' ? ' { previous.use(); }' : ';'}
      }`,
      `
      export ${scope} ITest {
        ${decl}(current: any)${decl === 'constructor' ? '' : ': void'}${scope === 'class' ? ' { current.use(); }' : ';'}
      }`,
    ),
);
