import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from 'typescript';

import { BASE_COMPILER_OPTIONS } from '../compiler';
import type { LoadProjectInfoOptions, ProjectInfo } from '../project-info';
import {
  JSII_CONFIG_ENTRY,
  validateJsiiConfigBlock,
} from './_jsii-config-block';
import loadSharedProjectInfo from './_shared';
import { mergeMetadata } from './package-json';

export default async function loadProjectInfo(
  projectRoot: string,
  options: LoadProjectInfoOptions,
): Promise<ProjectInfo> {
  const shared = await loadSharedProjectInfo(projectRoot, options);
  if (shared.packageJson.jsii != null) {
    throw new Error(
      `There cannot be a "jsii" section in "package.json" if there is a "${JSII_CONFIG_ENTRY}" in "tsconfig.json".`,
    );
  }

  const tsconfigJson = await parseTsConfigFile(projectRoot);

  const jsiiConfig = validateJsiiConfigBlock(tsconfigJson[JSII_CONFIG_ENTRY]);

  const parsedCommandLine = ts.parseJsonConfigFileContent(
    tsconfigJson,
    ts.sys,
    projectRoot,
  );

  validateTypeScriptConfiguration(parsedCommandLine);

  return {
    ...shared,
    // Specific configuration:
    jsiiVersionFormat: jsiiConfig.jsiiVersionFormat ?? 'full',
    managedTsconfig: false,
    metadata: mergeMetadata(
      {
        jsii: {
          pacmak: {
            // When `true`, `jsii-pacmak` will use the `Jsii$Default` implementation in code generation even for dependencies.
            hasDefaultInterfaces: true,
          },
        },
      },
      jsiiConfig.metadata,
    ),
    targets: jsiiConfig.targets,
    tsc: parsedCommandLine.options,
    // No longer relevant in this configuration mode:
    excludeTypescript: [],
    projectReferences: undefined,
  };
}

/**
 * Checks whether the provided project root has the jsii configuration hosted
 * directly in `tsconfig.json` or not.
 *
 * @param projectRoot the project root (where tsconfig.json is expected to be)
 *
 * @returns `true` if the project has configuration in `tsconfig.json`
 */
export async function hasTsconfigWithJsiiSettings(
  projectRoot: string,
): Promise<boolean> {
  const tsconfig = path.resolve(projectRoot, 'tsconfig.json');
  if (!(await fs.pathExists(tsconfig))) {
    return false;
  }
  return JSII_CONFIG_ENTRY in (await parseTsConfigFile(projectRoot));
}

async function parseTsConfigFile(projectRoot: string) {
  const tsconfig = path.resolve(projectRoot, 'tsconfig.json');
  const { config } = ts.parseConfigFileTextToJson(
    tsconfig,
    await fs.readFile(tsconfig, { encoding: 'utf-8' }),
  );
  return config;
}

/**
 * Validates that a given TypeScript configuration is compatible with jsii
 * runtimes. This should only check what is strictly necessary to ensure
 * compatibility, while allowing developers to control anything else.
 *
 * @param config the TypeScript configuration to validate.
 */
function validateTypeScriptConfiguration(config: ts.ParsedCommandLine): void {
  const compilerOptions = config.options;

  const offenses = new Array<string>();

  switch (compilerOptions.target) {
    // We support all ES6+ targets that are compatible with Node >= 10. A useful
    // reference to update this (should the node target change) is the following
    // website: https://node.green
    case ts.ScriptTarget.ES2015: // <- This one is also known as "ES6"
    case ts.ScriptTarget.ES2016:
    case ts.ScriptTarget.ES2017:
    case ts.ScriptTarget.ES2018: // <- This is the latest supported by Node 10
    case undefined:
      // We support all targets
      break;
    case ts.ScriptTarget.ES2019: // <- Requires Node >= 12.4
    case ts.ScriptTarget.ES2020: // <- Requires Node >= 14.5
    case ts.ScriptTarget.ESNext: // <- A moving target, dangerous!
    case ts.ScriptTarget.Latest: // <- A moving target, dangerous!
    default:
      const targetName = ts.ScriptTarget[compilerOptions.target];
      const recommendedTarget =
        ts.ScriptTarget[BASE_COMPILER_OPTIONS.target ?? ts.ScriptTarget.ES2018];
      offenses.push(
        `Unsupported target: "${targetName}". The recommended value is "${recommendedTarget}".`,
      );
  }

  if (
    compilerOptions.module &&
    compilerOptions.module !== ts.ModuleKind.CommonJS
  ) {
    const kindName = ts.ModuleKind[compilerOptions.module];
    offenses.push(
      `Unsupported module kind: "${kindName}". Only "CommonJS" is supported.`,
    );
  }

  if (compilerOptions.charset && compilerOptions.charset !== 'utf8') {
    offenses.push(
      `Unsupported charset: "${compilerOptions.charset}. Only "utf8" is supported.`,
    );
  }

  if (offenses.length > 0) {
    throw new Error(
      `Unsupported configuration in tsconfig.json:\n${offenses.join('\n')}`,
    );
  }
}
