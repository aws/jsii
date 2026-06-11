import prompt from './prompt.ts';
import { readFilePromise } from './util.ts';
import validatePackageJson from './validate.ts';

export default async function jsiiConfig(packageJsonLocation: string) {
  const manifest = await readFilePromise(packageJsonLocation);
  const packageJson = validatePackageJson(JSON.parse(manifest.toString()));

  const answers = await prompt(packageJson);
  return {
    ...packageJson,
    ...answers,
  };
}
