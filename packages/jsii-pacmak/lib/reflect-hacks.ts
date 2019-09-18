import * as reflect from 'jsii-reflect';
import * as spec from 'jsii-spec';

// All current functions are written against jsii-spec, but jsii-reflect
// is more convenient.
//
// These functions exist to break the isolation barrier until we have time
// to rewrite the code to properly use jsii-reflect.

export function assemblySpec(x: reflect.Assembly): spec.Assembly {
  return (x as any).spec;
}

export function optionalValueSpec(x: reflect.OptionalValue): spec.OptionalValue | undefined {
  return (x as any).spec;
}

export function typeSpec(x: reflect.Type): spec.Type {
  return (x as any).spec;
}

export function docsSpec(x: reflect.Docs): spec.Docs {
  return (x as any).spec;
}

export function propertySpec(x: reflect.Property): spec.Property {
  return (x as any).propSpec;
}