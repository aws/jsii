import { SPEC_FILE_NAME } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as jsii from 'jsii';
import * as path from 'path';

import { transliterateAssembly } from '../../lib/commands/transliterate';
import { TargetLanguage } from '../../lib/languages/target-language';
import { withTemporaryDirectory } from '../testutil';

jest.setTimeout(60_000);

test('single assembly, all languages', () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = await jsii.compileJsiiForTest({
      'README.md': `
# README
\`\`\`ts
const object: IInterface = new ClassName('this', 1337, { foo: 'bar' });
object.property = EnumType.OPTION_A;
object.methodCall();

ClassName.staticMethod(EnumType.OPTION_B);
\`\`\`
`,
      'index.ts': `
/**
 * @example new ClassName('this', 1337, { property: EnumType.OPTION_B });
 */
export enum EnumType {
  /**
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_A });
   */
  OPTION_A = 1,

  /**
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_B });
   */
  OPTION_B = 2,
}

export interface IInterface {
  /**
   * A property value.
   *
   * @example
   *    iface.property = EnumType.OPTION_B;
   */
  property: EnumType;

  /**
   * An instance method call.
   *
   * @example
   *    iface.methodCall();
   */
  methodCall(): void;
}

export interface ClassNameProps {
  readonly property?: EnumType;
  readonly foo?: string;
}

export class ClassName implements IInterface {
  /**
   * A static method. It can be invoked easily.
   *
   * @example ClassName.staticMethod();
   */
  public static staticMethod(_enm?: EnumType): void {
    // ...
  }

  public property: EnumType;

  /**
   * Create a new instance of ClassName.
   *
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_B });
   */
  public constructor(_this: string, _elite: number, props: ClassNameProps) {
    this.property = props.property ?? EnumType.OPTION_A;
  }

  public methodCall(): void {
    // ...
  }
}`,
    });
    fs.writeJsonSync(path.join(tmpDir, SPEC_FILE_NAME), compilationResult.assembly, {
      spaces: 2,
    });
    for (const [file, content] of Object.entries(compilationResult.files)) {
      fs.writeFileSync(path.resolve(tmpDir, file), content, 'utf-8');
    }
    fs.mkdirSync(path.resolve(tmpDir, 'rosetta'));
    fs.writeFileSync(
      path.resolve(tmpDir, 'rosetta', 'default.ts-fixture'),
      `import { EnumType, IInterface, ClassName } from '.';\ndeclare const iface: IInterface\n/// here`,
      'utf-8',
    );

    // WHEN
    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        strict: true,
      }),
    ).resolves.not.toThrow();

    // THEN
    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.csharp`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# README

      \`\`\`csharp
      // This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      IInterface object = new ClassName(\\"this\\", 1337, new ClassNameProps { Foo = \\"bar\\" });
      object.Property = EnumType.OPTION_A;
      object.MethodCall();

      ClassName.StaticMethod(EnumType.OPTION_B);
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.ClassName": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": Object {
              "docs": Object {
                "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": Array [
                Object {
                  "name": "_this",
                  "type": Object {
                    "primitive": "string",
                  },
                },
                Object {
                  "name": "_elite",
                  "type": Object {
                    "primitive": "number",
                  },
                },
                Object {
                  "name": "props",
                  "type": Object {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": Array [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": Array [
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      ClassName.StaticMethod();",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": Array [
                  Object {
                    "name": "_enm",
                    "optional": true,
                    "type": Object {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              Object {
                "docs": Object {
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": Array [
              Object {
                "docs": Object {
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": Object {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": Array [
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": Object {
                  "primitive": "string",
                },
              },
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 5,
            },
            "members": Array [
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps { Property = EnumType.OPTION_A });",
                },
                "name": "OPTION_A",
              },
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      iface.MethodCall();",
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      iface.Property = EnumType.OPTION_B;",
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:IInterface",
          },
        },
        "version": "0.0.1",
      }
    `,
    );
    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.java`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# README

      \`\`\`java
      // This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      IInterface object = new ClassName(\\"this\\", 1337, new ClassNameProps().foo(\\"bar\\"));
      object.getProperty() = EnumType.OPTION_A;
      object.methodCall();

      ClassName.staticMethod(EnumType.OPTION_B);
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.ClassName": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": Object {
              "docs": Object {
                "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": Array [
                Object {
                  "name": "_this",
                  "type": Object {
                    "primitive": "string",
                  },
                },
                Object {
                  "name": "_elite",
                  "type": Object {
                    "primitive": "number",
                  },
                },
                Object {
                  "name": "props",
                  "type": Object {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": Array [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": Array [
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      ClassName.staticMethod();",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": Array [
                  Object {
                    "name": "_enm",
                    "optional": true,
                    "type": Object {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              Object {
                "docs": Object {
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": Array [
              Object {
                "docs": Object {
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": Object {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": Array [
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": Object {
                  "primitive": "string",
                },
              },
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 5,
            },
            "members": Array [
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps().property(EnumType.OPTION_A));",
                },
                "name": "OPTION_A",
              },
              Object {
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new ClassName(\\"this\\", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      iface.methodCall();",
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "// This example was automatically transliterated.
      // See https://github.com/aws/jsii/issues/826 for more information.

      iface.getProperty() = EnumType.OPTION_B;",
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:IInterface",
          },
        },
        "version": "0.0.1",
      }
    `,
    );
    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.python`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# README

      \`\`\`python
      # This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      object = ClassName(\\"this\\", 1337, foo=\\"bar\\")
      object.property = EnumType.OPTION_A
      object.method_call()

      ClassName.static_method(EnumType.OPTION_B)
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.ClassName": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": Object {
              "docs": Object {
                "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      ClassName(\\"this\\", 1337, property=EnumType.OPTION_B)",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": Array [
                Object {
                  "name": "_this",
                  "type": Object {
                    "primitive": "string",
                  },
                },
                Object {
                  "name": "_elite",
                  "type": Object {
                    "primitive": "number",
                  },
                },
                Object {
                  "name": "props",
                  "type": Object {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": Array [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": Array [
              Object {
                "docs": Object {
                  "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      ClassName.static_method()",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": Array [
                  Object {
                    "name": "_enm",
                    "optional": true,
                    "type": Object {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              Object {
                "docs": Object {
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": Array [
              Object {
                "docs": Object {
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": Object {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": Array [
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": Object {
                  "primitive": "string",
                },
              },
              Object {
                "abstract": true,
                "immutable": true,
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      ClassName(\\"this\\", 1337, property=EnumType.OPTION_B)",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 5,
            },
            "members": Array [
              Object {
                "docs": Object {
                  "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      ClassName(\\"this\\", 1337, property=EnumType.OPTION_A)",
                },
                "name": "OPTION_A",
              },
              Object {
                "docs": Object {
                  "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      ClassName(\\"this\\", 1337, property=EnumType.OPTION_B)",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": Object {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      iface.method_call()",
                  "summary": "An instance method call.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": Array [
              Object {
                "abstract": true,
                "docs": Object {
                  "example": "# This example was automatically transliterated.
      # See https://github.com/aws/jsii/issues/826 for more information.

      iface.property = EnumType.OPTION_B",
                  "summary": "A property value.",
                },
                "locationInModule": Object {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": Object {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:IInterface",
          },
        },
        "version": "0.0.1",
      }
    `,
    );
  }));

