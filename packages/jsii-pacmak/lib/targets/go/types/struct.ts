import { InterfaceType } from 'jsii-reflect';

import { Package } from '../package';
import { GoStruct } from './go-type';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoStruct {
  public constructor(parent: Package, type: InterfaceType) {
    super(parent, type);
    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
  }

  public get usesRuntimePackage(): boolean {
    return this.properties.some((p) => p.usesRuntimePackage);
  }

  public get usesReflectionPackage() {
    return this.properties.length > 0;
  }
}
