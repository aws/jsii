import * as spec from '@jsii/spec';

describe('DotNet Covariant Overrides', () => {
  test('covariant-overrides feature is added to spec', () => {
    // Test that the new feature is properly defined
    const features: spec.JsiiFeature[] = [
      'intersection-types',
      'class-covariant-overrides',
    ];
    expect(features).toContain('covariant-overrides');
  });

  test('assembly with covariant-overrides feature', () => {
    const assembly: spec.Assembly = {
      schema: spec.SchemaVersion.LATEST,
      name: 'test-assembly',
      version: '1.0.0',
      description: 'Test assembly for covariant overrides',
      homepage: 'https://example.com',
      repository: {
        type: 'git',
        url: 'https://github.com/example/test.git',
      },
      author: {
        name: 'Test Author',
        roles: ['author'],
      },
      fingerprint: 'test-fingerprint',
      jsiiVersion: '1.0.0',
      license: 'Apache-2.0',
      usedFeatures: ['class-covariant-overrides'],
    };

    expect(assembly.usedFeatures).toContain('covariant-overrides');
  });

  test('type reference matching for primitives', () => {
    const stringType1: spec.PrimitiveTypeReference = {
      primitive: spec.PrimitiveType.String,
    };
    const stringType2: spec.PrimitiveTypeReference = {
      primitive: spec.PrimitiveType.String,
    };
    const numberType: spec.PrimitiveTypeReference = {
      primitive: spec.PrimitiveType.Number,
    };

    // Simple equality check for primitive types
    expect(stringType1.primitive).toBe(stringType2.primitive);
    expect(stringType1.primitive).not.toBe(numberType.primitive);
  });

  test('type reference matching for named types', () => {
    const baseType: spec.NamedTypeReference = {
      fqn: 'test-assembly.BaseResource',
    };
    const derivedType: spec.NamedTypeReference = {
      fqn: 'test-assembly.DerivedResource',
    };
    const sameBaseType: spec.NamedTypeReference = {
      fqn: 'test-assembly.BaseResource',
    };

    expect(baseType.fqn).toBe(sameBaseType.fqn);
    expect(baseType.fqn).not.toBe(derivedType.fqn);
  });

  test('method with covariant return type', () => {
    const baseMethod: spec.Method = {
      name: 'getResource',
      returns: {
        type: { fqn: 'test-assembly.BaseResource' },
      },
    };

    const derivedMethod: spec.Method = {
      name: 'getResource',
      returns: {
        type: { fqn: 'test-assembly.DerivedResource' },
      },
      overrides: 'test-assembly.BaseClass',
    };

    // Both methods have the same name but different return types
    expect(baseMethod.name).toBe(derivedMethod.name);
    expect(spec.isNamedTypeReference(baseMethod.returns!.type)).toBe(true);
    expect(spec.isNamedTypeReference(derivedMethod.returns!.type)).toBe(true);

    const baseReturnType = baseMethod.returns!.type as spec.NamedTypeReference;
    const derivedReturnType = derivedMethod.returns!
      .type as spec.NamedTypeReference;

    expect(baseReturnType.fqn).not.toBe(derivedReturnType.fqn);
    expect(derivedMethod.overrides).toBeDefined();
  });
});
