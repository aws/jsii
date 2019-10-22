import ts = require('typescript');
import { AstConverter } from '../converter';

export function isStructInterface(name: string) {
  return !name.startsWith('I');
}

export function isStructType(type: ts.Type) {
  return type.isClassOrInterface()
    && hasFlag(type.objectFlags, ts.ObjectFlags.Interface)
    && isStructInterface(type.symbol.name);
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

export function propertiesOfStruct(type: ts.Type, context: AstConverter<any>): StructProperty[] {
  return type.isClassOrInterface() ? type.getProperties().map(s => {
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
  }) : [];
}

export function parameterAcceptsUndefined(param: ts.ParameterDeclaration, type?: ts.Type): boolean {
  if (param.initializer !== undefined) { return true; }
  if (param.questionToken !== undefined) { return true; }
  if (type) { return typeContainsUndefined(type); }
  return false;
}

export function structPropertyAcceptsUndefined(prop: StructProperty): boolean {
  return prop.questionMark || (!!prop.type && typeContainsUndefined(prop.type));
}

/**
 * This is a simplified check that should be good enough for most purposes
 */
function typeContainsUndefined(type: ts.Type): boolean {
  if (type.getFlags() === ts.TypeFlags.Undefined) { return true; }
  if (type.isUnion()) { return type.types.some(typeContainsUndefined); }
  return false;
}