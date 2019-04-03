import { Documentable } from "./docs";
import { Method } from "./method";
import { Property } from "./property";

export interface TypeMember extends Documentable {
  name: string;
  abstract: boolean;

  kind: MemberKind;
  protected?: boolean;
}

export enum MemberKind {
  Method = 'method',
  Property = 'property'
}

export function isMethod(x: TypeMember): x is Method {
  return x.kind === MemberKind.Method;
}

export function isProperty(x: TypeMember): x is Property {
  return x.kind === MemberKind.Property;
}