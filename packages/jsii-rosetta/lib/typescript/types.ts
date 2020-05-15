import * as ts from 'typescript';
import { AstRenderer } from '../renderer';

/**
 * Return the OTHER type from undefined from a union, returns undefined if there is more than one
 */
export function typeWithoutUndefinedUnion(
  type: ts.Type | undefined,
): ts.Type | undefined {
  if (!type || !type.isUnion()) {
    return type;
  }
  const remaining = type.types.filter(
    (t) => t.flags !== ts.TypeFlags.Undefined,
  );
  if (remaining.length > 1) {
    return undefined;
  }
  return remaining[0];
}

export function builtInTypeName(type: ts.Type): string | undefined {
  const map: { [k: number]: string } = {
    [ts.TypeFlags.Any]: 'any',
    [ts.TypeFlags.Boolean]: 'boolean',
    [ts.TypeFlags.Number]: 'number',
    [ts.TypeFlags.String]: 'string',
    [ts.TypeFlags.StringLiteral]: 'string',
    [ts.TypeFlags.NumberLiteral]: 'number',
    [ts.TypeFlags.BooleanLiteral]: 'boolean',
  };
  return map[type.flags];
}

export function parameterAcceptsUndefined(
  param: ts.ParameterDeclaration,
  type?: ts.Type,
): boolean {
  if (param.initializer !== undefined) {
    return true;
  }
  if (param.questionToken !== undefined) {
    return true;
  }
  if (type) {
    return typeContainsUndefined(type);
  }
  return false;
}

/**
 * This is a simplified check that should be good enough for most purposes
 */
export function typeContainsUndefined(type: ts.Type): boolean {
  if (type.getFlags() & ts.TypeFlags.Undefined) {
    return true;
  }
  if (type.isUnion()) {
    return type.types.some(typeContainsUndefined);
  }
  return false;
}

/**
 * If this is a map type, return the type mapped *to* (key must always be `string` anyway).
 */
export function mapElementType(
  type: ts.Type,
  renderer: AstRenderer<any>,
): ts.Type | undefined {
  if (type.flags & ts.TypeFlags.Object && type.symbol) {
    if (type.symbol.name === '__type') {
      // Declared map type: {[k: string]: A}
      return type.getStringIndexType();
    }

    if (type.symbol.name === '__object') {
      // Derived map type from object literal: typeof({ k: "value" })
      // For every property, get the node that created it (PropertyAssignment), and get the type of the initializer of that node
      const initializerTypes = type.getProperties().map((p) => {
        if (ts.isPropertyAssignment(p.valueDeclaration)) {
          return renderer.typeOfExpression(p.valueDeclaration.initializer);
        }
        return undefined;
      });
      return typeIfSame(initializerTypes);
    }
  }

  return undefined;
}

/**
 * Try to infer the map element type from the properties if they're all the same
 */
export function inferMapElementType(
  elements: ts.NodeArray<ts.ObjectLiteralElementLike>,
  renderer: AstRenderer<any>,
): ts.Type | undefined {
  return typeIfSame(
    elements.map((el) =>
      ts.isPropertyAssignment(el)
        ? renderer.typeOfExpression(el.initializer)
        : undefined,
    ),
  );
}

function typeIfSame(types: Array<ts.Type | undefined>): ts.Type | undefined {
  let ret: ts.Type | undefined;
  for (const type of types) {
    if (ret === undefined) {
      ret = type;
    } else {
      // Not all the same
      if (type !== undefined && ret.flags !== type.flags) {
        return undefined;
      }
    }
  }
  return ret;
}

/**
 * If this is an array type, return the element type of the array
 */
export function arrayElementType(type: ts.Type): ts.Type | undefined {
  if (type.symbol && type.symbol.name === 'Array') {
    const tr = type as ts.TypeReference;
    return tr.aliasTypeArguments && tr.aliasTypeArguments[0];
  }
  return undefined;
}
