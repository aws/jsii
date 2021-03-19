import { CodeMaker } from 'codemaker';

import { GoParameter } from '../types';
import { slugify } from './util';

/**
 * Packages arguments such that they can be sent correctly to the jsii runtime
 * library.
 *
 * @returns the expression to use in place of the arguments for the jsii
 *          runtime library call.
 */
export function emitArguments(
  code: CodeMaker,
  parameters: readonly GoParameter[],
  returnVarName: string,
): string | undefined {
  const argsList = parameters.map((param) => param.name);
  if (argsList.length === 0) {
    return undefined;
  }
  if (parameters[parameters.length - 1].parameter.variadic) {
    // For variadic methods, we must build up the []interface{} slice by hand,
    // as there would not be any implicit conversion happening when passing
    // the variadic argument as a splat to the append function...
    const head = argsList.slice(0, argsList.length - 1);
    const tail = argsList[argsList.length - 1];

    const variable = slugify('args', [...argsList, returnVarName]);
    const elt = slugify('a', [variable]);
    code.line(`${variable} := []interface{}{${head.join(', ')}}`);
    code.openBlock(`for _, ${elt} := range ${tail}`);
    code.line(`${variable} = append(${variable}, ${elt})`);
    code.closeBlock();
    code.line();
    return variable;
  }
  return `[]interface{}{${argsList.join(', ')}}`;
}
