import * as ts from 'typescript';

import type { LoadProjectInfoOptions, ProjectInfo } from '../project-info';
import loadSharedProjectInfo, { required } from './_shared';

export default async function loadProjectInfo(
  projectRoot: string,
  opts: LoadProjectInfoOptions,
): Promise<ProjectInfo> {
  const shared = await loadSharedProjectInfo(projectRoot, opts);
  const metadata = mergeMetadata(
    {
      jsii: {
        pacmak: {
          // When `true`, `jsii-pacmak` will use the `Jsii$Default` implementation in code generation even for dependencies.
          hasDefaultInterfaces: true,
        },
      },
    },
    shared.packageJson.jsii?.metadata,
  );

  return {
    ...shared,

    managedTsconfig: true,

    targets: {
      ...required(
        shared.packageJson.jsii,
        'The "package.json" file must specify the "jsii" attribute',
      ).targets,
      js: { npm: shared.name },
    },
    metadata,
    jsiiVersionFormat: _validateVersionFormat(
      shared.packageJson.jsii.versionFormat ?? 'full',
    ),

    excludeTypescript: shared.packageJson.jsii?.excludeTypescript ?? [],
    projectReferences: shared.packageJson.jsii?.projectReferences,
    tsc: {
      outDir: shared.packageJson.jsii?.tsc?.outDir,
      rootDir: shared.packageJson.jsii?.tsc?.rootDir,
    },

    diagnostics: _loadDiagnostics(shared.packageJson.jsii?.diagnostics),
  };
}

function _validateVersionFormat(format: string): 'short' | 'full' {
  if (format !== 'short' && format !== 'full') {
    throw new Error(
      `Invalid jsii.versionFormat "${format}", it must be either "short" or "full" (the default)`,
    );
  }
  return format;
}

/**
 * Merges two metadata blocks together.
 *
 * @param base the base values
 * @param user the user-supplied values, which can override the `base` values
 *
 * @returns the merged metadata block
 */
export function mergeMetadata(
  base: NonNullable<ProjectInfo['metadata']>,
  user: ProjectInfo['metadata'],
): ProjectInfo['metadata'] {
  if (user == null) {
    return base;
  }
  return mergeObjects(base, user);

  function mergeObjects(
    base: Record<string, any>,
    override: Record<string, any>,
  ): Record<string, any> {
    const result: Record<string, any> = {};
    const allKeys = Array.from(
      new Set([...Object.keys(base), ...Object.keys(override)]),
    ).sort();
    for (const key of allKeys) {
      const baseValue = base[key];
      const overrideValue = override[key];

      if (typeof baseValue === 'object' && typeof overrideValue === 'object') {
        if (overrideValue != null) {
          result[key] = mergeObjects(baseValue, overrideValue);
        }
      } else {
        result[key] = overrideValue ?? baseValue;
      }
    }
    return result;
  }
}

function _loadDiagnostics(entries?: {
  [key: string]: string;
}):
  | {
      [key: string]: ts.DiagnosticCategory;
    }
  | undefined {
  if (entries === undefined || Object.keys(entries).length === 0) {
    return undefined;
  }
  const result: { [key: string]: ts.DiagnosticCategory } = {};
  for (const code of Object.keys(entries)) {
    let category: ts.DiagnosticCategory;
    switch (entries[code].trim().toLowerCase()) {
      case 'error':
        category = ts.DiagnosticCategory.Error;
        break;
      case 'warning':
        category = ts.DiagnosticCategory.Warning;
        break;
      case 'suggestion':
        category = ts.DiagnosticCategory.Suggestion;
        break;
      case 'message':
        category = ts.DiagnosticCategory.Message;
        break;
      default:
        throw new Error(
          `Invalid category '${entries[code]}' for code '${code}'`,
        );
    }
    result[code] = category;
  }
  return result;
}
