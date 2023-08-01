import { Assembly, SPEC_FILE_NAME, writeAssembly } from '@jsii/spec';
import * as fs from 'fs';
import * as jsii from 'jsii';
import * as path from 'path';

import { extractSnippets } from '../../lib/commands/extract';
import { transliterateAssembly } from '../../lib/commands/transliterate';
import { TargetLanguage, targetName } from '../../lib/languages/target-language';
import { TabletSchema } from '../../lib/tablets/schema';
import { withTemporaryDirectory, TestJsiiModule, DUMMY_JSII_CONFIG } from '../testutil';

jest.setTimeout(60_000);

// A targets configuration block with ALL targets enabled (although with phony configuration).
const targets = Object.values(TargetLanguage).reduce(
  (tgt, lang) => {
    tgt[targetName(lang)] = { phony: true };
    return tgt;
  },
  {} as Record<string, any>,
);

test('single assembly, all languages', () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = jsii.compileJsiiForTest({
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
    fs.writeFileSync(
      path.join(tmpDir, SPEC_FILE_NAME),
      JSON.stringify({ ...compilationResult.assembly, targets }, null, 2),
    );
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
    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.csharp`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# README

      \`\`\`csharp
      var object = new ClassName("this", 1337, new ClassNameProps { Foo = "bar" });
      object.Property = EnumType.OPTION_A;
      object.MethodCall();

      ClassName.StaticMethod(EnumType.OPTION_B);
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.ClassName": {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": {
              "docs": {
                "example": "new ClassName("this", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": [
                {
                  "name": "_this",
                  "type": {
                    "primitive": "string",
                  },
                },
                {
                  "name": "_elite",
                  "type": {
                    "primitive": "number",
                  },
                },
                {
                  "name": "props",
                  "type": {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": [
              {
                "docs": {
                  "example": "ClassName.StaticMethod();",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": [
                  {
                    "name": "_enm",
                    "optional": true,
                    "type": {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              {
                "docs": {
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": [
              {
                "docs": {
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": [
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": {
                  "primitive": "string",
                },
              },
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": {
            "assembly": "testpkg",
            "docs": {
              "example": "new ClassName("this", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": {
              "filename": "index.ts",
              "line": 5,
            },
            "members": [
              {
                "docs": {
                  "example": "new ClassName("this", 1337, new ClassNameProps { Property = EnumType.OPTION_A });",
                },
                "name": "OPTION_A",
              },
              {
                "docs": {
                  "example": "new ClassName("this", 1337, new ClassNameProps { Property = EnumType.OPTION_B });",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.MethodCall();",
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.Property = EnumType.OPTION_B;",
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": {
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
    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.java`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# README

      \`\`\`java
      IInterface object = new ClassName("this", 1337, new ClassNameProps().foo("bar"));
      object.getProperty() = EnumType.OPTION_A;
      object.methodCall();

      ClassName.staticMethod(EnumType.OPTION_B);
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.ClassName": {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": {
              "docs": {
                "example": "new ClassName("this", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": [
                {
                  "name": "_this",
                  "type": {
                    "primitive": "string",
                  },
                },
                {
                  "name": "_elite",
                  "type": {
                    "primitive": "number",
                  },
                },
                {
                  "name": "props",
                  "type": {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": [
              {
                "docs": {
                  "example": "ClassName.staticMethod();",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": [
                  {
                    "name": "_enm",
                    "optional": true,
                    "type": {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              {
                "docs": {
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": [
              {
                "docs": {
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": [
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": {
                  "primitive": "string",
                },
              },
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": {
            "assembly": "testpkg",
            "docs": {
              "example": "new ClassName("this", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": {
              "filename": "index.ts",
              "line": 5,
            },
            "members": [
              {
                "docs": {
                  "example": "new ClassName("this", 1337, new ClassNameProps().property(EnumType.OPTION_A));",
                },
                "name": "OPTION_A",
              },
              {
                "docs": {
                  "example": "new ClassName("this", 1337, new ClassNameProps().property(EnumType.OPTION_B));",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.methodCall();",
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.getProperty() = EnumType.OPTION_B;",
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": {
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
    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.python`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# README

      \`\`\`python
      object = ClassName("this", 1337, foo="bar")
      object.property = EnumType.OPTION_A
      object.method_call()

      ClassName.static_method(EnumType.OPTION_B)
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.ClassName": {
            "assembly": "testpkg",
            "fqn": "testpkg.ClassName",
            "initializer": {
              "docs": {
                "example": "ClassName("this", 1337, property=EnumType.OPTION_B)",
                "summary": "Create a new instance of ClassName.",
              },
              "locationInModule": {
                "filename": "index.ts",
                "line": 57,
              },
              "parameters": [
                {
                  "name": "_this",
                  "type": {
                    "primitive": "string",
                  },
                },
                {
                  "name": "_elite",
                  "type": {
                    "primitive": "number",
                  },
                },
                {
                  "name": "props",
                  "type": {
                    "fqn": "testpkg.ClassNameProps",
                  },
                },
              ],
            },
            "interfaces": [
              "testpkg.IInterface",
            ],
            "kind": "class",
            "locationInModule": {
              "filename": "index.ts",
              "line": 40,
            },
            "methods": [
              {
                "docs": {
                  "example": "ClassName.static_method()",
                  "remarks": "It can be invoked easily.",
                  "summary": "A static method.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 46,
                },
                "name": "staticMethod",
                "parameters": [
                  {
                    "name": "_enm",
                    "optional": true,
                    "type": {
                      "fqn": "testpkg.EnumType",
                    },
                  },
                ],
                "static": true,
              },
              {
                "docs": {
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 61,
                },
                "name": "methodCall",
                "overrides": "testpkg.IInterface",
              },
            ],
            "name": "ClassName",
            "properties": [
              {
                "docs": {
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 50,
                },
                "name": "property",
                "overrides": "testpkg.IInterface",
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassName",
          },
          "testpkg.ClassNameProps": {
            "assembly": "testpkg",
            "datatype": true,
            "fqn": "testpkg.ClassNameProps",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 35,
            },
            "name": "ClassNameProps",
            "properties": [
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 37,
                },
                "name": "foo",
                "optional": true,
                "type": {
                  "primitive": "string",
                },
              },
              {
                "abstract": true,
                "immutable": true,
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 36,
                },
                "name": "property",
                "optional": true,
                "type": {
                  "fqn": "testpkg.EnumType",
                },
              },
            ],
            "symbolId": "index:ClassNameProps",
          },
          "testpkg.EnumType": {
            "assembly": "testpkg",
            "docs": {
              "example": "ClassName("this", 1337, property=EnumType.OPTION_B)",
            },
            "fqn": "testpkg.EnumType",
            "kind": "enum",
            "locationInModule": {
              "filename": "index.ts",
              "line": 5,
            },
            "members": [
              {
                "docs": {
                  "example": "ClassName("this", 1337, property=EnumType.OPTION_A)",
                },
                "name": "OPTION_A",
              },
              {
                "docs": {
                  "example": "ClassName("this", 1337, property=EnumType.OPTION_B)",
                },
                "name": "OPTION_B",
              },
            ],
            "name": "EnumType",
            "symbolId": "index:EnumType",
          },
          "testpkg.IInterface": {
            "assembly": "testpkg",
            "fqn": "testpkg.IInterface",
            "kind": "interface",
            "locationInModule": {
              "filename": "index.ts",
              "line": 17,
            },
            "methods": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.method_call()",
                  "summary": "An instance method call.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 32,
                },
                "name": "methodCall",
              },
            ],
            "name": "IInterface",
            "properties": [
              {
                "abstract": true,
                "docs": {
                  "example": "iface.property = EnumType.OPTION_B",
                  "summary": "A property value.",
                },
                "locationInModule": {
                  "filename": "index.ts",
                  "line": 24,
                },
                "name": "property",
                "type": {
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
    const compilationResult = jsii.compileJsiiForTest({
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
    fs.writeFileSync(
      path.join(tmpDir, SPEC_FILE_NAME),
      JSON.stringify({ ...compilationResult.assembly, targets }, null, 2),
    );
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
    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.csharp`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`csharp
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("literate");
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`csharp
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("omitted-literate");
      \`\`\`

      # Missing fixture

      \`\`\`csharp
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("README.md");
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.SampleClass": {
            "assembly": "testpkg",
            "docs": {
              "example": "// Example automatically generated from non-compiling source. May contain errors.
      new DoesNotCompile(this, "That", new Struct { Foo = 1337 });",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": {
              "locationInModule": {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": [
                {
                  "name": "_source",
                  "type": {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": {
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

    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.java`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`java
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("literate");
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`java
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("omitted-literate");
      \`\`\`

      # Missing fixture

      \`\`\`java
      // Example automatically generated from non-compiling source. May contain errors.
      new SampleClass("README.md");
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.SampleClass": {
            "assembly": "testpkg",
            "docs": {
              "example": "// Example automatically generated from non-compiling source. May contain errors.
      DoesNotCompile.Builder.create(this, "That").foo(1337).build();",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": {
              "locationInModule": {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": [
                {
                  "name": "_source",
                  "type": {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": {
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

    expect(JSON.parse(fs.readFileSync(path.join(tmpDir, `${SPEC_FILE_NAME}.python`), 'utf-8'))).toMatchInlineSnapshot(
      {
        fingerprint: expect.any(String),
        jsiiVersion: expect.any(String),
        targets: expect.any(Object),
      },
      `
      {
        "author": {
          "name": "John Doe",
          "roles": [
            "author",
          ],
        },
        "description": "testpkg",
        "fingerprint": Any<String>,
        "homepage": "https://github.com/aws/jsii.git",
        "jsiiVersion": Any<String>,
        "license": "Apache-2.0",
        "metadata": {
          "jsii": {
            "pacmak": {
              "hasDefaultInterfaces": true,
            },
          },
        },
        "name": "testpkg",
        "readme": {
          "markdown": "# Missing literate source

      ## This is a heading within the literate file!

      \`\`\`python
      # Example automatically generated from non-compiling source. May contain errors.
      SampleClass("literate")
      \`\`\`

      # Missing literate source and fallback

      ## This is a heading within the omitted literate file!

      \`\`\`python
      # Example automatically generated from non-compiling source. May contain errors.
      SampleClass("omitted-literate")
      \`\`\`

      # Missing fixture

      \`\`\`python
      # Example automatically generated from non-compiling source. May contain errors.
      SampleClass("README.md")
      \`\`\`",
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/aws/jsii.git",
        },
        "schema": "jsii/0.10.0",
        "targets": Any<Object>,
        "types": {
          "testpkg.SampleClass": {
            "assembly": "testpkg",
            "docs": {
              "example": "# Example automatically generated from non-compiling source. May contain errors.
      DoesNotCompile(self, "That", foo=1337)",
            },
            "fqn": "testpkg.SampleClass",
            "initializer": {
              "locationInModule": {
                "filename": "index.ts",
                "line": 8,
              },
              "parameters": [
                {
                  "name": "_source",
                  "type": {
                    "primitive": "string",
                  },
                },
              ],
            },
            "kind": "class",
            "locationInModule": {
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
    const compilationResult = jsii.compileJsiiForTest({
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
    fs.writeFileSync(
      path.join(tmpDir, SPEC_FILE_NAME),
      JSON.stringify({ ...compilationResult.assembly, targets }, null, 2),
    );
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

test('will read translations from cache even if they are dirty', async () => {
  const infusedAssembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
        /**
         * ClassA
         *
         * @example x
         */
        export class ClassA {
          public someMethod() {
          }
        }
        `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
  try {
    // Run an extract
    await extractSnippets([infusedAssembly.moduleDirectory]);

    // Mess up the extracted source file
    const schema: TabletSchema = JSON.parse(
      await fs.promises.readFile(path.join(infusedAssembly.moduleDirectory, '.jsii.tabl.json'), 'utf-8'),
    );
    for (const snippet of Object.values(schema.snippets)) {
      snippet.translations[TargetLanguage.PYTHON] = {
        source: 'oops',
        version: '999',
      };
    }
    await fs.promises.writeFile(path.join(infusedAssembly.moduleDirectory, '.jsii.tabl.json'), JSON.stringify(schema));

    // Run a transliterate, should have used the translation from the cache even though the version is wrong
    await transliterateAssembly([infusedAssembly.moduleDirectory], [TargetLanguage.PYTHON]);

    const translated: Assembly = JSON.parse(
      await fs.promises.readFile(path.join(infusedAssembly.moduleDirectory, '.jsii.python'), 'utf-8'),
    );
    expect(translated.types?.['my_assembly.ClassA'].docs?.example).toEqual('oops');
  } finally {
    infusedAssembly.cleanup();
  }
});

test('will read translations from cache when tablet is compressed', async () => {
  const infusedAssembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
        /**
         * ClassA
         *
         * @example x
         */
        export class ClassA {
          public someMethod() {
          }
        }
        `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
  try {
    // Run an extract and tell it to compress the tablet
    await extractSnippets([infusedAssembly.moduleDirectory], {
      compressTablet: true,
    });

    await transliterateAssembly([infusedAssembly.moduleDirectory], [TargetLanguage.PYTHON]);

    const translated: Assembly = JSON.parse(
      await fs.promises.readFile(path.join(infusedAssembly.moduleDirectory, '.jsii.python'), 'utf-8'),
    );
    expect(translated.types?.['my_assembly.ClassA'].docs?.example).toEqual('x');
  } finally {
    infusedAssembly.cleanup();
  }
});

test('will output to specified directory', async () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = jsii.compileJsiiForTest({
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

    fs.writeFileSync(
      path.join(tmpDir, SPEC_FILE_NAME),
      JSON.stringify({ ...compilationResult.assembly, targets }, null, 2),
    );
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
    // create outdir
    const outdir = path.resolve(tmpDir, 'out');
    fs.mkdirSync(outdir);

    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        strict: true,
        outdir,
      }),
    ).resolves.not.toThrow();

    Object.values(TargetLanguage).forEach((lang) => {
      expect(fs.statSync(path.join(outdir, `${SPEC_FILE_NAME}.${lang}`)).isFile()).toBe(true);
    });
  }));

test('will not attempt to produce output for an unsupported language', async () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = jsii.compileJsiiForTest({
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

    fs.writeFileSync(
      path.join(tmpDir, SPEC_FILE_NAME),
      JSON.stringify(
        { ...compilationResult.assembly, targets: { ...targets, [targetName(TargetLanguage.GO)]: undefined } },
        null,
        2,
      ),
    );
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
    // create outdir
    const outdir = path.resolve(tmpDir, 'out');
    fs.mkdirSync(outdir);

    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        strict: true,
        outdir,
      }),
    ).resolves.not.toThrow();

    Object.values(TargetLanguage).forEach((lang) => {
      if (lang === TargetLanguage.GO) {
        expect(fs.existsSync(path.join(outdir, `${SPEC_FILE_NAME}.${lang}`))).toBe(false);
      } else {
        expect(fs.statSync(path.join(outdir, `${SPEC_FILE_NAME}.${lang}`)).isFile()).toBe(true);
      }
    });
  }));

test('transliterate works with zipped assembly files', async () =>
  withTemporaryDirectory(async (tmpDir) => {
    // GIVEN
    const compilationResult = jsii.compileJsiiForTest({
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

    writeAssembly(
      tmpDir,
      {
        ...compilationResult.assembly,
        targets: { ...targets },
      },
      { compress: true },
    );
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
    // create outdir
    const outdir = path.resolve(tmpDir, 'out');
    fs.mkdirSync(outdir);

    await expect(
      transliterateAssembly([tmpDir], Object.values(TargetLanguage), {
        strict: true,
        outdir,
      }),
    ).resolves.not.toThrow();

    Object.values(TargetLanguage).forEach((lang) => {
      expect(fs.statSync(path.join(outdir, `${SPEC_FILE_NAME}.${lang}`)).isFile()).toBe(true);
    });
  }));
