import log4js = require('log4js');
import ts = require('typescript');
import { DIAGNOSTICS } from './compiler';

/**
 * Obtains the relevant logger to be used for a given diagnostic message.
 *
 * @param logger     the ``log4js.Logger`` to use for emitting the message.
 * @param diagnostic the message for which a logger is requested.
 *
 * @returns a logger method of the ``logger`` for the appropriate level.
 */
export function diagnosticsLogger(logger: log4js.Logger, diagnostic: ts.Diagnostic): ((message: any, ...args: any[]) => void) | undefined {
  switch (diagnostic.category) {
    case ts.DiagnosticCategory.Error:
      if (!logger.isErrorEnabled()) { return undefined; }
      return logger.error.bind(logger);
    case ts.DiagnosticCategory.Warning:
      if (!logger.isWarnEnabled()) { return undefined; }
      return logger.warn.bind(logger);
    case ts.DiagnosticCategory.Message:
    case ts.DiagnosticCategory.Suggestion:
    default:
      if (!logger.isDebugEnabled()) { return undefined; }
      return logger.debug.bind(logger);
  }
}

export function logDiagnostic(diagnostic: ts.Diagnostic, projectRoot: string) {
  const formatDiagnosticsHost = {
    getCurrentDirectory: () => projectRoot,
    getCanonicalFileName(fileName: string) { return fileName; },
    getNewLine() { return '\n'; }
  };

  const message = diagnostic.file
    ? ts.formatDiagnosticsWithColorAndContext([diagnostic], formatDiagnosticsHost)
    : ts.formatDiagnostics([diagnostic], formatDiagnosticsHost);

  const logFunc = diagnosticsLogger(log4js.getLogger(DIAGNOSTICS), diagnostic);
  if (!logFunc) { return; }
  logFunc(message.trim());
}

const PERSON_REGEX = /^\s*(.+?)(?:\s*<([^>]+)>)?(?:\s*\(([^)]+)\))?\s*$/;
/**
 * Parses a string-formatted person entry from `package.json`.
 * @param value the string-formatted person entry.
 *
 * @example
 *  parsePerson("Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)");
 *  // => { name: "Barney Rubble", email: "b@rubble.com", url: "http://barnyrubble.tumblr.com/" }
 */
export function parsePerson(value: string) {
  const match = PERSON_REGEX.exec(value);
  if (!match) {
    throw new Error(`Invalid stringified "person" value: ${value}`);
  }
  const [, name, email, url] = match;
  const result: { name: string, email?: string, url?: string } = { name: name.trim() };
  if (email) {
    result.email = email.trim();
  }
  if (url) {
    result.url = url.trim();
  }
  return result;
}

const REPOSITORY_REGEX = /^(?:(github|gist|bitbucket|gitlab):)?([A-Za-z\d_-]+\/[A-Za-z\d_-]+)$/;
export function parseRepository(value: string): { url: string } {
  const match = REPOSITORY_REGEX.exec(value);
  if (!match) {
    return { url: value };
  }
  const [, host, slug] = match;
  switch (host || 'github') {
    case 'github':
      return { url: `https://github.com/${slug}.git` };
    case 'gist':
      return { url: `https://gist.github.com/${slug}.git` };
    case 'bitbucket':
      return { url: `https://bitbucket.org/${slug}.git` };
    case 'gitlab':
      return { url: `https://gitlab.com/${slug}.git` };
    default:
      throw new Error(`Unknown host service: ${host}`);
  }
}
