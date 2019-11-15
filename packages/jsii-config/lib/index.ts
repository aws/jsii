import * as yargs from 'yargs';
import { readFilePromise, writeFilePromise } from './util';
import getAnswers from './prompt';
import { BasePackageJson } from './schema';

/*
 * Top level keys required for jsii that aren't controlled by jsii-config
 */
const requiredNpmKeys: Array<keyof BasePackageJson> = [
  'name',
  'version',
  'repository',
  'main',
  'author',
];

function validatePackageJson(packageJson: any): BasePackageJson {
  const missingKeys = requiredNpmKeys.filter((key: string): boolean => !packageJson[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      // Not the prettiest way to control indentation on multiline strings
      `package.json is missing required fields:${'\n'
      }${missingKeys.map(k => `- ${k}\n`).join('')}${''
      }run "npm init" or configure manually and retry jsii-config`
    );
  }

  return packageJson as BasePackageJson;
}

/*
 * Read package.json and prompt user for new or revised jsii config values.
 */
export default async function main() {
  const argv = yargs
    .command('$0 [args]', 'configure jsii compilation options in package.json')
    .option('package-manifest', {
      alias: 'p',
      type: 'string',
      description: 'location of module\'s package.json file',
      default: './package.json'
    })
    .option('dry-run', {
      alias: 'd',
      type: 'boolean',
      description: 'print output to stdout, don\'t write to package.json',
      default: false
    })
    .help()
    .argv;

  const manifestLocation = argv.packageManifest as string;
  const manifest = await readFilePromise(manifestLocation);
  const packageJson = validatePackageJson(JSON.parse(manifest.toString()));

  const answers = await getAnswers(packageJson);
  const output = JSON.stringify({
    ...packageJson,
    ...answers
  }, null, 2);

  if (argv.dryRun) {
    console.log(output);
  } else {
    await writeFilePromise(manifestLocation, output);
  }

  return answers;
}
