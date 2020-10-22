import { Config, PackageJson, Stability } from '@jsii/spec';
import { Question, Separator } from 'inquirer';

/*
 * Structure of package.json accepted by jsii-config
 *
 * Exits with error message if input is missing required fields.
 */
export interface BasePackageJson
  extends Omit<PackageJson, 'jsii' | 'types' | 'stability'> {
  jsii?: Config;
  types?: string;
  stability?: Stability;
}

/*
 * Type of fields used in schema to prompt users.
 */
type Field = Omit<Question, 'name'>;

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
      'Jsii Type Definitions - compiled typescript definitions file for module (e.g. "index.d.ts")',
    validate: hasLength,
  },
  jsii: {
    outdir: {
      type: 'input',
      message:
        'Output Directory - Location for typescript compiler output (e.g. "dist")',
      default: 'dist',
      validate: hasLength,
    },
    versionFormat: {
      type: 'list',
      message:
        "Version Format - determines the format of the jsii toolchain version string that is included in the.jsii assembly file's jsiiVersion attribute",
      default: 'full',
      choices: [
        'full',
        new Separator(
          'version number including a commit hash (e.g. "0.14.3 will be used"',
        ),
        new Separator(),
        'short',
        new Separator(
          'only the version number of jsii will be used (e.g. "0.14.3"',
        ),
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
        signAssembly: {
          type: 'confirm',
          default: false,
          message:
            '.NET Sign Assembly - whether the assembly should be strong-name signed. Defaults to false when not specified',
          when: targetEnabled('dotnet'),
        },
        assemblyOriginatorKeyFile: {
          type: 'input',
          default: '',
          message:
            '.NET Assembly Originator Key File - path to the strong-name signing key to be used (e.g. "../../key.snk")',
          when: (answers: any) => {
            return (
              targetEnabled('dotnet')(answers) &&
              Boolean(answers.jsii.targets.dotnet.signAssembly)
            );
          },
          validate: hasLength,
        },
      },
    },
  },
};

export default schema;
