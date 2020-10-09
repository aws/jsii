import prompt from './prompt';
import { readFilePromise } from './util';
import validatePackageJson from './validate';

export default async function jsiiConfig(packageJsonLocation: string) {
  const manifest = await readFilePromise(packageJsonLocation);
  const packageJson = validatePackageJson(JSON.parse(manifest.toString()));

  const answers = await prompt(packageJson);
  return {
    ...packageJson,
    ...answers,
  };
}
