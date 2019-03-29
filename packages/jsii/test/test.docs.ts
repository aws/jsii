import spec = require('jsii-spec');
import { Test } from 'nodeunit';
import { sourceToAssemblyHelper as compile } from '../lib';

export = {

  // ----------------------------------------------------------------------
  async 'extract summary line from doc block, ends with a period'(test: Test) {
    const assembly = await compile(`
      /**
       * Hello this is the documentation for this class
       */
      export class Foo {
        public foo() { }
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'].docs , {
      summary: 'Hello this is the documentation for this class.'
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'extract remarks from whitespace-separated doc block'(test: Test) {
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

    test.deepEqual(assembly.types!['testpkg.Foo'].docs!.remarks,
      'Here are some more details about it.\n\nIt looks pretty good, doesn\'t it?'
    );

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'separate long doc comment into summary and remarks'(test: Test) {
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

    test.deepEqual(assembly.types!['testpkg.Foo'].docs , {
      summary: 'Lots of people enjoy writing very long captions here.',
      remarks: `I think it's because they\ncopy/paste them out of CloudFormation, which has a tendency to just have one\n` +
               `doc block per API item and no structural separation.`,
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'parse method docs'(test: Test) {
    const assembly = await compile(`
      export class Foo {
        /**
         * Do the foo
         */
        public foo(arg: string) { Array.isArray(arg); }
      }
    `);

    const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

    test.deepEqual(classType.methods![0].docs, {
      summary: 'Do the foo.'
    });
    test.done();
  },

  // ----------------------------------------------------------------------
  async 'associate parameter comments with right parameter'(test: Test) {
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

    test.deepEqual(classType.methods![0].parameters![0].docs, {
      summary: 'First argument is best argument.',
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'read example'(test: Test) {
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

    test.deepEqual(classType.methods![0].docs!.example,
      '// Example of fooing it up:\n' +
      'new Foo().foo();'
    );

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'read default value'(test: Test) {
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

    test.deepEqual(classType.properties![0].docs!.default,
      'Some foo'
    );

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'read "see" annotation'(test: Test) {
    const assembly = await compile(`
      /**
       * @see http://lmgtfy.com/
       */
      export class Foo {
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'].docs!.seeLink,
      'http://lmgtfy.com/'
    );

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'read "returns" annotation'(test: Test) {
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

    test.deepEqual(classType.methods![0].docs!.returns,
      'Nothing, why would it?'
    );
    test.done();
  },

  // ----------------------------------------------------------------------
  async 'can haz deprecated'(test: Test) {
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

    test.deepEqual(classType.methods![0].docs!.deprecated,
      'These days we do the bar',
    );
    test.done();
  },

  // ----------------------------------------------------------------------
  async 'can mark stable'(test: Test) {
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

    test.deepEqual(classType.docs!.stability, spec.Stability.Stable);
    test.done();
  },

  // ----------------------------------------------------------------------
  async 'can mark experimental'(test: Test) {
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

    test.deepEqual(classType.docs!.stability, spec.Stability.Experimental);
    test.done();
  },

  // ----------------------------------------------------------------------
  async 'can add arbitrary tags'(test: Test) {
    const assembly = await compile(`
      /**
       * @boop
       */
      export class Foo {
      }
    `);

    const classType = assembly.types!['testpkg.Foo'] as spec.ClassType;

    test.deepEqual(classType.docs!.custom, { boop: 'true' });
    test.done();
  },
};