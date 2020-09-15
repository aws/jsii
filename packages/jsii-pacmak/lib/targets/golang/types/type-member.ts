import { GoClass, Interface, Struct, GoTypeRef } from './index';

/*
 * Structure for Class and Interface methods. Useful for sharing logic for dependency resolution
 */
export interface GoTypeMember {
  name: string;
  parent: GoClass | Interface | Struct;
  reference?: GoTypeRef;
  returnType: string;
}
