import { markDownToStructure, markDownToJavaDoc } from '../../lib';

const DEBUG = false;

test('inserts paragraph breaks between text but not code samples', () => {
  expectOutput(
    `
# Hello

Here's a paragraph.

Here's one more.

` +
      '```' +
      `
some_code();

with_newlines();
` +
      '```' +
      `
Some more text here.
`,
    `
<h1>Hello</h1>
<p>
Here's a paragraph.
<p>
Here's one more.
<p>
<blockquote><pre>
some_code();

with_newlines();
</pre></blockquote>
<p>
Some more text here.
`,
  );
});

test('common formatting tags', () => {
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
<p>
<h2>Bye</h2>
<p>
This is <em>very</em> <strong>cool</strong>.
<p>
<ul>
<li>Yes</li>
<li>Really</li>
</ul>
`,
  );
});

test('special characters are escaped', () => {
  expectOutput(
    `
  Escape this & and this < and this > and also @

  ` +
      '```' +
      `
  if (x < 3) {
    System.Console.WriteLn("bloep");
  }
  ` +
      '```',
    `
Escape this &amp; and this &lt; and this &gt; and also &#64;
<p>
<blockquote><pre>
if (x &lt; 3) {
  System.Console.WriteLn("bloep");
}
</pre></blockquote>
  `,
  );
});

test('doc comment closing chars are escaped', () => {
  expectOutput(
    ['Escape this */', '```', 'And this */', '```'].join('\n'),
    `
Escape this *&#47;
<p>
<blockquote><pre>
And this *&#47;
</pre></blockquote>
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
<p>
<img alt="nay merely a &quot;flesh wound&quot; &amp;cet" src="http://bla.ck/%22kni%22gh&amp;t.jpg">
  `,
  );
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    // tslint:disable-next-line:no-console
    console.log(markDownToStructure(source));
  }

  const output = markDownToJavaDoc(source);
  expect(output.trim()).toEqual(expected.trim());
}
