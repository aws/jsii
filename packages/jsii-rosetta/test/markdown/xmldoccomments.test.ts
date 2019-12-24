import { markDownToStructure, markDownToXmlDoc } from '../../lib';

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

test('special characters are escaped', () => {
  expectOutput(`
  Escape this & and this < and this >

  ` + '```' + `
  if (x < 3) {
    System.Console.WriteLn("bloep");
  }
  ` + '```'
  , `
Escape this &amp; and this &lt; and this &gt;

<code><![CDATA[
if (x < 3) {
  System.Console.WriteLn("bloep");
}
]]></code>
  `);
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    // tslint:disable-next-line:no-console
    console.log(markDownToStructure(source));
  }

  const output = markDownToXmlDoc(source);
  expect(output.trim()).toEqual(expected.trim());
}