// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { readFilePromise } from './util';
import prompt from './prompt';
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
