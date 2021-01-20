import { compileJsiiForTest } from '../lib';

const DEPRECATED = '/** @deprecated stripped */';

test('produces correct output', async () => {
  const result = await compileJsiiForTest(
    {
      'index.ts': `
        export * from './deprecated';
        export * from './retained';
        export { Deprecated, GrandChild, Retained } from './mixed';
      `,
      'deprecated.ts': `
        ${DEPRECATED}
        export interface IDeprecatedInterface {}
        ${DEPRECATED}
        export class DeprecatedClass {}
      `,
      'retained.ts': `
        export interface IRetainedInterface {}
        export class RetainedClass {}
      `,
      'mixed.ts': `
        import { IRetainedInterface } from './retained';

        export abstract class Retained {
          ${DEPRECATED}
          readonly deprecated = 1337;
          readonly retained = 'YEAH';
        }
        ${DEPRECATED}
        export class Deprecated extends Retained implements IRetainedInterface {}
        export class GrandChild extends Deprecated {
          public retainedMethod(): void {}
          ${DEPRECATED}
          public deprecatedMethod(): void {}
        }
      `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );
  expect(result.assembly.types).toMatchInlineSnapshot(`
    Object {
      "testpkg.GrandChild": Object {
        "assembly": "testpkg",
        "base": "testpkg.Retained",
        "fqn": "testpkg.GrandChild",
        "initializer": Object {},
        "interfaces": Array [
          "testpkg.IRetainedInterface",
        ],
        "kind": "class",
        "locationInModule": Object {
          "filename": "mixed.ts",
          "line": 11,
        },
        "methods": Array [
          Object {
            "locationInModule": Object {
              "filename": "mixed.ts",
              "line": 12,
            },
            "name": "retainedMethod",
          },
        ],
        "name": "GrandChild",
      },
      "testpkg.IRetainedInterface": Object {
        "assembly": "testpkg",
        "fqn": "testpkg.IRetainedInterface",
        "kind": "interface",
        "locationInModule": Object {
          "filename": "retained.ts",
          "line": 2,
        },
        "name": "IRetainedInterface",
      },
      "testpkg.Retained": Object {
        "abstract": true,
        "assembly": "testpkg",
        "fqn": "testpkg.Retained",
        "initializer": Object {},
        "kind": "class",
        "locationInModule": Object {
          "filename": "mixed.ts",
          "line": 4,
        },
        "name": "Retained",
        "properties": Array [
          Object {
            "immutable": true,
            "locationInModule": Object {
              "filename": "mixed.ts",
              "line": 7,
            },
            "name": "retained",
            "type": Object {
              "primitive": "string",
            },
          },
        ],
      },
      "testpkg.RetainedClass": Object {
        "assembly": "testpkg",
        "fqn": "testpkg.RetainedClass",
        "initializer": Object {},
        "kind": "class",
        "locationInModule": Object {
          "filename": "retained.ts",
          "line": 3,
        },
        "name": "RetainedClass",
      },
    }
  `);
  expect(
    Object.entries(result.files)
      .filter(([name]) => name.endsWith('.d.ts'))
      .map(([name, content]) => {
        const separator = '/'.repeat(name.length + 8);
        return `${separator}\n/// ${name} ///\n${content}${separator}\n`;
      })
      .join('\n\n'),
  ).toMatchInlineSnapshot(`
    "//////////////////
    /// index.d.ts ///
    import './deprecated';
    export * from './retained';
    export { GrandChild, Retained } from './mixed';
    //////////////////


    ///////////////////////
    /// deprecated.d.ts ///
    ///////////////////////


    /////////////////////
    /// retained.d.ts ///
    export interface IRetainedInterface {
    }
    export declare class RetainedClass {
    }
    /////////////////////


    //////////////////
    /// mixed.d.ts ///
    import * as retained_1 from \\"./retained\\";
    import { IRetainedInterface } from './retained';
    export declare abstract class Retained {
        readonly retained = \\"YEAH\\";
    }
    export declare class GrandChild extends Retained implements retained_1.IRetainedInterface {
        retainedMethod(): void;
    }
    //////////////////
    "
  `);
});
