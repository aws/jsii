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
  public abstract clash(_a: string, a: string): void;
  public abstract snakeClash(_myURL: string, myUrl: string): void;
  public abstract keywordClash(_class: string, class_: string): void;
  public abstract implicitSelf(_self: string): void;
  public abstract variadicSelf(..._self: string[]): void;
  public abstract variadic(..._values: string[]): void;
  public abstract shadows(_jsii: string, _typing: string, _builtins: string, _checkType: string): void;
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
  // ...or if it could collide with another parameter
  ['clash', ['self', '_a', 'a']],
  ['snake_clash', ['self', '_my_url', 'my_url']],
  ['keyword_clash', ['self', '_class', 'class_']],
  // ...with the implicit parameter, or a name the method body uses
  ['static_cls', ['cls', '_cls']],
  ['implicit_self', ['self', '_self']],
  ['variadic_self', ['self', '*_self']],
  ['shadows', ['self', '_jsii', '_typing', '_builtins', '_check_type']],
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

test('the docstring and the call into the kernel use the same names', () => {
  expect(code).toContain(':param scope: -');
  expect(code).toContain('jsii.invoke(self, "bind", [scope])');
  expect(code).toContain('jsii.invoke(self, "clash", [_a, a])');
  expect(code).toContain('jsii.invoke(self, "variadic", [*values])');
  expect(code).toContain('jsii.invoke(self, "lifted", [other, props])');
});

/**
 * The parameter names of every `def <method>(...)` in the generated code (a method can appear in a
 * class, its proxy and a protocol).
 */
function signaturesOf(method: string): string[][] {
  const result = new Array<string[]>();
  const re = new RegExp(`def ${method}\\(([^)]*)\\)`, 'g');
  for (const match of code.matchAll(re)) {
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
