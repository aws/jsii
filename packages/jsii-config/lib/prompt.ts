import * as inquirer from 'inquirer';
import getQuestions from './questions';
import { JsiiConfig } from './schema';

interface PromptAnswers extends JsiiConfig {
  jsiiTargets: string[];
}

/*
 * Takes current config and prompts for new values
 *
 * Uses any values already present as defaults for the prompt
 */
export default async function getAnswers(current?: JsiiConfig): Promise<JsiiConfig> {
  const answers = await inquirer.prompt(getQuestions(current)) as PromptAnswers;
  const { jsiiTargets: _, ...config } = answers;
  const confirmInput = await inquirer.prompt({
    type: 'confirm',
    message: `Confirm Jsii Config\n${JSON.stringify(config, null, 2)}\nSelect no to revise`,
    name: 'confirm'
  });

  // Values that may be present on pre-existing config that are not prompted for
  const passThroughFields = {
    ...current && current.metadata ? {
      metadata: current.metadata
    }: {}
  };

  const newConfig = {
    ...config,
    ...passThroughFields
  };

  if (confirmInput.confirm) {
    return newConfig;
  }
  
  return getAnswers(newConfig);
}
