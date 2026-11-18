import { SPEC_FILE_NAME } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as jsii from 'jsii';
import * as os from 'os';
import * as path from 'path';

import * as pacmak from '../../../lib';

const SOURCE = `
export interface IBase {
  bind(scope: string): void;
}

export class Impl implements IBase {
  public bind(_scope: string): void {
    return;
  }
}

export interface BaseProps {
  readonly inherited: string;
}

export interface ChildProps extends BaseProps {
  readonly own?: string;
}

export interface OptionalProps {
  readonly opt?: string;
}

export class Ctor {
  public constructor(_scope: string, _props?: OptionalProps) {
    return;
  }
}

export abstract class Edge {
  public static staticCls(_cls: string): void {
    return;
  }

  public destructured({ own }: ChildProps, other: string): string {
    return own ?? other;
  }

  public abstract unused(_scope: string, __id: string): void;
  public abstract keyword(_from: string): void;
  public abstract onlyUnderscores(_: string, __: string): void;
  public abstract digits(_1: string, _2fa: string): void;
  public abstract nonAscii(_a\u{FB01}: string, afi: string): void;
  public abstract nonAsciiOther(_afi: string, a\u{FB01}: string): void;
  public abstract nonAsciiAlone(_gr\u{F6}\u{DF}e: string): void;
  public abstract clash(_a: string, a: string): void;
  public abstract snakeClash(_myURL: string, myUrl: string): void;
  public abstract keywordClash(_class: string, class_: string): void;
  public abstract implicitSelf(_self: string): void;
  public abstract variadicSelf(..._self: string[]): void;
  public abstract variadic(..._values: string[]): void;
  public abstract shadows(_jsii: string, _typing: string, _builtins: string, _checkType: string): void;
  public abstract shadowsToo(_datetime: string, _cachedTypeHints: string): void;
  public abstract shadowsImports(_abc: string, _enum: string, _publication: string, _typingExtensions: string): void;
  public abstract lifted(_other: string, props: ChildProps): void;
  public abstract liftedClash(_own: string, props: ChildProps): void;
  public abstract inheritedLiftedClash(_inherited: string, props: ChildProps): void;
}
`;

let code: string;

beforeAll(async () => {
  const compiled = jsii.compileJsiiForTest(SOURCE);
  const targets = {
    python: { distName: 'example-test.demo', module: 'example_test_demo' },
  };
  const tmpdir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'jsii-pacmak-parameter-names.tests-'),
  );
  try {
    await fs.writeJson(path.join(tmpdir, SPEC_FILE_NAME), {
      ...compiled.assembly,
      targets,
    });
    await fs.writeJson(path.join(tmpdir, 'package.json'), {
      name: compiled.assembly.name,
      version: compiled.assembly.version,
      jsii: { outdir: 'dist', targets },
    });
    const outputDirectory = path.join(tmpdir, 'dist');
    await pacmak.pacmak({
      inputDirectories: [tmpdir],
      outputDirectory,
      codeOnly: true,
      fingerprint: false,
      forceSubdirectory: true,
      parallel: false,
      targets: [pacmak.TargetName.PYTHON],
      updateNpmIgnoreFiles: false,
    });
    code = await fs.readFile(
      path.join(
        outputDirectory,
        'python',
        'src',
        'example_test_demo',
        '__init__.py',
      ),
      'utf8',
    );
  } finally {
    await fs.remove(tmpdir);
  }
}, 120_000);

