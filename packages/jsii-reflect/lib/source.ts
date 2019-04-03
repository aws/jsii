import { Assembly } from "./assembly";

export interface SourceLocation {
  filename: string;
  line: number;
}

interface Locatable {
  readonly assembly: Assembly;
  readonly moduleLocation?: SourceLocation;
}

/**
 * Return the repository location for the given API item
 */
export function repositoryLocation(item: Locatable): SourceLocation | undefined {
  const assemblyLoc = item.assembly.repositoryLocation;
  const moduleLoc = item.moduleLocation;

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
export function repositoryUrl(item: Locatable, ref: string = 'master'): string | undefined {
  const loc = repositoryLocation(item);
  if (!loc) { return undefined; }

  const repo = item.assembly.repository;
  if (!repo.url.startsWith('https://') || repo.url.indexOf("github.com") === -1 || !repo.url.endsWith('.git')) { return undefined; }

  // Turn https://github.com/awslabs/aws-cdk.git ->  https://github.com/awslabs/aws-cdk/blob/REF/filename#L<number>

  const prefix = repo.url.substr(0, repo.url.length - 4);

  return `${prefix}/blob/${ref}/${loc.filename}#L${loc.line}`;
}