test('single assembly, loose mode', () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = await jsii.compileJsiiForTest({
      'README.md': `
# Missing literate source

[ts source is not found](missing-example.lit.ts)

# Missing literate source and fallback

[example is not found](omit-example.lit.ts)

# Missing fixture

\`\`\`ts fixture=not-found
new SampleClass('README.md');
\`\`\`
`,
      'index.ts': `
/**
 * @example
 *   /// fixture=not-found
 *   new DoesNotCompile(this, 'That', { foo: 1337 });
 */
export class SampleClass {
  public constructor(_source: string){ }
}
`,
      // The `lit.ts` source file will not be there in packaged form...
      'missing-example.lit.ts': `
import { SampleClass } from './index';

/// !show
/// ## This is a heading within the literate file!
new SampleClass('literate');
      `,
      // The `lit.ts`  source file and `lit.js` output will not be there in packaged form...
      'omit-example.lit.ts': `
import { SampleClass } from './index';

/// !show
/// ## This is a heading within the omitted literate file!
new SampleClass('omitted-literate');
      `,
    });
    fs.writeJsonSync(path.join(tmpDir, SPEC_FILE_NAME), compilationResult.assembly, {
      spaces: 2,
    });
    for (const [file, content] of Object.entries(compilationResult.files)) {
      if (file.startsWith('omit-')) {
        continue;
      }
      fs.writeFileSync(path.resolve(tmpDir, file), content, 'utf-8');
    }

    // WHEN
    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        loose: true,
      }),
    ).resolves.not.toThrow();

    // THEN
    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.csharp`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`csharp
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"literate\\");
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`csharp
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"omitted-literate\\");
      \`\`\`

      # Missing fixture

      \`\`\`csharp
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"README.md\\");
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.SampleClass": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "// This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new DoesNotCompile(this, \\"That\\", new Struct { Foo = 1337 });",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": Object {
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": Array [
                Object {
                  "name": "_source",
                  "type": Object {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 7,
            },
            "name": "SampleClass",
            "symbolId": "index:SampleClass",
          },
        },
        "version": "0.0.1",
      }
    `,
    );

    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.java`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`java
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"literate\\");
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`java
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"omitted-literate\\");
      \`\`\`

      # Missing fixture

      \`\`\`java
      // This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      new SampleClass(\\"README.md\\");
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.SampleClass": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "// This example was automatically transliterated with incomplete type information. It may not work as-is.
      // See https://github.com/aws/jsii/issues/826 for more information.

      DoesNotCompile.Builder.create(this, \\"That\\").foo(1337).build();",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": Object {
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": Array [
                Object {
                  "name": "_source",
                  "type": Object {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 7,
            },
            "name": "SampleClass",
            "symbolId": "index:SampleClass",
          },
        },
        "version": "0.0.1",
      }
    `,
    );

    expect(fs.readJsonSync(path.join(tmpDir, `${SPEC_FILE_NAME}.python`))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
      },
      `
      Object {
        "author": Object {
          "name": "John Doe",
          "roles": Array [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": Object {
          "jsii": Object {
            "pacmak": Object {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": Object {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`python
      # This example was automatically transliterated with incomplete type information. It may not work as-is.
      # See https://github.com/aws/jsii/issues/826 for more information.

      SampleClass(\\"literate\\")
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`python
      # This example was automatically transliterated with incomplete type information. It may not work as-is.
      # See https://github.com/aws/jsii/issues/826 for more information.

      SampleClass(\\"omitted-literate\\")
      \`\`\`

      # Missing fixture

      \`\`\`python
      # This example was automatically transliterated with incomplete type information. It may not work as-is.
      # See https://github.com/aws/jsii/issues/826 for more information.

      SampleClass(\\"README.md\\")
      \`\`\`",
        },
        "repository": Object {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Object {
          "js": Object {
            "npm": "testpkg",
          },
        },
        "types": Object {
          "testpkg.SampleClass": Object {
            "assembly": "testpkg",
            "docs": Object {
              "example": "# This example was automatically transliterated with incomplete type information. It may not work as-is.
      # See https://github.com/aws/jsii/issues/826 for more information.

      DoesNotCompile(self, \\"That\\", foo=1337)",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": Object {
              "locationInModule": Object {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": Array [
                Object {
                  "name": "_source",
                  "type": Object {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": Object {
              "filename": "index.ts",
              "line": 7,
            },
            "name": "SampleClass",
            "symbolId": "index:SampleClass",
          },
        },
        "version": "0.0.1",
      }
    `,
    );
  }));

