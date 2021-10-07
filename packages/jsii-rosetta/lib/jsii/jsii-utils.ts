import * as ts from 'typescript';

import { AstRenderer } from '../renderer';
import { typeContainsUndefined } from '../typescript/types';

export function isStructInterface(name: string) {
  return !name.startsWith('I');
}

export function isStructType(type: ts.Type) {
  return (
    type.isClassOrInterface() &&
    hasFlag(type.objectFlags, ts.ObjectFlags.Interface) &&
    isStructInterface(type.symbol.name)
  );
}

function hasFlag<A extends number>(flags: A, test: A) {
  // tslint:disable-next-line:no-bitwise
  return (flags & test) !== 0;
}

export interface StructProperty {
  name: string;
  type: ts.Type | undefined;
  questionMark: boolean;
}

export function propertiesOfStruct(type: ts.Type, context: AstRenderer<any>): StructProperty[] {
  return type.isClassOrInterface()
    ? type.getProperties().map((s) => {
        let propType;
        let questionMark = false;

        const propSymbol = type.getProperty(s.name)!;
        const symbolDecl = propSymbol.valueDeclaration;
        if (ts.isPropertyDeclaration(symbolDecl) || ts.isPropertySignature(symbolDecl)) {
          questionMark = symbolDecl.questionToken !== undefined;
          propType = symbolDecl.type && context.typeOfType(symbolDecl.type);
        }

        return {
          name: s.name,
          type: propType,
          questionMark,
        };
      })
    : [];
}

export function structPropertyAcceptsUndefined(prop: StructProperty): boolean {
  return prop.questionMark || (!!prop.type && typeContainsUndefined(prop.type));
}
