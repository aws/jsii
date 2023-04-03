import * as semver from 'semver';
import * as ts from 'typescript';

export interface TypesVersions {
  readonly [range: string]: {
    readonly [glob: string]: readonly string[];
  };
}

export function undoTypesVersionsRedirect(
  sourcePath: string,
  typesVersionsMap: TypesVersions | undefined,
): string {
  if (typesVersionsMap == null) {
    return sourcePath;
  }

  const [_, typesVersions] =
    Object.entries(typesVersionsMap).find(([range, _]) =>
      semver.satisfies(ts.version, range),
    ) ?? [];

  if (typesVersions == null) {
    return sourcePath;
  }

  for (const [orig, candidates] of Object.entries(typesVersions)) {
    const [found] = candidates.flatMap((candidate) => {
      const [before, after, ...rest] = candidate.split('*');
      // There can be only 1 "*" in a typesVersions pattern.
      if (rest.length > 0) {
        return [];
      }
      if (sourcePath.startsWith(before) && sourcePath.endsWith(after)) {
        return [
          {
            before,
            after,
            length: before.length + after.length,
          },
        ];
      }

      return [];
    });

    if (found == null) {
      continue;
    }

    const [before, after, ...rest] = orig.split('*');
    // There can be only 1 "*" in a typesVersions pattern.
    if (rest.length > 0) {
      continue;
    }

    // Remove the typesVersion prefix & suffix
    const globbed = sourcePath.slice(
      found.before.length,
      sourcePath.length - found.after.length,
    );
    // Add the original prefix & suffix
    return `${before}${globbed}${after}`;
  }

  // No match found...
  return sourcePath;
}
