import { GoClass, Interface, GoTypeRef } from './index';

/*
 * Structure for Class and Interface methods. Useful for sharing logic for dependency resolution
 */
export interface TypeField {
  name: string;
  parent: GoClass | Interface;
  references?: GoTypeRef;
}
