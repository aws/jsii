import { transformMarkdown } from "../../lib/markdown/markdown";
import { StructureRenderer } from "../../lib/markdown/structure-renderer";
import { CSharpXmlCommentRenderer } from "../../lib";

const DEBUG = false;

test('emphasis and lists', () => {
  expectOutput(`
# Hello
## Bye

This is *very* **cool**.

* Yes
* Really
`, `
<h1>Hello</h1>

<h2>Bye</h2>

This is <em>very</em> <strong>cool</strong>.

<list type="bullet">
<description>Yes</description>
<description>Really</description>
</list>
`);
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    const struct = new StructureRenderer();
    // tslint:disable-next-line:no-console
    console.log(transformMarkdown(source, struct));
  }

  const output = transformMarkdown(source, new CSharpXmlCommentRenderer());
  expect(output.trim()).toEqual(expected.trim());
}