test.each([
  // The TypeScript marker for an unused parameter is dropped
  ['bind', ['self', 'scope']],
  ['unused', ['self', 'scope', 'id']],
  // ...and the result is escaped like any other name
  ['keyword', ['self', 'from_']],
  // It is kept if what is left wouldn't be a Python identifier
  ['only_underscores', ['self', '_', '__']],
  ['digits', ['self', '_1', '_2fa']],
  ['destructured', ['self', '__0', 'other']],
  ['non_ascii', ['self', '_a\u{FB01}', 'afi']],
  ['non_ascii_other', ['self', '_afi', 'a\u{FB01}']],
  ['non_ascii_alone', ['self', '_gr\u{F6}\u{DF}e']],
  // ...or if it could collide with another parameter
  ['clash', ['self', '_a', 'a']],
  ['snake_clash', ['self', '_my_url', 'my_url']],
  ['keyword_clash', ['self', '_class', 'class_']],
  // ...with the implicit parameter, or a name the method body uses
  ['static_cls', ['cls', '_cls']],
  ['implicit_self', ['self', '_self']],
  ['variadic_self', ['self', '*_self']],
  ['shadows', ['self', '_jsii', '_typing', '_builtins', '_check_type']],
  ['shadows_too', ['self', '_datetime', '_cached_type_hints']],
  [
    'shadows_imports',
    ['self', '_abc', '_enum', '_publication', '_typing_extensions'],
  ],
  // ...or with a lifted struct property, including an inherited one
  ['lifted', ['self', 'other', '*', 'own', 'inherited']],
  ['lifted_clash', ['self', '_own', '*', 'own', 'inherited']],
  ['inherited_lifted_clash', ['self', '_inherited', '*', 'own', 'inherited']],
  // Variadic parameters follow the same rule
  ['variadic', ['self', '*values']],
])('def %s(%s)', (method, expected) => {
  const signatures = signaturesOf(method);
  expect(signatures.length).toBeGreaterThan(0);
  for (const params of signatures) {
    expect(params).toEqual(expected);
  }
});

test('the docstring and the call into the kernel use the same names as the signature', () => {
  const impl = classBlock('Impl');
  expect(impl).toContain('def bind(self, scope: builtins.str)');
  expect(impl).toContain(':param scope: -');
  expect(impl).toContain('jsii.invoke(self, "bind", [scope])');
  expect(impl).not.toContain('_scope');

  expect(classBlock('Edge')).toContain(':param _a: -');
  const proxy = classBlock('_EdgeProxy');
  expect(proxy).toContain('jsii.invoke(self, "clash", [_a, a])');
  expect(proxy).toContain('jsii.invoke(self, "variadic", [*values])');
  expect(proxy).toContain('jsii.invoke(self, "lifted", [other, props])');
});

test('a lifted struct parameter is built under the same name it is passed as', () => {
  const ctor = classBlock('Ctor');
  expect(signaturesOf('__init__', ctor)).toEqual([
    ['self', 'scope', '*', 'opt'],
  ]);
  expect(ctor).toContain('props = OptionalProps(opt=opt)');
  expect(ctor).toContain('jsii.create(self.__class__, self, [scope, props])');
  expect(ctor).not.toContain('_props');
  expect(ctor).not.toContain('_scope');
});

/**
 * The code of the class with the given name, up to the next line that isn't indented.
 */
function classBlock(name: string): string {
  const start = code.indexOf(`\nclass ${name}(`);
  expect(start).toBeGreaterThanOrEqual(0);
  const end = code.slice(start + 1).search(/\n\S/);
  return end < 0 ? code.slice(start) : code.slice(start, start + 1 + end);
}

/**
 * The parameter names of every `def <method>(...)` in the generated code (a method can appear in a
 * class, its proxy and a protocol).
 */
function signaturesOf(method: string, source = code): string[][] {
  const result = new Array<string[]>();
  const re = new RegExp(`def ${method}\\(([^)]*)\\)`, 'g');
  for (const match of source.matchAll(re)) {
    let params = match[1];
    // Drop the annotations' brackets, which may contain commas
    while (/\[[^[\]]*\]/.test(params)) {
      params = params.replace(/\[[^[\]]*\]/g, '');
    }
    result.push(
      params
        .split(',')
        .map((param) => param.split(/[:=]/)[0].trim())
        .filter((param) => param !== ''),
    );
  }
  return result;
}
