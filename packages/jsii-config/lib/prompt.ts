import { input, select, checkbox, confirm, Separator } from '@inquirer/prompts';
import { PackageJson } from '@jsii/spec';

import getQuestions, { NamedPrompt } from './questions';
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

function setNestedValue(obj: any, key: string, value: any): void {
  const parts = key.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current[parts[i]] ??= {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

async function askQuestion(
  q: NamedPrompt,
  answers: Record<string, any>,
): Promise<any> {
  if (q.when && !q.when(answers)) {
    return undefined;
  }

  // Filter out Separator instances for select/checkbox choices
  const stringChoices = q.choices?.filter(
    (c): c is string => !(c instanceof Separator),
  );

  switch (q.type) {
    case 'input':
      return input({
        message: q.message,
        default: q.default,
        validate: q.validate,
      });
    case 'list':
      return select({
        message: q.message,
        choices: (q.choices ?? []).map((c) =>
          c instanceof Separator ? c : { name: c, value: c },
        ),
        default: q.default,
      });
    case 'checkbox':
      return checkbox({
        message: q.message,
        choices: (stringChoices ?? []).map((c) => ({
          name: c,
          value: c,
          checked: Array.isArray(q.default) && q.default.includes(c),
        })),
      });
    case 'confirm':
      return confirm({
        message: q.message,
        default: q.default,
      });
    default:
      throw new Error(`Unsupported prompt type: ${q.type}`);
  }
}

async function promptAll(
  questions: NamedPrompt[],
): Promise<Record<string, any>> {
  const answers: Record<string, any> = {};
  for (const q of questions) {
    // eslint-disable-next-line no-await-in-loop
    const answer = await askQuestion(q, answers);
    if (answer !== undefined) {
      setNestedValue(answers, q.name, answer);
    }
  }
  return answers;
}

/*
 * Takes current config and prompts for new values
 *
 * Uses any values already present as defaults for the prompt
 */
export default async function getAnswers(
  current: BasePackageJson,
): Promise<PackageJson> {
  const answers = (await promptAll(getQuestions(current))) as PromptAnswers;
  const {
    jsiiTargets: _1,
    tsconfig: _2,
    ...config
  } = removeEmptyValues(answers);
  const confirmInput = await confirm({
    message: `Confirm Jsii Config\n${JSON.stringify(
      config,
      null,
      2,
    )}\nSelect no to revise`,
  });

  const newConfig = {
    ...config,
    jsii: {
      ...config.jsii,
      ...getPassThroughValues(current),
    },
  };

  if (confirmInput) {
    return newConfig;
  }

  return getAnswers(newConfig);
}
