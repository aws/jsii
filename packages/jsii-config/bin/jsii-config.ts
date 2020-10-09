import { writeFile } from 'fs';
import { promisify } from 'util';
import * as yargs from 'yargs';

import jsiiConfig from '../lib';

const writeFilePromise = promisify(writeFile);
/*
 * Read package.json and prompt user for new or revised jsii config values.
 */
async function main() {
  const argv = yargs
    .command('$0 [args]', 'configure jsii compilation options in package.json')
    .option('package-json', {
      alias: 'p',
      type: 'string',
      description: "location of module's package.json file",
      default: './package.json',
    })
    .option('dry-run', {
      alias: 'd',
      type: 'boolean',
      description: "print output to stdout, don't write to package.json",
      default: false,
    })
    .help().argv;

  const packageJsonLocation = argv.packageJson as string;
  const config = await jsiiConfig(packageJsonLocation);
  const output = JSON.stringify(config, null, 2);

  if (argv.dryRun) {
    console.log(output);
  } else {
    await writeFilePromise(packageJsonLocation, output);
  }
}

main()
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(100);
  });
