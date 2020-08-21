import { GoStruct } from './go-type';
import { Package } from '../package';
import { InterfaceType } from 'jsii-reflect';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoStruct {
  public constructor(parent: Package, type: InterfaceType) {
    super(parent, type);
    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
  }
}
