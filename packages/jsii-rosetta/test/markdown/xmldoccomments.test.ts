import { markDownToStructure, markDownToXmlDoc } from '../../lib';

const DEBUG = false;

test('emphasis and lists', () => {
  expectOutput(
    `
# Hello
## Bye

This is *very* **cool**.

* Yes
* Really
`,
    `
<h1>Hello</h1>

<h2>Bye</h2>

This is <em>very</em> <strong>cool</strong>.

<list type="bullet">
<description>Yes</description>
<description>Really</description>
</list>
`,
  );
});

test('special characters are escaped', () => {
  expectOutput(
    `
  Escape this & and this < and this >

  ` +
      '```' +
      `
  if (x < 3) {
    System.Console.WriteLn("bloep");
  }
  ` +
      '```',
    `
Escape this &amp; and this &lt; and this &gt;

<code><![CDATA[
if (x < 3) {
  System.Console.WriteLn("bloep");
}
]]></code>
  `,
  );
});

test('quotes are escaped inside attributes', () => {
  expectOutput(
    `
  ['tis but a "scratch"](http://bla.ck/"kni"gh&t)

  ![nay merely a "flesh wound" &cet](http://bla.ck/"kni"gh&t.jpg)
  `,
    `
<a href="http://bla.ck/%22kni%22gh&amp;t">'tis but a "scratch"</a>

<img alt="nay merely a &quot;flesh wound&quot; &amp;cet" src="http://bla.ck/%22kni%22gh&amp;t.jpg" />
  `,
  );
});

test('convert header properly', () => {
  expectOutput(
    `
  <!--BEGIN STABILITY BANNER-->

  ---

  ![Stability: Stable](https://img.shields.io/badge/stability-Stable-success.svg?style=for-the-badge)

  ---
  <!--END STABILITY BANNER-->
  `,
    `
<!--BEGIN STABILITY BANNER-->

<hr />

<img alt="Stability: Stable" src="https://img.shields.io/badge/stability-Stable-success.svg?style=for-the-badge" />

<hr />

  <!--END STABILITY BANNER-->
  `,
  );
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    // tslint:disable-next-line:no-console
    console.log(markDownToStructure(source));
  }

  const output = markDownToXmlDoc(source);
  expect(output.trim()).toEqual(expected.trim());
}
