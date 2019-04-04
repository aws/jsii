import { Assembly } from "./assembly";

/**
 * Describes a source location in a file
 */
export interface SourceLocation {
  /**
   * The file name
   */
  filename: string;

  /**
   * The 1-based line inside the file
   */
  line: number;
}

/**
 * Interface for API items that can be queried for a source location
 */
export interface SourceLocatable {
  /**
   * The assembly the API item is defined in
   */
  readonly assembly: Assembly;

  /**
   * Source location relative to the assembly root
   */
  readonly locationInModule?: SourceLocation;
}

/**
 * Return the repository location for the given API item
 */
export function repositoryLocation(item: SourceLocatable): SourceLocation | undefined {
  const assemblyLoc = item.assembly.locationInRepository;
  const moduleLoc = item.locationInModule;

  if (assemblyLoc && moduleLoc) {
    if (assemblyLoc === '.') { return moduleLoc; }

    return {
      filename: `${assemblyLoc}/${moduleLoc.filename}`,
      line: moduleLoc.line,
    };
  }

  return undefined;
}

/**
 * Return a URL for this item into the source repository, if available
 *
 * (Currently only supports GitHub URLs)
 */
export function repositoryUrl(item: SourceLocatable, ref: string = 'master'): string | undefined {
  const loc = repositoryLocation(item);
  if (!loc) { return undefined; }

  const repo = item.assembly.repository;
  if (!repo.url.startsWith('https://') || repo.url.indexOf("github.com") === -1 || !repo.url.endsWith('.git')) { return undefined; }

  // Turn https://github.com/awslabs/aws-cdk.git ->  https://github.com/awslabs/aws-cdk/blob/REF/filename#L<number>

  const prefix = repo.url.substr(0, repo.url.length - 4);

  return `${prefix}/blob/${ref}/${loc.filename}#L${loc.line}`;
}