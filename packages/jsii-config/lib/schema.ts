import { Separator } from '@inquirer/prompts';
import { Config, PackageJson, Stability } from '@jsii/spec';

/*
 * Structure of package.json accepted by jsii-config
 *
 * Exits with error message if input is missing required fields.
 */
export interface BasePackageJson extends Omit<
  PackageJson,
  'jsii' | 'types' | 'stability'
> {
  jsii?: Config;
  types?: string;
  stability?: Stability;
}

/*
 * A single prompt descriptor used to build questions.
 */
export interface PromptDescriptor {
  type: string;
  message: string;
  default?: any;
  choices?: Array<string | Separator>;
  when?: (answers: any) => boolean;
  validate?: (val: string) => true | string;
}

/*
 * Type of fields used in schema to prompt users.
 */
type Field = PromptDescriptor;

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
 * A condition to ask for specific values user-provided tsconfig values when enabled
 */
const userProvidedConfig = (answers: any) => {
  return Boolean(answers.tsconfig === 'user-provided');
};

/*
 * A condition to ask for specific values jsii-managed tsconfig values when enabled
 */
const jsiiManagedConfig = (answers: any) => {
  return Boolean(answers.tsconfig !== 'user-provided');
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
 * Schema that questions are built from.
 *
 * Name values for questions are built from parent keys.
 */
const schema: ConfigPromptsSchema = {
  stability: {
    type: 'list',
    message: 'Jsii Stability - stability of compiled module apis',
    default: Stability.Experimental,
    choices: Object.values(Stability),
  },
  types: {
    type: 'input',
    message:
      'Jsii Type Definitions - compiled typescript definitions file for module',
    validate: hasLength,
    default: 'index.d.ts',
  },
  jsii: {
    versionFormat: {
      type: 'list',
      message:
        "Version Format - determines the format of the jsii toolchain version string that is included in the.jsii assembly file's jsiiVersion attribute",
      default: 'full',
      choices: [
        'full',
        new Separator(
          'version number including a commit hash (e.g. "0.14.3#2a19bf8") will be used"',
        ),
        new Separator(),
        'short',
        new Separator(
          'only the version number of jsii will be used (e.g. "0.14.3")',
        ),
        new Separator(),
      ],
    },
    targets: {
      java: {
        package: {
          type: 'input',
          message:
            'Java Package - root java package name under which the types will be declared (e.g. "software.amazon.module.core")',
          when: targetEnabled('java'),
          validate: hasLength,
        },
        maven: {
          groupId: {
            type: 'input',
            message:
              'Maven GroupID - package group id (e.g. "software.amazon.module")',
            when: targetEnabled('java'),
            validate: hasLength,
          },
          artifactId: {
            type: 'input',
            message: 'Maven ArtifactID - package artifact id (e.g. "core")',
            when: targetEnabled('java'),
            validate: hasLength,
          },
          versionSuffix: {
            type: 'input',
            message:
              'Maven Version Suffix - optional suffix appended to the end of the maven package\'s version field (e.g. ".DEVPREVIEW")',
            when: targetEnabled('java'),
          },
        },
      },
      python: {
        distName: {
          type: 'input',
          message:
            'Python Distname - PyPI distribution name for the package (e.g. "module-name.core")',
          when: targetEnabled('python'),
          validate: hasLength,
        },
        module: {
          type: 'input',
          message:
            'Python Module - name of the generated Python module (e.g. "module_name.core")',
          when: targetEnabled('python'),
          validate: hasLength,
        },
      },
      dotnet: {
        namespace: {
          type: 'input',
          message:
            '.NET Namespace - root namespace under which types will be declared (e.g. "Amazon.Module")',
          when: targetEnabled('dotnet'),
          validate: hasLength,
        },
        packageId: {
          type: 'input',
          message:
            '.NET Package Id - identifier of the package in the NuGet registry (e.g. "Amazon.Module")',
          when: targetEnabled('dotnet'),
          validate: hasLength,
        },
        iconUrl: {
          type: 'input',
          message:
            '.NET Icon Url - optional url of the icon to be shown in the NuGet gallery (e.g. "https://raw.githubusercontent.com/module-icon.png")',
          when: targetEnabled('dotnet'),
        },
        versionSuffix: {
          type: 'input',
          message:
            '.NET Version Suffix - optional suffix that will be appended at the end of the NuGet package\'s version field, must begin with a "-" (e.g. "-devpreview")',
          when: targetEnabled('dotnet'),
          validate: (val: string): true | string => {
            if (val && val.length && !val.startsWith('-')) {
              return 'versionSuffix must begin with "-"';
            }

            return true;
          },
        },
      },
      go: {
        packageName: {
          type: 'input',
          message:
            'Go Package Name - optional name of the go package. If not specified, package name will be derived from the JavaScript module name by removing non-alphanumeric characters (e.g. @aws-cdk/aws-s3 will be awscdkawss3).',
          when: targetEnabled('go'),
          validate: hasLength,
        },
        moduleName: {
          type: 'input',
          message:
            'Go Module Name - the name of the target repository in which this module will be published (e.g. github.com/foo/bar). The module itself will always be published under a subdirectory named according to the Go package name of the module.',
          when: targetEnabled('go'),
          validate: hasLength,
        },
        versionSuffix: {
          type: 'input',
          message:
            'go Version Suffix - optional suffix that will be appended at the end of the module version, must begin with a "-" (e.g. "-devpreview")',
          when: targetEnabled('go'),
        },
      },
    },
    tsc: {
      outDir: {
        type: 'input',
        message: 'Output Directory - Location for typescript compiler output',
        default: 'dist',
        when: jsiiManagedConfig,
        validate: hasLength,
      },
    },

    tsconfig: {
      type: 'input',
      message:
        'TS config file - use this typescript configuration file to compile the jsii project',
      default: 'tsconfig.json',
      when: userProvidedConfig,
      validate: hasLength,
    },
    validateTsconfig: {
      type: 'list',
      message:
        'TS config validation - validates the provided typescript configuration file against a set of rules',
      when: userProvidedConfig,
      default: 'strict',
      choices: [
        'strict',
        new Separator(
          'Validates the provided config against a strict rule set designed for widespread support and backwards-compatibility.',
        ),
        new Separator(),
        'generated',
        new Separator(
          'Enforces a tsconfig as if it were generated by jsii. Use this to stay compatible with the generated config, but have full ownership over the file.',
        ),
        new Separator(),
        'minimal',
        new Separator(
          'Only enforce options that are known to be incompatible with jsii. This rule set is likely to be incomplete and new rules will be added without notice as incompatibilities emerge.',
        ),
        new Separator(),
        'off',
        new Separator(
          'Disables all config validation, including options that are known to be incompatible with jsii. Intended for experimentation only. Use at your own risk.',
        ),
        new Separator(),
      ],
    },
  },
};

export default schema;
