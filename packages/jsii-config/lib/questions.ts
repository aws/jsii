import { Separator } from '@inquirer/prompts';

import schema, {
  ConfigPromptsSchema,
  BasePackageJson,
  PromptDescriptor,
} from './schema';
import { getNestedValue, flattenKeys } from './util';

export interface NamedPrompt extends PromptDescriptor {
  name: string;
}

/*
 * Get current value of field to be used as default
 */
function getCurrentValue(name: string, current: BasePackageJson): any {
  if (current) {
    return getNestedValue(name.split('.'), current);
  }
  return undefined;
}

/*
 * Recursively build array of questions based on config schema
 *
 * Pull defaults from current values in package.json or previous answers
 */
function flattenNestedQuestions(
  fields: ConfigPromptsSchema,
  current: BasePackageJson,
): NamedPrompt[] {
  return Object.entries(fields).reduce(
    (accum: NamedPrompt[], [name, question]: [string, any]) => {
      if (question.type && question.message) {
        const currentValue = getCurrentValue(name, current) ?? question.default;
        return [
          ...accum,
          {
            name,
            ...question,
            ...(currentValue ? { default: currentValue } : {}),
          },
        ];
      }

      const flattened = flattenKeys(name, question);
      return [...accum, ...flattenNestedQuestions(flattened, current)];
    },
    [],
  );
}

function buildQuestions(
  schema: ConfigPromptsSchema,
  current: BasePackageJson,
): NamedPrompt[] {
  const currentTargets = getNestedValue(['jsii', 'targets'], current) ?? {};
  const targetsPrompt: NamedPrompt = {
    name: 'jsiiTargets',
    message: 'Target Languages',
    type: 'checkbox',
    choices: Object.keys(schema.jsii.targets),
    default: Object.keys(currentTargets),
  };
  const tsconfigPrompt: NamedPrompt = {
    name: 'tsconfig',
    message:
      'Typescript config - should jsii generate a compatible tsconfig or do you want to manage it yourself',
    type: 'list',
    choices: [
      'jsii-managed',
      new Separator('tsconfig will be managed and generated for you by jsii'),
      new Separator(),
      'user-provided',
      new Separator(
        'bring your own user-provided tsconfig for advanced setups',
      ),
    ],
    default: 'jsii-managed',
  };

  return [
    targetsPrompt,
    tsconfigPrompt,
    ...flattenNestedQuestions(schema, current),
  ];
}

export default (current: BasePackageJson) => buildQuestions(schema, current);
