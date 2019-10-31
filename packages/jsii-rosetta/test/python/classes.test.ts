import { expectPython } from "./python";

test('class declaration with fields and constructor', async () => {
  // FIXME: This whitespace is not entirely correct, but it's not horrible
  // and I don't know how to fix it for now.
  expectPython(`
  class MyClass {
    private readonly x: string;

    constructor(y: string) {
      this.x = y;
    }
  }
  `, `
  class MyClass:

      def __init__(self, y):
          self.x = y
  `);
});

test('whitespace between multiple members', () => {
  expectPython(`
  class MyClass {
    constructor(y: string) {
      this.x = y;
    }

    public hello() {
      console.log(this.x);
    }

    public bye() {
      console.log('bye');
    }
  }
  `, `
  class MyClass:
      def __init__(self, y):
          self.x = y

      def hello(self):
          print(self.x)

      def bye(self):
          print("bye")
  `);
});

test('whitespace between multiple empty members', () => {
  expectPython(`
  class MyClass {
    constructor(y: string) {
      this.x = y;
    }

    public hello() {
    }

    public bye() {
    }
  }
  `, `
  class MyClass:
      def __init__(self, y):
          self.x = y

      def hello(self):
          pass

      def bye(self):
          pass
  `);
});

test('invisible interfaces do not affect whitespace', async () => {
  expectPython(`
  class MyClass1 {
  }

  interface ThisWillNotBeRendered {
  }

  class MyClass2 {
  }
  `, `
  class MyClass1:
      pass

  class MyClass2:
      pass
  `);
});

test.skip('class with implicit declaration', async () => {
  expectPython(`
  class MyClass {
    private readonly x = 'bloep';
  }
  `, `
  class MyClass:
      def __init__(self):
          self.x = 'bloep'
  `);
});

test('class with inheritance', async () => {
  expectPython(`
  class MyClass extends cdk.SomeOtherClass {
  }
  `, `
  class MyClass(cdk.SomeOtherClass):
      pass
  `);
});

test('class with inheritance and super class', async () => {
  expectPython(`
  class MyClass extends cdk.SomeOtherClass {
    constructor(x: string, y: string) {
      super(x);
    }
  }
  `, `
  class MyClass(cdk.SomeOtherClass):
      def __init__(self, x, y):
          super().__init__(x)
  `);
});

test('class with method', async () => {
  expectPython(`
  class MyClass extends cdk.SomeOtherClass {
    public someMethod(x: string) {
      console.log(x);
    }
  }
  `, `
  class MyClass(cdk.SomeOtherClass):
      def some_method(self, x):
          print(x)
  `);
});

test('class with props argument', async () => {
  expectPython(`
  interface MyClassProps {
    readonly prop1: string;
    readonly prop2: number;
  }

  class MyClass extends cdk.SomeOtherClass {
    constructor(scope: cdk.Construct, id: string, props: MyClassProps) {
      super(scope, id, props);

      print(props.prop1);
    }
  }
  `, `
  class MyClass(cdk.SomeOtherClass):
      def __init__(self, scope, id, *, prop1, prop2):
          super().__init__(scope, id, prop1=prop1, prop2=prop2)

          print(prop1)
  `);
});