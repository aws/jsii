import { Comparator, Range } from 'semver';

/**
 * Converts a SemVer range expression to a Maven version range expression.
 *
 * @param semverRange the SemVer range expression to convert.
 * @param suffix      the suffix to add to versions in the range.
 *
 * @see https://cwiki.apache.org/confluence/display/MAVENOLD/Dependency+Mediation+and+Conflict+Resolution
 */
export function toMavenVersionRange(semverRange: string, suffix?: string): string {
  return toBracketNotation(semverRange, suffix, { semver: false });
}

/**
 * Converts a SemVer range expression to a NuGet version range expression.
 *
 * @param semverRange the SemVer range expression to convert.
 *
 * @see https://docs.microsoft.com/en-us/nuget/concepts/package-versioning#version-ranges-and-wildcards
 */
export function toNuGetVersionRange(semverRange: string): string {
  return toBracketNotation(semverRange);
}

/**
 * Converts a SemVer range expression to a Python setuptools compatible version
 * constraint expression.
 *
 * @param semverRange the SemVer range expression to convert.
 */
export function toPythonVersionRange(semverRange: string): string {
  const range = new Range(semverRange);
  return range.set.map(
    set => set.map(
      comp => {
        const versionId = comp.semver.raw?.replace(/-0$/, '') ?? '0.0.0';
        switch (comp.operator) {
          case '':
            // With ^0.0.0, somehow we get a left entry with an empty operator and value, we'll fix this up
            return comp.value === '' ? '>=0.0.0' : `==${versionId}`;
          case '=':
            return `==${versionId}`;
          default: // >, >=, <, <= are all valid expressions
            return `${comp.operator}${versionId}`;
        }
      }
    ).join(', ')
  ).join(', ');
}

function toBracketNotation(semverRange: string, suffix?: string, { semver = true }: { semver?: boolean } = {}): string {
  const range = new Range(semverRange);
  return range.set.map(set => {
    if (set.length === 1) {
      const version = set[0].semver.raw;
      switch (set[0].operator || '=') {
        // "[version]" => means exactly version
        case '=': return `[${addSuffix(version)}]`;
        // "(version,]" => means greater than version
        case '>': return `(${addSuffix(version)},]`;
        // "[version,]" => means greater than or equal to that version
        case '>=': return `[${addSuffix(version)},]`;
        // "[,version)" => means less than version
        case '<': return `[,${addSuffix(version, !semver)})`;
        // "[,version]" => means less than or equal to version
        case '<=': return `[,${addSuffix(version)}]`;
      }
    } else if (set.length === 2) {
      const nugetRange = toBracketRange(set[0], set[1]);
      if (nugetRange) {
        return nugetRange;
      }
    }
    throw new Error(`Unsupported SemVer range set in ${semverRange}: ${set.map(comp => comp.value).join(', ')}`);
  }).join(', ');

  function toBracketRange(left: Comparator, right: Comparator): string | undefined {
    if (left.operator.startsWith('<') && right.operator.startsWith('>')) {
      // Order isn't ideal, swap around..
      [left, right] = [right, left];
    }

    // With ^0.0.0, somehow we get a left entry with an empty operator and value, we'll fix this up
    if (left.operator === '' && left.value === '') {
      left = new Comparator('>=0.0.0', left.options);
    }

    if (!left.operator.startsWith('>') || !right.operator.startsWith('<')) {
      // We only support ranges defined like "> (or >=) left, < (or <=) right"
      return undefined;
    }

    const leftBrace = left.operator.endsWith('=') ? '[' : '(';
    const rightBrace = right.operator.endsWith('=') ? ']' : ')';
    return `${leftBrace}${addSuffix(left.semver.raw)},${addSuffix(right.semver.raw, right.operator === '<' && !semver)}${rightBrace}`;
  }

  function addSuffix(str: string | undefined, trimDashZero = false) {
    if (!str) { return ''; }
    if (trimDashZero) {
      str = str.replace(/-0$/, '');
    }
    return suffix ? `${str}${suffix}` : str;
  }
}
