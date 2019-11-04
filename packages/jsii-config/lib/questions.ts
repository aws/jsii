import { QuestionCollection } from 'inquirer';
import schema, { ConfigSchema, JsiiConfig } from './schema';
import { flattenKeys } from './util';

/* 
 * Look for existing nested values in config, return undefined if not found
 */
function getNestedValue(keys: string[], current: JsiiConfig): any {
  try {
    return keys.reduce((val: any, key: string) => val[key], current);
  } catch (_err) {
    return undefined;
  }
}

/*
 * Get current value of field to be used as default
 */
function getCurrentValue(name: string, current?: JsiiConfig): any {
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
function flattenNestedQuestions(fields: ConfigSchema, current?: JsiiConfig): QuestionCollection[] {
  return Object.entries(fields).reduce((accum: QuestionCollection[], [name, question]: [string, any]) => {
    if (question.type && question.message) {
      const currentValue = getCurrentValue(name, current) || question.default;
      return [...accum, {
        name,
        ...question,
        ...currentValue ? { default: currentValue } : {}
      }];
    }

    const flattened = flattenKeys(name, question);
    return [...accum, ...flattenNestedQuestions(flattened, current)];
  }, []);
}

function buildQuestions(fields: ConfigSchema, current?: JsiiConfig): QuestionCollection[] {
  const currentTargets = current && current.targets ? current.targets : {};
  const targetsPrompt: QuestionCollection = {
    name: 'jsiiTargets',
    message: 'Target Languages',
    type: 'checkbox',
    choices: Object.keys(fields.targets),
    default: Object.keys(currentTargets)
  };

  return [targetsPrompt, ...flattenNestedQuestions(fields, current)];
}

export default (current?: JsiiConfig) => buildQuestions(schema, current);
