import { expectPython } from "./python";

test('hide top level statements using void directive', () => {
  expectPython(`
  void 1;
  function foo(x: number) {
  }
  void 'show';
  foo(3);
  `, `
  foo(3)
  `);
});

test('hide block level statements using void directive', () => {
  expectPython(`
  if (true) {
    console.log('everything is well');
    void 1;
    subprocess.exec('rm -rf /');
  }

  onlyToEndOfBlock();
  `, `
  if True:
      print("everything is well")

  only_to_end_of_block()
  `);
});

test('hide parameter sequence', () => {
  expectPython(`
  foo(3, (void 1, 4), 5, 6, (void 'show', 7), 8);
  `, `
  foo(3, 8)
  `);
});

test('hide expression with explicit ellipsis', () => {
  expectPython(`
  foo(3, (void '...', 4), 5, 6, 7);
  `, `
  foo(3, ...)
  `);
});

test('hide statements with explicit ellipsis', () => {
  expectPython(`
  before();
  void 'block';
  middle();
  void 'show';
  after();
  `, `
  before()
  # ...
  after()
  `);
});