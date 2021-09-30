/**
 * A piece of TypeScript code found in an assembly, ready to be translated
 */
export interface TypeScriptSnippet {
  /**
   * The snippet code that ends up in the JSII assembly
   */
  readonly visibleSource: string;

  /**
   * A human-readable description of where this snippet was found in the assembly
   */
  readonly where: string;

  /**
   * When enhanced with a fixture, the snippet's complete source code
   */
  readonly completeSource?: string;

  /**
   * Parameters for the conversion
   */
  readonly parameters?: Record<string, string>;

  /**
   * Whether this snippet must be processed as if `--strict` was always supplied.
   *
   * @default false
   */
  readonly strict?: boolean;
}

/**
 * Construct a TypeScript snippet from literal source
 *
 * Will parse parameters from a directive in the given source.
 */
export function typeScriptSnippetFromSource(
  typeScriptSource: string,
  where: string,
  strict: boolean,
  parameters: Record<string, string> = {},
): TypeScriptSnippet {
  const [source, sourceParameters] = parametersFromSourceDirectives(typeScriptSource);
  return {
    visibleSource: source.trimRight(),
    where,
    parameters: Object.assign({}, parameters, sourceParameters),
    strict,
  };
}

export function updateParameters(snippet: TypeScriptSnippet, params: Record<string, string>): TypeScriptSnippet {
  return {
    ...snippet,
    parameters: Object.assign(Object.create(null), snippet.parameters ?? {}, params),
  };
}

/**
 * Get the complete (compilable) source of a snippet
 */
export function completeSource(snippet: TypeScriptSnippet) {
  return snippet.completeSource ?? snippet.visibleSource;
}

/**
 * Extract snippet parameters from the first line of the source if it's a compiler directive
 */
function parametersFromSourceDirectives(source: string): [string, Record<string, string>] {
  const [firstLine, ...rest] = source.split('\n');
  // Also extract parameters from an initial line starting with '/// ' (getting rid of that line).
  const m = /[/]{3}(.*)$/.exec(firstLine);
  if (m) {
    const paramClauses = m[1]
      .trim()
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => s !== '');
    return [rest.join('\n'), parseKeyValueList(paramClauses)];
  }

  return [source, {}];
}

/**
 * Parse a set of 'param param=value' directives into an object
 */
export function parseKeyValueList(parameters: string[]): Record<string, string> {
  const ret: Record<string, string> = {};
  for (const param of parameters) {
    const parts = param.split('=', 2);
    if (parts.length === 2) {
      ret[parts[0]] = parts[1];
    } else {
      ret[parts[0]] = '';
    }
  }

  return ret;
}

/**
 * Recognized snippet parameters
 */
export enum SnippetParameters {
  /**
   * Use fixture with the given name (author parameter)
   */
  FIXTURE = 'fixture',

  /**
   * Don't use a fixture (author parameter)
   */
  NO_FIXTURE = 'nofixture',

  /**
   * Snippet was extracted from this literate file (backwards compatibility)
   *
   * Parameter attached by 'jsii'; load the given file instead of any fixture,
   * process as usual.
   */
  LITERATE_SOURCE = 'lit',

  /**
   * What directory to resolve fixtures in for this snippet (system parameter)
   *
   * Attached during processing, should not be used by authors.
   */
  $PROJECT_DIRECTORY = '$directory',

  /**
   * What directory to pretend the file is in (system parameter)
   *
   * Attached when compiling a literate file, as they compile in
   * the location where they are stored.
   */
  $COMPILATION_DIRECTORY = '$compilation',
}
