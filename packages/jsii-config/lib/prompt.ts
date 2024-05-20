import { PackageJson } from '@jsii/spec';
import * as inquirer from 'inquirer';

import getQuestions from './questions';
import { BasePackageJson } from './schema';
import { getNestedValue, removeEmptyValues } from './util';

interface PromptAnswers extends PackageJson {
  jsiiTargets: string[];
}

function getPassThroughValues(current: BasePackageJson): {
  readonly metadata?: any;
} {
  const metadata = getNestedValue(['jsii', 'metadata'], current);
  return {
    ...(metadata ? { metadata } : {}),
  };
}

/*
 * Takes current config and prompts for new values
 *
 * Uses any values already present as defaults for the prompt
 */
export default async function getAnswers(
  current: BasePackageJson,
): Promise<PackageJson> {
  const answers = (await inquirer.prompt(
    getQuestions(current),
  )) as PromptAnswers;
  const {
    jsiiTargets: _1,
    tsconfig: _2,
    ...config
  } = removeEmptyValues(answers);
  const confirmInput = await inquirer.prompt({
    type: 'confirm',
    message: `Confirm Jsii Config\n${JSON.stringify(
      config,
      null,
      2,
    )}\nSelect no to revise`,
    name: 'confirm',
  });

  const newConfig = {
    ...config,
    jsii: {
      ...config.jsii,
      ...getPassThroughValues(current),
    },
  };

  if (confirmInput.confirm) {
    return newConfig;
  }

  return getAnswers(newConfig);
}
