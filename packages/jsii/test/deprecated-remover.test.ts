import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { compileJsiiForTest, HelperCompilationResult } from '../lib';

const DEPRECATED = '/** @deprecated stripped */';

test('produces correct output', () => {
  const result = compileJsiiForTest(
    MULTI_FILE_EXAMPLE,
    undefined /* callback */,
    { stripDeprecated: true },
  );
  expect(result.assembly.types).toMatchInlineSnapshot(`
    {
      "testpkg.GrandChild": {
        "assembly": "testpkg",
        "base": "testpkg.Retained",
        "fqn": "testpkg.GrandChild",
        "initializer": {},
        "interfaces": [
          "testpkg.IRetainedInterface",
        ],
        "kind": "class",
        "locationInModule": {
          "filename": "mixed.ts",
          "line": 11,
        },
        "methods": [
          {
            "locationInModule": {
              "filename": "mixed.ts",
              "line": 12,
            },
            "name": "retainedMethod",
          },
        ],
        "name": "GrandChild",
        "symbolId": "mixed:GrandChild",
      },
      "testpkg.IRetainedInterface": {
        "assembly": "testpkg",
        "fqn": "testpkg.IRetainedInterface",
        "kind": "interface",
        "locationInModule": {
          "filename": "retained.ts",
          "line": 2,
        },
        "name": "IRetainedInterface",
        "symbolId": "retained:IRetainedInterface",
      },
      "testpkg.Retained": {
        "abstract": true,
        "assembly": "testpkg",
        "fqn": "testpkg.Retained",
        "initializer": {},
        "kind": "class",
        "locationInModule": {
          "filename": "mixed.ts",
          "line": 4,
        },
        "name": "Retained",
        "properties": [
          {
            "immutable": true,
            "locationInModule": {
              "filename": "mixed.ts",
              "line": 7,
            },
            "name": "retained",
            "type": {
              "primitive": "string",
            },
          },
        ],
        "symbolId": "mixed:Retained",
      },
      "testpkg.RetainedClass": {
        "assembly": "testpkg",
        "fqn": "testpkg.RetainedClass",
        "initializer": {},
        "kind": "class",
        "locationInModule": {
          "filename": "retained.ts",
          "line": 3,
        },
        "name": "RetainedClass",
        "symbolId": "retained:RetainedClass",
      },
      "testpkg.SomeEnum": {
        "assembly": "testpkg",
        "fqn": "testpkg.SomeEnum",
        "kind": "enum",
        "locationInModule": {
          "filename": "enums.ts",
          "line": 2,
        },
        "members": [
          {
            "name": "VALUE_RETAINED",
          },
        ],
        "name": "SomeEnum",
        "symbolId": "enums:SomeEnum",
      },
    }
  `);
  expect(declFilesSnapshot(result)).toMatchInlineSnapshot(`
    "//////////////////
    /// index.d.ts ///
    import './deprecated';
    export * from './retained';
    export * from './enums';
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
    /// enums.d.ts ///
    export declare enum SomeEnum {
        VALUE_RETAINED = 0
    }
    //////////////////


    //////////////////
    /// mixed.d.ts ///
    import * as retained_1 from "./retained";
    import { IRetainedInterface } from './retained';
    export declare abstract class Retained {
        readonly retained = "YEAH";
    }
    export declare class GrandChild extends Retained implements retained_1.IRetainedInterface {
        retainedMethod(): void;
    }
    //////////////////
    "
  `);
});

