import * as yargs from 'yargs';
import { readFilePromise, writeFilePromise } from './util';
import getAnswers from './prompt';

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
  const packageJson = JSON.parse(manifest.toString());

  const currentConfig = packageJson.jsii;
  const answers = await getAnswers(currentConfig);
  const output = JSON.stringify({
    ...packageJson,
    jsii: answers
  }, null, 2);

  if (argv.dryRun) {
    console.log(output);
  } else {
    await writeFilePromise(manifestLocation, output);
  }

  return answers;
}
