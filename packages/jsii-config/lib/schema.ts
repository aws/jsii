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
export interface ConfigSchema {
  [key: string]: SchemaField;
  targets: SchemaField;
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
const schema: ConfigSchema = {
  outdir: {
    type: 'input',
    message: 'Output directory for typescript compiler',
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
        message: 'Java Package - root Java package name under which the types will be declared',
        when: targetEnabled('java'),
        validate: hasLength
      },
      maven: {
        groupId: {
          type: 'input',
          message: 'Maven GroupID - package group id',
          when: targetEnabled('java'),
          validate: hasLength
        },
        artifactId: {
          type: 'input',
          message: 'Maven ArtifactID - package artifact id',
          when: targetEnabled('java'),
          validate: hasLength
        },
        versionSuffix: {
          type: 'input',
          message: 'Maven Version Suffix - optional suffix appended to the end of the maven package\'s version field',
          when: targetEnabled('java'),
          filter: filterEmpty
        }
      }
    },
    python: {
      module: {
        type: 'input',
        message: 'Python Module - name of the generated Python module',
        when: targetEnabled('python'),
        validate: hasLength
      },
      distName: {
        type: 'input',
        message: 'Python Distname - PyPI distribution name for the package',
        when: targetEnabled('python'),
        validate: hasLength
      }
    },
    dotnet: {
      namespace: {
        type: 'input',
        message: '.NET Namespace - root namespace under which types will be declared',
        when: targetEnabled('dotnet'),
        validate: hasLength
      },
      packageId: {
        type: 'input',
        message: '.NET Package Id - identifier of the package in the NuGet registry',
        when: targetEnabled('dotnet'),
        validate: hasLength
      },
      iconUrl: {
        type: 'input',
        message: '.NET Icon Url - Url of the icon to be shown in the NuGet gallery',
        when: targetEnabled('dotnet'),
        validate: hasLength
      },
      versionSuffix: {
        type: 'input',
        default: '',
        message: '.NET Version Suffix - optional suffix that will be appended at the end of the NuGet package\'s version field, must begin with a -',
        when: targetEnabled('dotnet'),
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
        message: '.NET Assembly Originator Key File - path to the strong-name signing key to be used',
        when: (answers: any ) => {
          return targetEnabled('dotnet')(answers) && Boolean(answers.targets.dotnet.signAssembly);
        },
        validate: hasLength
      }
    }
  }
};

export default schema;
