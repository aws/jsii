import * as spec from '@jsii/spec';
import { Stability } from '@jsii/spec';

import { sourceToAssemblyHelper as compile } from '../lib';

jest.setTimeout(60_000);

// ----------------------------------------------------------------------
test('extract summary line from doc block, ends with a period', () => {
  const assembly = compile(`
    /**
     * Hello this is the documentation for this class
     */
    export class Foo {
      public bar() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: 'Hello this is the documentation for this class.',
  });
});

// ----------------------------------------------------------------------
test('extract remarks from whitespace-separated doc block', () => {
  const assembly = compile(`
    /**
     * Hello this is the documentation for this class.
     *
     * Here are some more details about it.
     *
     * It looks pretty good, doesn't it?
     */
    export class Foo {
      public bar() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs!.remarks).toBe(
    "Here are some more details about it.\n\nIt looks pretty good, doesn't it?",
  );
});

// ----------------------------------------------------------------------
test('separate long doc comment into summary and remarks', () => {
  const assembly = compile(`
    /**
     * Lots of people enjoy writing very long captions here. I think it's because they
     * copy/paste them out of CloudFormation, which has a tendency to just have one
     * doc block per API item and no structural separation.
     */
    export class Foo {
      public bar() { }
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
test('separate non-space but newline terminated docs into summary&remarks', () => {
  const assembly = compile(`
    /**
     * Lots of people enjoy writing very long captions here.
     * I think it's because they copy/paste them out of CloudFormation,
     * which has a tendency to just have one
     * doc block per API item and no structural separation.
     */
    export class Foo {
      public bar() { }
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
test('dont add period to summary that ends in exclamation mark', () => {
  const assembly = compile(`
    /**
     * I'm happy about this class!
     */
    export class Foo {
      public bar() { }
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs).toEqual({
    summary: "I'm happy about this class!",
  });
});

// ----------------------------------------------------------------------
test('parse method docs', () => {
  const assembly = compile(`
    export class Foo {
      /**
       * Do the foo
       */
      public bar(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs).toEqual({
    summary: 'Do the foo.',
  });
});

// ----------------------------------------------------------------------
test('associate parameter comments with right parameter', () => {
  const assembly = compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @param arg First argument is best argument
       */
      public bar(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].parameters![0].docs).toEqual({
    summary: 'First argument is best argument.',
  });
});

// ----------------------------------------------------------------------
test('read example', () => {
  const assembly = compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @example
       *
       * // Example of fooing it up:
       * new Foo().bar();
       */
      public bar() {}
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.example).toBe(
    '// Example of fooing it up:\n' + 'new Foo().bar();',
  );
});

// ----------------------------------------------------------------------
test('read default value', () => {
  const assembly = compile(`
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
test('read "see" annotation', () => {
  const assembly = compile(`
    /**
     * @see http://lmgtfy.com/
     */
    export class Foo {
    }
  `);

  expect(assembly.types!['testpkg.Foo'].docs!.see).toBe('http://lmgtfy.com/');
});

// ----------------------------------------------------------------------
test('read "returns" annotation', () => {
  const assembly = compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @returns Nothing, why would it?
       */
      public bar(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.returns).toBe('Nothing, why would it?');
});

// ----------------------------------------------------------------------
test('can haz deprecated', () => {
  const assembly = compile(`
    export class Foo {
      /**
       * Do the foo
       *
       * @deprecated These days we do the bar
       */
      public bar(arg: string) { Array.isArray(arg); }
    }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

  expect(classType.methods![0].docs!.deprecated).toBe(
    'These days we do the bar',
  );
});

// ----------------------------------------------------------------------
test('can mark stable', () => {
  const assembly = compile(`
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
test('can mark experimental', () => {
  const assembly = compile(`
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

test('can mark external', () => {
  const assembly = compile(`
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
test('can mark subclassable', () => {
  const assembly = compile(`
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
test('can add arbitrary tags', () => {
  const assembly = compile(`
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
test('stability is inherited from parent type', () => {
  const stabilities = [
    ['@deprecated Not good no more', Stability.Deprecated],
    ['@experimental', Stability.Experimental],
    ['@stable', Stability.Stable],
  ];

  for (const [tag, stability] of stabilities) {
    // eslint-disable-next-line no-await-in-loop
    const assembly = compile(`
      /**
       * ${tag}
       */
      export class Foo {
        constructor() {
          Array.isArray(3);
        }

        public bar() {
          Array.isArray(3);
        }
      }
    `);
    /* eslint-enable no-await-in-loop */

    const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;
    const initializer = classType.initializer!;
    const method = classType.methods!.find((m) => m.name === 'bar')!;

    expect(classType.docs!.stability).toBe(stability);
    expect(initializer.docs!.stability).toBe(stability);
    expect(method.docs!.stability).toBe(stability);
  }
});

// ----------------------------------------------------------------------
test('@example can contain @ sign', () => {
  const assembly = compile(`
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

// ----------------------------------------------------------------------
test('replace @link tags with inline code blocks', () => {
  const assembly = compile(`
    export interface IFoo { }

    /**
     * Hello this is the documentation for {@link Foo},
     * which implements { @link    IFoo    }.
     * 
     * @deprecated - Use {@link Bar} instead.
     */
    export class Foo implements IFoo {
      /**
       * Do the {@link Foo}
       *
       * @param arg First argument is best argument, {@link Bar} none
       */
      public bar(arg: string) { Array.isArray(arg); }
    }

    export class Bar { }
  `);

  const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;
  expect(classType.docs).toEqual({
    summary:
      'Hello this is the documentation for `Foo`, which implements `IFoo`.',
    stability: 'deprecated',
    deprecated: '- Use `Bar` instead.',
  });

  console.log(classType.methods);

  expect(classType.methods![0]).toMatchObject({
    docs: { summary: 'Do the `Foo`.' },
    parameters: [
      {
        name: 'arg',
        docs: {
          summary: 'First argument is best argument, `Bar` none.',
        },
      },
    ],
  });
});
