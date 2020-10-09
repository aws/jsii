import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Property } from './property';
import { Type } from './type';
import { TypeMember } from './type-member';
import { TypeSystem } from './type-system';

export abstract class ReferenceType extends Type {
  public constructor(
    public system: TypeSystem,
    public assembly: Assembly,
    spec: jsii.Type,
  ) {
    super(system, assembly, spec);
  }

  /**
   * All the base interfaces that this interface extends.
   */
  public get interfaces(): InterfaceType[] {
    return this.getInterfaces();
  }

  /**
   * List of methods (without inherited methods).
   */
  public get ownMethods(): Method[] {
    return Object.values(this.getMethods(false));
  }

  /**
   * List of own and inherited methods
   */
  public get allMethods(): Method[] {
    return Object.values(this.getMethods(true));
  }

  /**
   * List of properties.
   */
  public get ownProperties(): Property[] {
    return Object.values(this.getProperties());
  }

  /**
   * List of own and inherited methods
   */
  public get allProperties(): Property[] {
    return Object.values(this.getProperties(true));
  }

  public get ownMembers(): TypeMember[] {
    return Object.values(this.getMembers(false));
  }

  public get allMembers(): TypeMember[] {
    return Object.values(this.getMembers(true));
  }

  public getMembers(inherited = false): { [name: string]: TypeMember } {
    return Object.assign(
      this.getMethods(inherited),
      this.getProperties(inherited),
    );
  }

  /**
   * Lists all interfaces this interface extends.
   * @param inherited include all interfaces implemented by all super interfaces (default: false)
   */
  public abstract getInterfaces(inherited?: boolean): InterfaceType[];

  /**
   * Lists all properties in this class.
   * @param inherited include all properties inherited from base classes (default: false)
   */
  public abstract getProperties(
    inherited?: boolean,
  ): { [name: string]: Property };

  /**
   * List all methods in this class.
   * @param inherited include all methods inherited from base classes (default: false)
   */
  public abstract getMethods(inherited?: boolean): { [name: string]: Method };
}
