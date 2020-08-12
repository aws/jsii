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

export default function validatePackageJson(packageJson: any): BasePackageJson {
  const missingKeys = requiredNpmKeys.filter((key) => !packageJson[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      // Not the prettiest way to control indentation on multiline strings
      `package.json is missing required fields:${'\n'}${missingKeys
        .map((k) => `- ${k}\n`)
        .join(
          '',
        )}${''}run "npm init" or configure manually and retry jsii-config`,
    );
  }

  return packageJson as BasePackageJson;
}
