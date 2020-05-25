import { Stability } from './assembly';

/**
 * Structure of jsii configuration in package.json
 */
export interface Config {
  /**
   * Output directory of typescript compiler
   */
  outdir: string;

  /**
   * Determines the format of the jsii toolchain version string that will be
   * included in the .jsii assembly file's jsiiVersion attribute.
   *
   * full (the default) - a version number including a commit hash will be used
   * example: 0.14.3 (build 1b1062d)
   *
   * short - only the version number of jsii will be used
   * example: 0.14.3
   */
  versionFormat: 'full' | 'short';

  /**
   * Defines which target languages the module supports.
   */
  targets: {
    java?: {
      /*
       * generated maven package name
       */
      package: string;

      /**
       * groupId and artifactId for generated maven package.
       */
      maven: {
        groupId: string;
        artifactId: string;

        /**
         * optional version suffix for maven module version
         */
        versionSuffix?: string;
      };
    };
    python?: {
      /**
       * name of generated Python module, which will be used by users in import
       * directives
       */
      module: string;

      /**
       * the PyPI distribution name for the package.
       */
      distName: string;
    };
    dotnet?: {
      /**
       * the root namespace under which types will be declared
       */
      namespace: string;

      /**
       * identifier of the package in the NuGet registry
       */
      packageId: string;

      /**
       * url of the icon to be shown in the NuGet Gallery
       */
      iconUrl?: string;

      /**
       * optional suffix that will be appended at the end of the NuGet package's
       * version field
       */
      versionSuffix?: string;

      /**
       * whether the assembly should be strong-name signed
       */
      signAssembly?: boolean;

      /**
       * path to the strong-name signing key to be used
       */
      assemblyOriginatorFile?: string;
    };
  };

  /**
   * used to record additional metadata as key-value pairs that will be recorded
   * as-is into the .jsii assembly file
   */
  metadata?: {
    [key: string]: any;
  };
}

/**
 * Structure of jsii module package.json
 */
export interface PackageJson {
  /**
   * module name for typescript module published to npmjs
   */
  name: string;

  /**
   * module's current semantic version number
   */
  version: string;

  /**
   * module's source code repository information
   */
  repository:
    | string
    | {
        url: string;
        type?: string;
        directory?: string;
      };

  /**
   * main module entrypoint file
   */
  main: string;

  /**
   * module's primary author information
   */
  author:
    | string
    | {
        name: string;
        email?: string;
        url?: string;
        organization?: boolean;
      };

  /**
   * jsii compiler configuration
   */
  jsii: Config;

  /**
   * module's built typescript definitions file location
   */
  types: string;

  /**
   * module's api stability level
   */
  stability?: Stability;
}
