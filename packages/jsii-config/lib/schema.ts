/*
 * Structure of jsii configuration in package.json
 */
export interface JsiiConfig {
  outdir: string;
  versionFormat: 'full' | 'short';
  targets: {
    java?: {
      package: string;
      maven: {
        groupId: string;
        artifactId: string;
        versionSuffix?: string;
      };
    };
    python?: {
      module: string;
      distName: string;
    };
    dotnet?: {
      namespace: string;
      packageId: string;
      iconUrl?: string;
      versionSuffix?: string;
      signAssembly?: boolean;
      assemblyOriginatorFile?: string;
    };
  };
  metadata?: {
    [key: string]: any;
  };
}

/*
 * Jsii module stability
 */
export enum Stability {
  experimental = 'experimental',
  stable = 'stable',
  deprecated = 'deprecated',
  external = 'external'
}

/*
 * Structure of package.json accepted by jsii-config
 *
 * Exits with error message if input is missing required fields.
 */
export interface BasePackageJson {
  name: string;
  version: string;
  repository: string | {
    url: string;
    type?: string;
    directory?: string;
  };
  main: string;
  author: string | {
    name: string;
    email?: string;
    url?: string;
    organization?: boolean;
  };
  jsii?: JsiiConfig;
  types?: string;
  stability?: Stability;
}

/*
 * Jsii module package.json format
 *
 * This is structure of package.json after a succesful run of jsii-config
 */
export interface JsiiPackageJson extends BasePackageJson {
  stability: Stability;
  types: string;
  jsii: JsiiConfig;
}

/*
 * Type of fields used in schema to prompt users.
 */
interface Field {
  type: string;
  message: string;
  default?: any;
  choices?: string[];
  when?: (answers: any) => boolean;
  validate?: (val: any, answers: any) => boolean | string;
  filter?: (val: any) => any | void;
}

interface NestedField {
  [key: string]: SchemaField;
}

type SchemaField = Field | NestedField;

/*
 * ConfigSchema
 * 
 * Requires 'targets' key with available Jsii language targets.
 */
export interface ConfigPromptsSchema {
  jsii: {
    targets: SchemaField;
    [key: string]: SchemaField;
  };
  [key: string]: SchemaField;
}

/*
 * Builds a function to ask for target specific values when enabled
 */
const targetEnabled = (target: string) => (answers: any) => {
  return Boolean(answers.jsiiTargets.includes(target));
};

/*
 * Validates that user input has length
 */
function hasLength(val: string): true | string {
  const isValid = Boolean(val) && val.trim().length > 0;
  if (isValid) {
    return true;
  }
  return 'Please enter a value';
}

/*
 * filter out values from answers that are allowed to be undefined
 */
function filterEmpty(val: string): string | void {
  if (typeof val === 'string' && val.length === 0) {
    return undefined;
  }
  return val;
}

/*
 * Schema that questions are built from.
 *
 * Name values for questions are built from parent keys.
 */
const schema: ConfigPromptsSchema = {
  stability: {
    type: 'list',
    message: 'Jsii Stability - stability of compiled module apis',
    default: Stability.experimental,
    choices: Object.keys(Stability)
  },
  types: {
    type: 'input',
    message: 'Jsii Type Definitions - compiled typescript definitions file for module (e.g. index.d.ts)',
    validate: hasLength
  },
  jsii: {
    outdir: {
      type: 'input',
      message: 'Output directory for typescript compiler (e.g. dist)',
      default: 'dist',
      validate: hasLength
    },
    versionFormat: {
      type: 'list',
      message: 'Version format, default is full',
      default: 'full',
      choices: ['full', 'short']
    },
    targets: {
      java: {
        package: {
          type: 'input',
          message: 'Java Package - root java package name under which the types will be declared (e.g. software.amazon.module.core)',
          when: targetEnabled('java'),
          validate: hasLength
        },
        maven: {
          groupId: {
            type: 'input',
            message: 'Maven GroupID - package group id (e.g. software.amazon.module)',
            when: targetEnabled('java'),
            validate: hasLength
          },
          artifactId: {
            type: 'input',
            message: 'Maven ArtifactID - package artifact id (e.g. core)',
            when: targetEnabled('java'),
            validate: hasLength
          },
          versionSuffix: {
            type: 'input',
            message: 'Maven Version Suffix - optional suffix appended to the end of the maven package\'s version field (e.g. .DEVPREVIEW)',
            when: targetEnabled('java'),
            filter: filterEmpty
          }
        }
      },
      python: {
        distName: {
          type: 'input',
          message: 'Python Distname - PyPI distribution name for the package (e.g. module-name.core)',
          when: targetEnabled('python'),
          validate: hasLength
        },
        module: {
          type: 'input',
          message: 'Python Module - name of the generated Python module (e.g. module_name.core)',
          when: targetEnabled('python'),
          validate: hasLength
        }
      },
      dotnet: {
        namespace: {
          type: 'input',
          message: '.NET Namespace - root namespace under which types will be declared (e.g. Amazon.Module)',
          when: targetEnabled('dotnet'),
          validate: hasLength
        },
        packageId: {
          type: 'input',
          message: '.NET Package Id - identifier of the package in the NuGet registry (e.g. Amazon.Module)',
          when: targetEnabled('dotnet'),
          validate: hasLength
        },
        iconUrl: {
          type: 'input',
          message: '.NET Icon Url - optional url of the icon to be shown in the NuGet gallery (e.g. https://raw.githubusercontent.com/module-icon.png)',
          when: targetEnabled('dotnet'),
          filter: filterEmpty
        },
        versionSuffix: {
          type: 'input',
          default: '',
          message: '.NET Version Suffix - optional suffix that will be appended at the end of the NuGet package\'s version field, must begin with a "-" (e.g. -devpreview)',
          when: targetEnabled('dotnet'),
          validate: (val: string): true | string => {
            const hasLengthResult = hasLength(val);
            if (typeof hasLengthResult === 'string') {
              return hasLengthResult;
            } else if (!val.startsWith('-')) {
              return 'versionSuffix must begin with "-"';
            }

            return true;
          },
          filter: filterEmpty
        },
        signAssembly: {
          type: 'confirm',
          default: false,
          message: '.NET Sign Assembly - whether the assembly should be strong-name signed. Defaults to false when not specified',
          when: targetEnabled('dotnet')
        },
        assemblyOriginatorKeyFile: {
          type: 'input',
          default: '',
          message: '.NET Assembly Originator Key File - path to the strong-name signing key to be used (e.g. ../../key.snk)',
          when: (answers: any ) => {
            return targetEnabled('dotnet')(answers) && Boolean(answers.jsii.targets.dotnet.signAssembly);
          },
          validate: hasLength
        }
      }
    }
  }
};

export default schema;