test('single assembly with example metadata', () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = await jsii.compileJsiiForTest({
      'index.ts': `
/**
 * @exampleMetadata fixture=custom
 * @example
 * const object: IInterface = new ClassName('this', 1337, { foo: 'bar' });
 * object.property = EnumType.OPTION_A;
 * object.methodCall();
 */
export enum EnumType {
  /**
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_A });
   */
  OPTION_A = 1,

  /**
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_B });
   */
  OPTION_B = 2,
}

export interface IInterface {
  /**
   * A property value.
   *
   * @exampleMetadata nofixture
   * @example
   * import { EnumType, IInterface, ClassName } from '.';
   * declare const iface: IInterface;
   * iface.property = EnumType.OPTION_A;
   */
  property: EnumType;

  /**
   * An instance method call.
   *
   * @example
   *    iface.methodCall();
   */
  methodCall(): void;
}

export interface ClassNameProps {
  readonly property?: EnumType;
  readonly foo?: string;
}

export class ClassName implements IInterface {
  /**
   * A static method. It can be invoked easily.
   *
   * @example ClassName.staticMethod();
   */
  public static staticMethod(_enm?: EnumType): void {
    // ...
  }

  public property: EnumType;

  /**
   * Create a new instance of ClassName.
   *
   * @example new ClassName('this', 1337, { property: EnumType.OPTION_B });
   */
  public constructor(_this: string, _elite: number, props: ClassNameProps) {
    this.property = props.property ?? EnumType.OPTION_A;
  }

  public methodCall(): void {
    // ...
  }
}`,
    });
    fs.writeJsonSync(path.join(tmpDir, SPEC_FILE_NAME), compilationResult.assembly, {
      spaces: 2,
    });
    for (const [file, content] of Object.entries(compilationResult.files)) {
      fs.writeFileSync(path.resolve(tmpDir, file), content, 'utf-8');
    }
    fs.mkdirSync(path.resolve(tmpDir, 'rosetta'));
    fs.writeFileSync(
      path.resolve(tmpDir, 'rosetta', 'default.ts-fixture'),
      `import { EnumType, IInterface, ClassName } from '.';\ndeclare const iface: IInterface;\n/// here`,
      'utf-8',
    );
    fs.writeFileSync(
      path.resolve(tmpDir, 'rosetta', 'custom.ts-fixture'),
      `import { EnumType, IInterface, ClassName } from '.';/// here`,
      'utf-8',
    );

    // THEN
    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        strict: true,
      }),
    ).resolves.not.toThrow();
  }));
