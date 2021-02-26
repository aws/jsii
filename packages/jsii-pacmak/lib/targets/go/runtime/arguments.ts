import { CodeMaker, toPascalCase } from 'codemaker';

import { GoClassConstructor, GoMethod } from '../types';

/**
 * Emits the arguments as an inline struct type, so that the "declared" type
 * of parameters is available to the runtime library when processing them.
 *
 * @param code where to emit the generated code
 * @param callable the callable for which an arguments object is needed.
 */
export function emitArgumentObject(
  code: CodeMaker,
  callable: GoMethod | GoClassConstructor,
): void {
  if (callable.parameters.length === 0) {
    // No parameters is signaled witn nil
    code.line('nil, // no parameters');
    return;
  }

  const pkg = callable.parent.pkg;

  // Declare the struct shape. Yes - those arguments are positional... But go
  // structs actually preserve declaration order (failing to do so would be a
  // severe API breaking change, so would require a new language major version).
  code.open(`struct {`);
  for (const param of callable.parameters) {
    // Fields must be exported, or the runtime may not be able to extract their
    // value, which would be... annoying.
    const fieldName = toPascalCase(param.name);
    // No trailing comma, this is a type definition
    code.line(`${fieldName} ${param.reference.scopedInterfaceName(pkg)}`);
  }
  code.close(false);

  // And fill it with values
  code.open('}{');
  for (const param of callable.parameters) {
    code.line(`${param.name},`);
  }
  code.close('},');
}
