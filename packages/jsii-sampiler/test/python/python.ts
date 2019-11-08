import { LiteralSource, renderTree, translateTypeScript } from "../../lib";
import { PythonVisitor } from "../../lib/languages/python";
import { visualizeTypeScriptAst } from "../../lib/util";

const DEBUG = false;

export function ts2python(source: string): string {
  const src = new LiteralSource(source, 'test.ts');

  if (DEBUG) {
    // tslint:disable-next-line:no-console
    console.log(visualizeTypeScriptAst(src));
  }
  const result = translateTypeScript(src, new PythonVisitor());

  // Very debug. Much print.
  // console.log(JSON.stringify(result.tree, undefined, 2));

  return renderTree(result.tree) + '\n';
}

export function expectPython(source: string, expected: string) {
  expect(stripEmptyLines(ts2python(source))).toEqual(stripEmptyLines(stripCommonWhitespace(expected)));
}

function stripCommonWhitespace(x: string) {
  const lines = x.split('\n');
  const whitespaces = lines.filter(l => !emptyLine(l.trim())).map(l => l.match(/(\s*)/)![1].length);
  const minWS = Math.min(...whitespaces);
  return lines.map(l => l.substr(minWS)).join('\n');
}

function stripEmptyLines(x: string) {
  const lines = x.split('\n');
  while (lines.length > 0 && emptyLine(lines[0])) { lines.splice(0, 1); }
  while (lines.length > 0 && emptyLine(lines[lines.length - 1])) { lines.pop(); }
  return lines.join('\n');
}

function emptyLine(x: string) {
  return x.trim() === '';
}