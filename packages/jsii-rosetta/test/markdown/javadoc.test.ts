import { transformMarkdown } from "../../lib/markdown/markdown";
import { StructureRenderer } from "../../lib/markdown/structure-renderer";
import { JavaDocRenderer } from "../../lib";

const DEBUG = false;

test('inserts paragraph breaks between text but not code samples', () => {
  expectOutput(`
# Hello

Here's a paragraph.

Here's one more.

` + '```' + `
some_code();

with_newlines();
` + '```' + `
Some more text here.
`, `
<h1>Hello</h1>
<p>
Here's a paragraph.
<p>
Here's one more.
<p>
<blockquote><pre>{@code
some_code();

with_newlines();
}</pre></blockquote>
<p>
Some more text here.
`);
});

test('common formatting tags', () => {
  expectOutput(`
# Hello
## Bye

This is *very* **cool**.

* Yes
* Really
`, `
<h1>Hello</h1>
<p>
<h2>Bye</h2>
<p>
This is <em>very</em> <strong>cool</strong>.
<p>
<ul>
<li>Yes</li>
<li>Really</li>
</ul>
`);
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    const struct = new StructureRenderer();
    // tslint:disable-next-line:no-console
    console.log(transformMarkdown(source, struct));
  }

  const output = transformMarkdown(source, new JavaDocRenderer());
  expect(output.trim()).toEqual(expected.trim());
}