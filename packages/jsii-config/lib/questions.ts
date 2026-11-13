import { Separator } from '@inquirer/prompts';
import * as path from 'path';

import schema, {
  ConfigPromptsSchema,
  BasePackageJson,
  PromptDescriptor,
} from './schema.ts';
import { getNestedValue, flattenKeys } from './util.ts';

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

/*
 * jsii resolves "main" relative to tsc's outDir, so an outDir that does not
 * contain "main" makes the compiler look for the entry point outside the
 * project. Suggest the directory that holds "main" (no outDir when "main" is
 * at the package root, which compiles in place) and reject other values.
 */
function outDirPrompt(question: NamedPrompt, main: string): NamedPrompt {
  const mainFile = path.posix.normalize(main.replace(/\\/g, '/'));
  const mainDir = path.posix.dirname(mainFile);

  return {
    ...question,
    default: question.default ?? (mainDir === '.' ? undefined : mainDir),
    validate: (val?: string) => {
      const outDir = val?.trim();
      if (!outDir) {
        return true;
      }

      const relative = path.posix.relative(
        path.posix.normalize(outDir.replace(/\\/g, '/')),
        mainFile,
      );
      if (
        relative === '..' ||
        relative.startsWith('../') ||
        path.posix.isAbsolute(relative)
      ) {
        return `"main" (${main}) must be inside the output directory. Use "${mainDir}", leave it empty to compile in place, or change "main" in package.json`;
      }

      return true;
    },
  };
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

  const main = getNestedValue(['main'], current);

  return [
    targetsPrompt,
    tsconfigPrompt,
    ...flattenNestedQuestions(schema, current).map((q) =>
      q.name === 'jsii.tsc.outDir' && typeof main === 'string'
        ? outDirPrompt(q, main)
        : q,
    ),
  ];
}

export default (current: BasePackageJson) => buildQuestions(schema, current);
