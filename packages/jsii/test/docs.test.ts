import * as spec from '@jsii/spec';
import { Stability } from '@jsii/spec';
import { sourceToAssemblyHelper as compile } from '../lib';

jest.setTimeout(60_000);

// ----------------------------------------------------------------------
test('extract summary line from doc block, ends with a period', async () => {
  const assembly = await compile(`
    /**
     * Hello this is the documentation for this class
     */
    export class Foo {
      public foo() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: 'Hello this is the documentation for this class.',
  });
});

// ----------------------------------------------------------------------
test('extract remarks from whitespace-separated doc block', async () => {
  const assembly = await compile(`
    /**
     * Hello this is the documentation for this class.
     *
     * Here are some more details about it.
     *
     * It looks pretty good, doesn't it?
     */
    export class Foo {
      public foo() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs!.remarks).toBe(
    "Here are some more details about it.\n\nIt looks pretty good, doesn't it?",
  );
});

// ----------------------------------------------------------------------
test('separate long doc comment into summary and remarks', async () => {
  const assembly = await compile(`
    /**
     * Lots of people enjoy writing very long captions here. I think it's because they
     * copy/paste them out of CloudFormation, which has a tendency to just have one
     * doc block per API item and no structural separation.
     */
    export class Foo {
      public foo() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: 'Lots of people enjoy writing very long captions here.',
    remarks:
      "I think it's because they\ncopy/paste them out of CloudFormation, which has a tendency to just have one\n" +
      'doc block per API item and no structural separation.',
  });
});

// ----------------------------------------------------------------------
test('separate non-space but newline terminated docs into summary&remarks', async () => {
  const assembly = await compile(`
    /**
     * Lots of people enjoy writing very long captions here.
     * I think it's because they copy/paste them out of CloudFormation,
     * which has a tendency to just have one
     * doc block per API item and no structural separation.
     */
    export class Foo {
      public foo() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: 'Lots of people enjoy writing very long captions here.',
    remarks:
      "I think it's because they copy/paste them out of CloudFormation,\nwhich has a tendency to just have one\n" +
      'doc block per API item and no structural separation.',
  });
});

// ----------------------------------------------------------------------
test('dont add period to summary that ends in exclamation mark', async () => {
  const assembly = await compile(`
    /**
     * I'm happy about this class!
     */
    export class Foo {
      public foo() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: "I'm happy about this class!",
  });
});

// ----------------------------------------------------------------------
test('parse method docs', async () => {
  const assembly = await compile(`
    export class Foo {
      /**
       * Do the foo
       */
      public foo(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs).toEqual({
    summary: 'Do the foo.',
  });
});

// ----------------------------------------------------------------------
test('associate parameter comments with right parameter', async () => {
  const assembly = await compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @param arg First argument is best argument
       */
      public foo(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].parameters![0].docs).toEqual({
    summary: 'First argument is best argument.',
  });
});

// ----------------------------------------------------------------------
test('read example', async () => {
  const assembly = await compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @example
       *
       * // Example of fooing it up:
       * new Foo().foo();
       */
      public foo() {}
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.example).toBe(
    '// Example of fooing it up:\n' + 'new Foo().foo();',
  );
});

// ----------------------------------------------------------------------
test('read default value', async () => {
  const assembly = await compile(`
    export interface Foo {
      /**
       * The foo we're talking about
       *
       * @default Some foo
       */
      readonly foo?: string;
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.InterfaceType;

  expect(classType.properties![0].docs!.default).toBe('Some foo');
});

// ----------------------------------------------------------------------
test('read "see" annotation', async () => {
  const assembly = await compile(`
    /**
     * @see http://lmgtfy.com/
     */
    export class Foo {
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs!.see).toBe('http://lmgtfy.com/');
});

// ----------------------------------------------------------------------
test('read "returns" annotation', async () => {
  const assembly = await compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @returns Nothing, why would it?
       */
      public foo(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.returns).toBe('Nothing, why would it?');
});

// ----------------------------------------------------------------------
test('can haz deprecated', async () => {
  const assembly = await compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @deprecated These days we do the bar
       */
      public foo(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.deprecated).toBe(
    'These days we do the bar',
  );
});

// ----------------------------------------------------------------------
test('can mark stable', async () => {
  const assembly = await compile(`
    /**
     * Rock solid Foo
     *
     * @stable
     */
    export class Foo {
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.docs!.stability).toBe(spec.Stability.Stable);
});

// ----------------------------------------------------------------------
test('can mark experimental', async () => {
  const assembly = await compile(`
    /**
     * Slightly less solid Foo
     *
     * @experimental
     */
    export class Foo {
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.docs!.stability).toBe(spec.Stability.Experimental);
});

// ----------------------------------------------------------------------

test('can mark external', async () => {
  const assembly = await compile(`
    /**
     * @stability external
     */
    export class Foo {
      public floop() {
        Array.isArray(3);
      }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;
  const method = classType.methods!.find((m) => m.name === 'floop');

  expect(classType.docs!.stability).toBe(spec.Stability.External);
  expect(method!.docs!.stability).toBe(spec.Stability.External);
});

// ----------------------------------------------------------------------
test('can mark subclassable', async () => {
  const assembly = await compile(`
    /**
     * Become this Foo
     *
     * @subclassable
     */
    export class Foo {
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.docs!.subclassable).toBeTruthy();
});

// ----------------------------------------------------------------------
test('can add arbitrary tags', async () => {
  const assembly = await compile(`
    /**
     * @boop
     */
    export class Foo {
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.docs!.custom).toEqual({ boop: 'true' });
});

// ----------------------------------------------------------------------
test('stability is inherited from parent type', async () => {
  const stabilities = [
    ['@deprecated Not good no more', Stability.Deprecated],
    ['@experimental', Stability.Experimental],
    ['@stable', Stability.Stable],
  ];

  for (const [tag, stability] of stabilities) {
    // eslint-disable-next-line no-await-in-loop
    const assembly = await compile(`
      /**
       * ${tag}
       */
      export class Foo {
        constructor() {
          Array.isArray(3);
        }

        public foo() {
          Array.isArray(3);
        }
      }
    `);
    /* eslint-enable no-await-in-loop */

    const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;
    const initializer = classType.initializer!;
    const method = classType.methods!.find((m) => m.name === 'foo')!;

    expect(classType.docs!.stability).toBe(stability);
    expect(initializer.docs!.stability).toBe(stability);
    expect(method.docs!.stability).toBe(stability);
  }
});

// ----------------------------------------------------------------------
test('@example can contain @ sign', async () => {
  const assembly = await compile(`
    /**
     * An IAM role to associate with the instance profile assigned to this Auto Scaling Group.
     *
     * @example
     *
     * import * as x from '@banana';
     */
    export class Foo {
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;
  expect(classType.docs!.example).toBe("import * as x from '@banana';");
});
