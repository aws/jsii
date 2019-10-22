import { expectPython } from "./python";

test('function call', async () => {
  expectPython(`
  callSomeFunction(1, 2, 3);
  `, `
  call_some_function(1, 2, 3)
  `);
});

test('method call', async () => {
  expectPython(`
  someObject.callSomeFunction(1, 2, 3);
  `, `
  some_object.call_some_function(1, 2, 3)
  `);
});

test('static function call', async () => {
  expectPython(`
  SomeObject.callSomeFunction(1, 2, 3);
  `, `
  SomeObject.call_some_function(1, 2, 3)
  `);
});

test('translate this to self when calling', async () => {
  expectPython(`
  callSomeFunction(this, 25);
  `, `
  call_some_function(self, 25)
  `);
});

test('translate this to self on LHS of object accessor', async () => {
  expectPython(`
  this.callSomeFunction(25);
  `, `
  self.call_some_function(25)
  `);
});

test('translate object literals in function call', async () => {
  expectPython(`
  foo(25, { foo: 3, banana: "hello"  });
  `, `
  foo(25, foo=3, banana="hello")
  `);
});

test('translate object literals with newlines', async () => {
  expectPython(`
  foo(25, {
    foo: 3,
    banana: "hello"
  });
  `, `
  foo(25,
      foo=3,
      banana="hello"
  )
  `);
});

test('translate object literals with multiple newlines', async () => {
  expectPython(`
  foo(25, {
    foo: 3,

    banana: "hello"
  });
  `, `
  foo(25,
      foo=3,

      banana="hello"
  )
  `);
});

test('translate object literals only one level deep', async () => {
  // FIXME: This is wrong! We need the types here!
  expectPython(`
  foo(25, { foo: 3, deeper: { a: 1, b: 2 });
  `, `
  foo(25, foo=3, deeper={"a": 1, "b": 2})
  `);
});

test('translate object literals second level with newlines', async () => {
  expectPython(`
  foo(25, { foo: 3, deeper: {
    a: 1,
    b: 2
  });
  `, `
  foo(25, foo=3, deeper={
      "a": 1,
      "b": 2
  })
  `);
});

test('will type deep structs directly if type info is available', () => {
  expectPython(`
  interface BaseDeeperStruct {
    a: number;
  }
  interface DeeperStruct extends BaseDeeperStruct {
    b: number;
  }

  interface OuterStruct {
    foo: number;
    deeper: DeeperStruct;
  }

  function foo(x: number, outer: OuterStruct) { }

  foo(25, { foo: 3, deeper: {
    a: 1,
    b: 2
  });
  `, `
  def foo(x, *, foo, deeper):
      pass

  foo(25, foo=3, deeper=DeeperStruct(
      a=1,
      b=2
  ))
  `);
});

test('default arguments get =None appended', () => {
  expectPython(`
  function foo(x: string | undefined, y: string = 'hello', z?: string) {
    console.log(x, y, z);
  }
  `, `
  def foo(x=None, y=None, z=None):
      print(x, y, z)
  `);
});

test('default struct fields get =None appended', () => {
  expectPython(`
  interface Struct {
    x: string | undefined;
    y?: string;
  }
  function foo(s: Struct) {
    console.log(s.x, s.y);
  }
  `, `
  def foo(*, x=None, y=None):
      print(x, y)
  `);
});

test('list of structs', () => {
  expectPython(`
  foo({
    list: [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4,
    }]
  });
  `, `
  foo(
      list=[{
          "a": 1,
          "b": 2
      }, {
          "a": 3,
          "b": 4
      }]
  )
  `);
});

test('literal map argument doesnt get keyworded', () => {
  // requires type information to work
  expectPython(`
  function foo(xs: {[key: string]: string}) {  }

  foo({ foo: 'bar', schmoo: 'schmar' })
  `, `
  def foo(xs):
      pass

  foo({"foo": "bar", "schmoo": "schmar"})
  `);
});