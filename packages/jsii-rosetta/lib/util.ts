import { VisualizeAstVisitor } from './languages/visualize';
import ts = require('typescript');
import { translateTypeScript } from './translate';

export function startsWithUppercase(x: string) {
  return x.match(/^[A-Z]/);
}

export interface File {
  readonly contents: string;
  readonly fileName: string;
}

export function visualizeTypeScriptAst(source: File) {
  const vis = translateTypeScript(source, new VisualizeAstVisitor(true), {
    bestEffort: false
  });
  return vis.translation + '\n';
}

export function printDiagnostics(diags: ts.Diagnostic[], stream: NodeJS.WritableStream) {
  diags.forEach(d => printDiagnostic(d, stream));
}

export function printDiagnostic(diag: ts.Diagnostic, stream: NodeJS.WritableStream) {
  const host = {
    getCurrentDirectory() { return '.'; },
    getCanonicalFileName(fileName: string) { return fileName; },
    getNewLine() { return '\n'; }
  };

  const message = ts.formatDiagnosticsWithColorAndContext([diag], host);
  stream.write(message);
}

export function isErrorDiagnostic(diag: ts.Diagnostic) {
  return diag.category === ts.DiagnosticCategory.Error;
}

/**
 * Chunk an array of elements into approximately equal groups
 */
export function divideEvenly<A>(groups: number, xs: A[]): A[][] {
  const chunkSize = Math.ceil(xs.length / groups);
  const ret: A[][] = [];

  for (let i = 0; i < groups; i++) {
    ret.push(xs.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return ret;
}