import { PrimitiveType, Stability, TypeKind } from '@jsii/spec';
import { CodeMaker } from 'codemaker';

import { DotNetRuntimeGenerator } from '../../../lib/targets/dotnet/dotnetruntimegenerator';
import { DotNetTypeResolver } from '../../../lib/targets/dotnet/dotnettyperesolver';

function emit(fn: (generator: DotNetRuntimeGenerator) => void): string[] {
  const lines = new Array<string>();
  const code = {
    line: (text: string) => lines.push(text),
  } as unknown as CodeMaker;
  fn(new DotNetRuntimeGenerator(code, {} as DotNetTypeResolver));
  return lines;
}

test.each([
  ['use X\\', String.raw`[System.Obsolete("use X\\")]`],
  ['match \\d+', String.raw`[System.Obsolete("match \\d+")]`],
  ['say "hi" \\"', String.raw`[System.Obsolete("say \"hi\" \\\"")]`],
  ['one\ntwo', '[System.Obsolete("one two")]'],
  ['tab\tcr\rbell\u0007', '[System.Obsolete("tab\\tcr\\rbell\\u0007")]'],
  ['a\u0085b\u2028c\u2029d', '[System.Obsolete("a\\u0085b\\u2028c\\u2029d")]'],
  ['lone \ud800', '[System.Obsolete("lone \\ud800")]'],
  ['emoji 😀 é', '[System.Obsolete("emoji 😀 é")]'],
])(
  'deprecation message %j is a valid C# string literal',
  (message, expected) => {
    const lines = emit((generator) =>
      generator.emitDeprecatedAttributeIfNecessary({
        name: 'method',
        docs: { stability: Stability.Deprecated, deprecated: message },
      }),
    );

    expect(lines).toEqual([expected]);
  },
);

test('parameter docs keep quotes and backslashes in parametersJson', () => {
  const lines = emit((generator) =>
    generator.emitAttributesForMethod(
      { assembly: 'a', fqn: 'a.I', kind: TypeKind.Interface, name: 'I' },
      {
        name: 'method',
        parameters: [
          {
            name: 'p',
            type: { primitive: PrimitiveType.String },
            docs: { summary: 'e.g: "$NOPE"" or \\d' },
          },
        ],
      },
    ),
  );

  expect(lines).toEqual([
    String.raw`[JsiiMethod(name: "method", parametersJson: "[{\"name\":\"p\",\"type\":{\"primitive\":\"string\"},\"docs\":{\"summary\":\"e.g: \\\"$NOPE\\\"\\\" or \\\\d\"}}]")]`,
  ]);
});
