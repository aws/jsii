import { CodeMaker } from 'codemaker';
import { InterfaceType } from 'jsii-reflect';

import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import { GoStruct } from './go-type';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoStruct {
  public constructor(parent: Package, type: InterfaceType) {
    super(parent, type);
    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
  }

  public emitRegistration(code: CodeMaker): void {
    code.open(`${JSII_RT_ALIAS}.RegisterStruct(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);
    code.line(`reflect.TypeOf((*${this.interfaceName})(nil)).Elem(),`);
    code.close(')');
  }

  public get usesRuntimePackage(): boolean {
    return this.properties.some((p) => p.usesRuntimePackage);
  }
}
