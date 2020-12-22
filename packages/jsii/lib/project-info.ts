import * as spec from '@jsii/spec';
import * as ts from 'typescript';

import loadProjectInfoFromPackageJson from './project-info/package-json';
import loadProjectInfoFromTsConfig, {
  hasTsconfigWithJsiiSettings,
} from './project-info/tsconfig';

export interface ProjectInfo {
  readonly projectRoot: string;
  readonly packageJson: any;

  readonly managedTsconfig: boolean;

  readonly name: string;
  readonly version: string;
  readonly author: spec.Person;
  readonly deprecated?: string;
  readonly stability?: spec.Stability;
  readonly license: string;
  readonly repository: {
    readonly type: string;
    readonly url: string;
    readonly directory?: string;
  };
  readonly keywords?: string[];

  readonly main: string;
  readonly types: string;

  readonly dependencies: { readonly [name: string]: string };
  readonly peerDependencies: { readonly [name: string]: string };
  readonly dependencyClosure: readonly spec.Assembly[];
  readonly bundleDependencies?: { readonly [name: string]: string };
  readonly targets: spec.AssemblyTargets;
  readonly metadata?: { [key: string]: any };
  readonly jsiiVersionFormat: 'short' | 'full';
  readonly diagnostics?: { readonly [code: string]: ts.DiagnosticCategory };
  readonly description?: string;
  readonly homepage?: string;
  readonly contributors?: readonly spec.Person[];
  readonly excludeTypescript: string[];
  readonly projectReferences?: boolean;
  readonly tsc?: ts.CompilerOptions;
  readonly bin?: { readonly [name: string]: string };
}

export interface LoadProjectInfoOptions {
  /**
   * Whether peer dependencies will be added if they were found to be missing.
   */
  readonly fixPeerDependencies: boolean;
}

export async function loadProjectInfo(
  projectRoot: string,
  opts: LoadProjectInfoOptions,
): Promise<ProjectInfo> {
  if (await hasTsconfigWithJsiiSettings(projectRoot)) {
    return loadProjectInfoFromTsConfig(projectRoot, opts);
  }
  return loadProjectInfoFromPackageJson(projectRoot, opts);
}