test('cross-file deprecated heritage', () => {
  const result = compileJsiiForTest(
    {
      'index.ts': `
        import { IDeprecated } from './deprecated';
        export * from './deprecated';
        export interface INotDeprecated extends IDeprecated {}
      `,
      'deprecated.ts': `
        ${DEPRECATED}
        export interface IDeprecated {}
      `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );

  expect(declFilesSnapshot(result)).toMatchInlineSnapshot(`
    "//////////////////
    /// index.d.ts ///
    import './deprecated';
    import './deprecated';
    export interface INotDeprecated {
    }
    //////////////////


    ///////////////////////
    /// deprecated.d.ts ///
    ///////////////////////
    "
  `);
});

describe('stripDeprecatedAllowList', () => {
  test('strips all if all FQNs are present in the allowList', () => {
    const tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'jsiideprecatedremover'),
    );
    const stripDeprecatedAllowListFile = path.join(tmpDir, 'allowList');
    fs.writeFileSync(
      stripDeprecatedAllowListFile,
      [
        'testpkg.IDeprecatedInterface',
        'testpkg.DeprecatedClass',
        'testpkg.SomeEnum#VALUE_DEPRECATED',
        'testpkg.DeprecatedEnum',
        'testpkg.Retained#deprecated',
        'testpkg.Deprecated',
        'testpkg.GrandChild#deprecatedMethod',
      ].join('\n'),
      'utf8',
    );

    const resultWithoutAllowList = compileJsiiForTest(
      MULTI_FILE_EXAMPLE,
      undefined /* callback */,
      { stripDeprecated: true },
    );
    const resultWithAllowList = compileJsiiForTest(
      MULTI_FILE_EXAMPLE,
      undefined /* callback */,
      { stripDeprecated: true, stripDeprecatedAllowListFile },
    );

    expect(resultWithAllowList.assembly.types).toEqual(
      resultWithoutAllowList.assembly.types,
    );
    expect(declFilesSnapshot(resultWithAllowList)).toEqual(
      declFilesSnapshot(resultWithoutAllowList),
    );
  });

  test('strips none if the allowList is empty', () => {
    const tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'jsiideprecatedremover'),
    );
    const stripDeprecatedAllowListFile = path.join(tmpDir, 'allowList');
    // Valid but empty file
    fs.writeFileSync(stripDeprecatedAllowListFile, '', 'utf8');

    const resultNoStrip = compileJsiiForTest(
      MULTI_FILE_EXAMPLE,
      undefined /* callback */,
      { stripDeprecated: false },
    );
    const resultStripEmpty = compileJsiiForTest(
      MULTI_FILE_EXAMPLE,
      undefined /* callback */,
      { stripDeprecated: true, stripDeprecatedAllowListFile },
    );

    expect(resultStripEmpty.assembly.types).toEqual(
      resultNoStrip.assembly.types,
    );
    expect(declFilesSnapshot(resultStripEmpty)).toEqual(
      declFilesSnapshot(resultNoStrip),
    );
  });

  test('strips only allowlisted items if subset is present', () => {
    const tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'jsiideprecatedremover'),
    );
    const stripDeprecatedAllowListFile = path.join(tmpDir, 'allowList');
    fs.writeFileSync(
      stripDeprecatedAllowListFile,
      [
        'testpkg.IDeprecatedInterface',
        'testpkg.SomeEnum#VALUE_DEPRECATED',
        'testpkg.GrandChild#deprecatedMethod',
      ].join('\n'),
      'utf8',
    );

    const result = compileJsiiForTest(
      MULTI_FILE_EXAMPLE,
      undefined /* callback */,
      { stripDeprecated: true, stripDeprecatedAllowListFile },
    );

    expect(result.assembly.types).toMatchInlineSnapshot(`
      {
        "testpkg.Deprecated": {
          "assembly": "testpkg",
          "base": "testpkg.Retained",
          "docs": {
            "deprecated": "stripped",
            "stability": "deprecated",
          },
          "fqn": "testpkg.Deprecated",
          "initializer": {},
          "interfaces": [
            "testpkg.IRetainedInterface",
          ],
          "kind": "class",
          "locationInModule": {
            "filename": "mixed.ts",
            "line": 10,
          },
          "name": "Deprecated",
          "symbolId": "mixed:Deprecated",
        },
        "testpkg.DeprecatedClass": {
          "assembly": "testpkg",
          "docs": {
            "deprecated": "stripped",
            "stability": "deprecated",
          },
          "fqn": "testpkg.DeprecatedClass",
          "initializer": {},
          "kind": "class",
          "locationInModule": {
            "filename": "deprecated.ts",
            "line": 5,
          },
          "name": "DeprecatedClass",
          "symbolId": "deprecated:DeprecatedClass",
        },
        "testpkg.DeprecatedEnum": {
          "assembly": "testpkg",
          "docs": {
            "deprecated": "stripped",
            "stability": "deprecated",
          },
          "fqn": "testpkg.DeprecatedEnum",
          "kind": "enum",
          "locationInModule": {
            "filename": "enums.ts",
            "line": 8,
          },
          "members": [
            {
              "docs": {
                "stability": "deprecated",
              },
              "name": "VALUE_ONE",
            },
            {
              "docs": {
                "stability": "deprecated",
              },
              "name": "VALUE_TWO",
            },
          ],
          "name": "DeprecatedEnum",
          "symbolId": "enums:DeprecatedEnum",
        },
        "testpkg.GrandChild": {
          "assembly": "testpkg",
          "base": "testpkg.Deprecated",
          "fqn": "testpkg.GrandChild",
          "initializer": {},
          "kind": "class",
          "locationInModule": {
            "filename": "mixed.ts",
            "line": 11,
          },
          "methods": [
            {
              "locationInModule": {
                "filename": "mixed.ts",
                "line": 12,
              },
              "name": "retainedMethod",
            },
          ],
          "name": "GrandChild",
          "symbolId": "mixed:GrandChild",
        },
        "testpkg.IRetainedInterface": {
          "assembly": "testpkg",
          "fqn": "testpkg.IRetainedInterface",
          "kind": "interface",
          "locationInModule": {
            "filename": "retained.ts",
            "line": 2,
          },
          "name": "IRetainedInterface",
          "symbolId": "retained:IRetainedInterface",
        },
        "testpkg.Retained": {
          "abstract": true,
          "assembly": "testpkg",
          "fqn": "testpkg.Retained",
          "initializer": {},
          "kind": "class",
          "locationInModule": {
            "filename": "mixed.ts",
            "line": 4,
          },
          "name": "Retained",
          "properties": [
            {
              "docs": {
                "deprecated": "stripped",
                "stability": "deprecated",
              },
              "immutable": true,
              "locationInModule": {
                "filename": "mixed.ts",
                "line": 6,
              },
              "name": "deprecated",
              "type": {
                "primitive": "number",
              },
            },
            {
              "immutable": true,
              "locationInModule": {
                "filename": "mixed.ts",
                "line": 7,
              },
              "name": "retained",
              "type": {
                "primitive": "string",
              },
            },
          ],
          "symbolId": "mixed:Retained",
        },
        "testpkg.RetainedClass": {
          "assembly": "testpkg",
          "fqn": "testpkg.RetainedClass",
          "initializer": {},
          "kind": "class",
          "locationInModule": {
            "filename": "retained.ts",
            "line": 3,
          },
          "name": "RetainedClass",
          "symbolId": "retained:RetainedClass",
        },
        "testpkg.SomeEnum": {
          "assembly": "testpkg",
          "fqn": "testpkg.SomeEnum",
          "kind": "enum",
          "locationInModule": {
            "filename": "enums.ts",
            "line": 2,
          },
          "members": [
            {
              "name": "VALUE_RETAINED",
            },
          ],
          "name": "SomeEnum",
          "symbolId": "enums:SomeEnum",
        },
      }
    `);
    expect(declFilesSnapshot(result)).toMatchInlineSnapshot(`
      "//////////////////
      /// index.d.ts ///
      export * from './deprecated';
      export * from './retained';
      export * from './enums';
      export { Deprecated, GrandChild, Retained } from './mixed';
      //////////////////


      ///////////////////////
      /// deprecated.d.ts ///
      /** @deprecated stripped */
      export declare class DeprecatedClass {
      }
      ///////////////////////


      /////////////////////
      /// retained.d.ts ///
      export interface IRetainedInterface {
      }
      export declare class RetainedClass {
      }
      /////////////////////


      //////////////////
      /// enums.d.ts ///
      export declare enum SomeEnum {
          VALUE_RETAINED = 0
      }
      /** @deprecated stripped */
      export declare enum DeprecatedEnum {
          VALUE_ONE = 0,
          VALUE_TWO = 1
      }
      //////////////////


      //////////////////
      /// mixed.d.ts ///
      import { IRetainedInterface } from './retained';
      export declare abstract class Retained {
          /** @deprecated stripped */
          readonly deprecated = 1337;
          readonly retained = "YEAH";
      }
      /** @deprecated stripped */
      export declare class Deprecated extends Retained implements IRetainedInterface {
      }
      export declare class GrandChild extends Deprecated {
          retainedMethod(): void;
      }
      //////////////////
      "
    `);
  });
});

function declFilesSnapshot(result: HelperCompilationResult) {
  return Object.entries(result.files)
    .filter(([name]) => name.endsWith('.d.ts'))
    .map(([name, content]) => {
      const separator = '/'.repeat(name.length + 8);
      return `${separator}\n/// ${name} ///\n${content}${separator}\n`;
    })
    .join('\n\n');
}

const MULTI_FILE_EXAMPLE = {
  'index.ts': `
    export * from './deprecated';
    export * from './retained';
    export * from './enums';
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
  'enums.ts': `
    export enum SomeEnum {
      VALUE_RETAINED,
      ${DEPRECATED}
      VALUE_DEPRECATED,
    }
    ${DEPRECATED}
    export enum DeprecatedEnum { VALUE_ONE, VALUE_TWO }
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
};
