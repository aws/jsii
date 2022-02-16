import * as spec from '@jsii/spec';
import * as assert from 'assert';
import * as Case from 'case';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import deepEqual = require('deep-equal');
import * as ts from 'typescript';

import { Emitter } from './emitter';
import { JsiiDiagnostic } from './jsii-diagnostic';
import { getRelatedNode } from './node-bindings';
import * as bindings from './node-bindings';
import { ProjectInfo } from './project-info';

export class Validator implements Emitter {
  public static VALIDATIONS: ValidationFunction[] = _defaultValidations();

  private _diagnostics = new Array<JsiiDiagnostic>();

  public constructor(
    public readonly projectInfo: ProjectInfo,
    public readonly assembly: spec.Assembly,
  ) {}

  public async emit(): Promise<ts.EmitResult> {
    this._diagnostics = [];

    for (const validation of Validator.VALIDATIONS) {
      validation(this, this.assembly, (diag) => this._diagnostics.push(diag));
    }

    try {
      return await Promise.resolve({
        diagnostics: this._diagnostics,
        emitSkipped: this._diagnostics.some(
          (diag) => diag.category === ts.DiagnosticCategory.Error,
        ),
      });
    } finally {
      // Clearing ``this._diagnostics`` to allow contents to be garbage-collected.
      delete this._diagnostics;
    }
  }
}

export type DiagnosticEmitter = (diag: JsiiDiagnostic) => void;
export type ValidationFunction = (
  validator: Validator,
  assembly: spec.Assembly,
  diagnostic: DiagnosticEmitter,
) => void;

function _defaultValidations(): ValidationFunction[] {
  return [
    _typeNamesMustUsePascalCase,
    _enumMembersMustUserUpperSnakeCase,
    _memberNamesMustUseCamelCase,
    _staticConstantNamesMustUseUpperSnakeCase,
    _memberNamesMustNotLookLikeJavaGettersOrSetters,
    _allTypeReferencesAreValid,
    _inehritanceDoesNotChangeContracts,
    _staticMembersAndNestedTypesMustNotSharePascalCaseName,
  ];

  function _typeNamesMustUsePascalCase(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const type of _allTypes(assembly)) {
      if (type.name !== Case.pascal(type.name)) {
        diagnostic(
          JsiiDiagnostic.JSII_8000_PASCAL_CASED_TYPE_NAMES.createDetached(
            type.name,
          ),
        );
      }
    }
  }

  function _enumMembersMustUserUpperSnakeCase(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const type of _allTypes(assembly)) {
      if (!spec.isEnumType(type)) {
        continue;
      }

      for (const member of type.members) {
        if (member.name && !isConstantCase(member.name)) {
          diagnostic(
            JsiiDiagnostic.JSII_8001_ALL_CAPS_ENUM_MEMBERS.createDetached(
              member.name,
              type.fqn,
            ),
          );
        }
      }
    }
  }

  function _memberNamesMustUseCamelCase(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const { member, type } of _allMembers(assembly)) {
      if (member.static && (member as spec.Property).const) {
        continue;
      }
      if (member.name && member.name !== Case.camel(member.name)) {
        diagnostic(
          JsiiDiagnostic.JSII_8002_CAMEL_CASED_MEMBERS.createDetached(
            member.name,
            type.fqn,
          ),
        );
      }
    }
  }

  function _staticConstantNamesMustUseUpperSnakeCase(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const { member, type } of _allMembers(assembly)) {
      if (!member.static || !(member as spec.Property).const) {
        continue;
      }
      if (
        member.name &&
        !isConstantCase(member.name) &&
        member.name !== Case.pascal(member.name) &&
        member.name !== Case.camel(member.name)
      ) {
        diagnostic(
          JsiiDiagnostic.JSII_8003_STATIC_CONST_CASING.createDetached(
            member.name,
            type.name,
          ),
        );
      }
    }
  }

  function _memberNamesMustNotLookLikeJavaGettersOrSetters(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const { member, type } of _allMembers(assembly)) {
      if (!member.name) {
        continue;
      }
      const snakeName = Case.snake(member.name);
      if (
        snakeName.startsWith('get_') &&
        _isEmpty((member as spec.Method).parameters)
      ) {
        diagnostic(
          JsiiDiagnostic.JSII_5000_JAVA_GETTERS.createDetached(
            member.name,
            type.name,
          ),
        );
      } else if (
        snakeName.startsWith('set_') &&
        ((member as spec.Method).parameters ?? []).length === 1
      ) {
        diagnostic(
          JsiiDiagnostic.JSII_5001_JAVA_SETTERS.createDetached(
            member.name,
            type.name,
          ),
        );
      }
    }
  }

  function _allTypeReferencesAreValid(
    validator: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const typeRef of _allTypeReferences(assembly)) {
      const [assm] = typeRef.fqn.split('.');
      if (assembly.name === assm) {
        if (!(typeRef.fqn in (assembly.types ?? {}))) {
          diagnostic(
            JsiiDiagnostic.JSII_3000_EXPORTED_API_USES_HIDDEN_TYPE.create(
              typeRef.node!, // Pretend there is always a value
              typeRef.fqn,
            ),
          );
        }
        continue;
      }
      const foreignAssm = validator.projectInfo.dependencyClosure.find(
        (dep) => dep.name === assm,
      );
      if (!foreignAssm) {
        diagnostic(
          JsiiDiagnostic.JSII_9000_UNKNOWN_MODULE.createDetached(assm),
        );
        continue;
      }
      if (!(typeRef.fqn in (foreignAssm.types ?? {}))) {
        diagnostic(
          JsiiDiagnostic.JSII_9001_TYPE_NOT_FOUND.createDetached(typeRef),
        );
      }
    }
  }

  function _inehritanceDoesNotChangeContracts(
    validator: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const type of _allTypes(assembly)) {
      if (spec.isClassType(type)) {
        for (const method of type.methods ?? []) {
          _validateMethodOverride(method, type);
        }
        for (const property of type.properties ?? []) {
          _validatePropertyOverride(property, type);
        }
      }
      if (
        spec.isClassOrInterfaceType(type) &&
        (type.interfaces?.length ?? 0) > 0
      ) {
        for (const method of _allImplementations(type, (t) => t.methods)) {
          _validateMethodImplementation(method, type);
        }
        for (const property of _allImplementations(type, (t) => t.properties)) {
          _validatePropertyImplementation(property, type);
        }
      }
    }

    /**
     * Lists all "implementations" from the given type, using the provided
     * implementation getter. Note that abstract members may be part of the
     * result (in particular, if `type` is an interface type, or if it's an
     * abstract class with unimplemented members) -- I just couldn't come up
     * with a name that actually describes this.
     *
     * @param type   the type which implemented members are needed.
     * @param getter the getter to obtain methods or properties from the type.
     *
     * @returns a list of members (possibly empty, always defined)
     */
    function _allImplementations<T extends spec.Property | spec.Method>(
      type: spec.ClassType | spec.InterfaceType,
      getter: (type: spec.ClassType | spec.InterfaceType) => T[] | undefined,
    ): T[] {
      const result = new Array<T>();
      const known = new Set<string>();

      for (const member of getter(type) ?? []) {
        result.push(member);
        known.add(member.name);
      }

      if (spec.isClassType(type) && type.base) {
        // We have a parent class, collect their concrete members, too (recursively)...
        const base = _dereference(type.base, assembly, validator);
        assert(base != null && spec.isClassType(base));
        for (const member of _allImplementations(base, getter)) {
          if (known.has(member.name)) {
            continue;
          }
          // The member is copied, so that its `overrides` property won't be
          // altered, since this member is "borrowed" from a parent type. We
          // only check it, but should not record `overrides` relationships to
          // it as those could be invalid per the parent type (i.e: the parent
          // member may not be able to implement an interface, if that type does
          // not actually declare implementing that).
          const memberCopy = { ...member };
          // Forward the related node if there's one, so diagnostics are bound.
          const node = bindings.getRelatedNode(member);
          if (node != null) {
            bindings.setRelatedNode(memberCopy, node);
          }

          result.push(memberCopy);
          known.add(member.name);
        }
      }

      return result;
    }

    function _validateMethodOverride(
      method: spec.Method,
      type: spec.ClassType,
    ): boolean {
      if (!type.base) {
        return false;
      }
      const baseType = _dereference(
        type.base,
        assembly,
        validator,
      ) as spec.ClassType;
      if (!baseType) {
        return false;
      }
      const overridden = (baseType.methods ?? []).find(
        (m) => m.name === method.name,
      );
      if (!overridden) {
        return _validateMethodOverride(method, baseType);
      }
      _assertSignaturesMatch(
        overridden,
        method,
        `${type.fqn}#${method.name}`,
        `overriding ${baseType.fqn}`,
      );
      method.overrides = baseType.fqn;
      return true;
    }

    function _validatePropertyOverride(
      property: spec.Property,
      type: spec.ClassType,
    ): boolean {
      if (!type.base) {
        return false;
      }
      const baseType = _dereference(
        type.base,
        assembly,
        validator,
      ) as spec.ClassType;
      if (!baseType) {
        return false;
      }
      const overridden = (baseType.properties ?? []).find(
        (p) => p.name === property.name,
      );
      if (!overridden) {
        return _validatePropertyOverride(property, baseType);
      }
      _assertPropertiesMatch(
        overridden,
        property,
        `${type.fqn}#${property.name}`,
        `overriding ${baseType.fqn}`,
      );
      property.overrides = baseType.fqn;
      return true;
    }

    function _validateMethodImplementation(
      method: spec.Method,
      type: spec.ClassType | spec.InterfaceType,
    ): boolean {
      if (!type.interfaces) {
        // Abstract classes may not directly implement all members, need to check their supertypes...
        if (spec.isClassType(type) && type.base && type.abstract) {
          return _validateMethodImplementation(
            method,
            _dereference(type.base, assembly, validator) as spec.ClassType,
          );
        }
        return false;
      }
      for (const iface of type.interfaces) {
        const ifaceType = _dereference(
          iface,
          assembly,
          validator,
        ) as spec.InterfaceType;
        const implemented = (ifaceType.methods ?? []).find(
          (m) => m.name === method.name,
        );
        if (implemented) {
          _assertSignaturesMatch(
            implemented,
            method,
            `${type.fqn}#${method.name}`,
            `implementing ${ifaceType.fqn}`,
          );
          // We won't replace a previous overrides declaration from a method override, as those have
          // higher precedence than an initial implementation.
          method.overrides = method.overrides ?? iface;
          return true;
        }
        if (_validateMethodImplementation(method, ifaceType)) {
          return true;
        }
      }
      return false;
    }

    function _validatePropertyImplementation(
      property: spec.Property,
      type: spec.ClassType | spec.InterfaceType,
    ): boolean {
      if (!type.interfaces) {
        // Abstract classes may not directly implement all members, need to check their supertypes...
        if (spec.isClassType(type) && type.base && type.abstract) {
          return _validatePropertyImplementation(
            property,
            _dereference(type.base, assembly, validator) as spec.ClassType,
          );
        }
        return false;
      }
      for (const iface of type.interfaces) {
        const ifaceType = _dereference(
          iface,
          assembly,
          validator,
        ) as spec.InterfaceType;
        const implemented = (ifaceType.properties ?? []).find(
          (p) => p.name === property.name,
        );
        if (implemented) {
          _assertPropertiesMatch(
            implemented,
            property,
            `${type.fqn}#${property.name}`,
            `implementing ${ifaceType.fqn}`,
          );
          // We won't replace a previous overrides declaration from a property override, as those
          // have higher precedence than an initial implementation.
          property.overrides = property.overrides ?? ifaceType.fqn;
          return true;
        }
        if (_validatePropertyImplementation(property, ifaceType)) {
          return true;
        }
      }
      return false;
    }

    function _assertSignaturesMatch(
      expected: spec.Method,
      actual: spec.Method,
      label: string,
      action: string,
    ) {
      if (!!expected.protected !== !!actual.protected) {
        const expVisibility = expected.protected ? 'protected' : 'public';
        const actVisibility = actual.protected ? 'protected' : 'public';
        diagnostic(
          JsiiDiagnostic.JSII_5002_OVERRIDE_CHANGES_VISIBILITY.createDetached(
            label,
            action,
            actVisibility,
            expVisibility,
          ),
        );
      }
      if (!deepEqual(actual.returns, expected.returns)) {
        const expType = spec.describeTypeReference(expected.returns?.type);
        const actType = spec.describeTypeReference(actual.returns?.type);
        diagnostic(
          JsiiDiagnostic.JSII_5003_OVERRIDE_CHANGES_RETURN_TYPE.createDetached(
            label,
            action,
            actType,
            expType,
          ),
        );
      }
      const expectedParams = expected.parameters ?? [];
      const actualParams = actual.parameters ?? [];
      if (expectedParams.length !== actualParams.length) {
        diagnostic(
          JsiiDiagnostic.JSII_5005_OVERRIDE_CHANGES_PARAM_COUNT.createDetached(
            label,
            action,
            actualParams.length,
            expectedParams.length,
          ),
        );
        return;
      }
      for (let i = 0; i < expectedParams.length; i++) {
        const expParam = expectedParams[i];
        const actParam = actualParams[i];
        if (!deepEqual(expParam.type, actParam.type)) {
          diagnostic(
            JsiiDiagnostic.JSII_5006_OVERRIDE_CHANGES_PARAM_TYPE.createDetached(
              label,
              action,
              actParam,
              expParam,
            ),
          );
        }
        // Not-ing those to force the values to a strictly boolean context (they're optional, undefined means false)
        if (expParam.variadic !== actParam.variadic) {
          diagnostic(
            JsiiDiagnostic.JSII_5007_OVERRIDE_CHANGES_VARIADIC.createDetached(
              label,
              action,
              actParam.variadic,
              expParam.variadic,
            ),
          );
        }
        if (expParam.optional !== actParam.optional) {
          diagnostic(
            JsiiDiagnostic.JSII_5008_OVERRIDE_CHANGES_PARAM_OPTIONAL.createDetached(
              label,
              action,
              actParam,
              expParam,
            ),
          );
        }
      }
    }

    function _assertPropertiesMatch(
      expected: spec.Property,
      actual: spec.Property,
      label: string,
      action: string,
    ) {
      const actualNode = bindings.getPropertyRelatedNode(actual);
      const expectedNode = bindings.getPropertyRelatedNode(expected);
      if (!!expected.protected !== !!actual.protected) {
        const expVisibility = expected.protected ? 'protected' : 'public';
        const actVisibility = actual.protected ? 'protected' : 'public';
        diagnostic(
          JsiiDiagnostic.JSII_5002_OVERRIDE_CHANGES_VISIBILITY.create(
            actualNode?.modifiers?.find(
              (mod) =>
                mod.kind === ts.SyntaxKind.PublicKeyword ||
                mod.kind === ts.SyntaxKind.ProtectedKeyword,
            ) ?? declarationName(actualNode),
            label,
            action,
            actVisibility,
            expVisibility,
          ).maybeAddRelatedInformation(
            expectedNode?.modifiers?.find(
              (mod) =>
                mod.kind === ts.SyntaxKind.PublicKeyword ||
                mod.kind === ts.SyntaxKind.ProtectedKeyword,
            ) ?? declarationName(expectedNode),
            'The implemented delcaration is here.',
          ),
        );
      }
      if (!deepEqual(expected.type, actual.type)) {
        diagnostic(
          JsiiDiagnostic.JSII_5004_OVERRIDE_CHANGES_PROP_TYPE.create(
            actualNode?.type ?? declarationName(actualNode),
            label,
            action,
            actual.type,
            expected.type,
          ).maybeAddRelatedInformation(
            expectedNode?.type ?? declarationName(expectedNode),
            'The implemented delcaration is here.',
          ),
        );
      }
      if (expected.immutable !== actual.immutable) {
        diagnostic(
          JsiiDiagnostic.JSII_5010_OVERRIDE_CHANGES_MUTABILITY.create(
            actualNode?.modifiers?.find(
              (mod) => mod.kind === ts.SyntaxKind.ReadonlyKeyword,
            ) ?? declarationName(actualNode),
            label,
            action,
            actual.immutable,
            expected.immutable,
          ).maybeAddRelatedInformation(
            expectedNode?.modifiers?.find(
              (mod) => mod.kind === ts.SyntaxKind.ReadonlyKeyword,
            ) ?? declarationName(expectedNode),
            'The implemented delcaration is here.',
          ),
        );
      }
      if (expected.optional !== actual.optional) {
        diagnostic(
          JsiiDiagnostic.JSII_5009_OVERRIDE_CHANGES_PROP_OPTIONAL.create(
            actualNode?.questionToken ??
              actualNode?.type ??
              declarationName(actualNode),
            label,
            action,
            actual.optional,
            expected.optional,
          ).maybeAddRelatedInformation(
            expectedNode?.questionToken ??
              expectedNode?.type ??
              declarationName(expectedNode),
            'The implemented delcaration is here.',
          ),
        );
      }
    }
  }

  function _staticMembersAndNestedTypesMustNotSharePascalCaseName(
    _: Validator,
    assembly: spec.Assembly,
    diagnostic: DiagnosticEmitter,
  ) {
    for (const nestedType of Object.values(assembly.types ?? {})) {
      if (nestedType.namespace == null) {
        continue;
      }
      const nestingType =
        assembly.types![`${assembly.name}.${nestedType.namespace}`];
      if (nestingType == null) {
        continue;
      }
      const nestedTypeName = Case.pascal(nestedType.name);
      for (const { name, member } of staticMembers(nestingType)) {
        if (name === nestedTypeName) {
          let diag =
            JsiiDiagnostic.JSII_5020_STATIC_MEMBER_CONFLICTS_WITH_NESTED_TYPE.create(
              getRelatedNode(member)!,
              nestingType,
              member,
              nestedType,
            );
          const nestedTypeNode = getRelatedNode(nestedType);
          if (nestedTypeNode != null) {
            diag = diag.addRelatedInformation(
              nestedTypeNode,
              'This is the conflicting nested type declaration',
            );
          }
          diagnostic(diag);
        }
      }
    }

    function staticMembers(type: spec.Type) {
      if (spec.isClassOrInterfaceType(type)) {
        return [
          ...(type.methods?.filter((method) => method.static) ?? []),
          ...(type.properties?.filter((prop) => prop.static) ?? []),
        ].map((member) => ({ name: Case.pascal(member.name), member }));
      }
      return type.members.map((member) => ({ name: member.name, member }));
    }
  }
}

function _allTypes(assm: spec.Assembly): spec.Type[] {
  return Object.values(assm.types ?? {});
}

function _allMethods(
  assm: spec.Assembly,
): Array<{ member: spec.Method; type: spec.Type }> {
  const methods = new Array<{ member: spec.Method; type: spec.Type }>();
  for (const type of _allTypes(assm)) {
    if (!spec.isClassOrInterfaceType(type)) {
      continue;
    }
    if (!type.methods) {
      continue;
    }
    type.methods.forEach((method) => methods.push({ member: method, type }));
  }
  return methods;
}

function _allProperties(
  assm: spec.Assembly,
): Array<{ member: spec.Property; type: spec.Type }> {
  const properties = new Array<{ member: spec.Property; type: spec.Type }>();
  for (const type of _allTypes(assm)) {
    if (!spec.isClassOrInterfaceType(type)) {
      continue;
    }
    if (!type.properties) {
      continue;
    }
    type.properties.forEach((property) =>
      properties.push({ member: property, type }),
    );
  }
  return properties;
}

function _allMembers(
  assm: spec.Assembly,
): Array<{ member: spec.Property | spec.Method; type: spec.Type }> {
  return [..._allMethods(assm), ..._allProperties(assm)];
}

interface AnnotatedTypeReference extends spec.NamedTypeReference {
  readonly node: ts.Node | undefined;
}

function _allTypeReferences(
  assm: spec.Assembly,
): readonly AnnotatedTypeReference[] {
  const typeReferences = new Array<AnnotatedTypeReference>();
  for (const type of _allTypes(assm)) {
    if (!spec.isClassOrInterfaceType(type)) {
      continue;
    }
    if (spec.isClassType(type)) {
      const node = bindings.getClassRelatedNode(type);
      if (type.base) {
        typeReferences.push({
          fqn: type.base,
          node: node?.heritageClauses?.find(
            (hc) => hc.token === ts.SyntaxKind.ExtendsKeyword,
          )?.types[0],
        });
      }
      if (type.initializer?.parameters) {
        for (const param of type.initializer.parameters) {
          _collectTypeReferences(
            param.type,
            bindings.getParameterRelatedNode(param)?.type,
          );
        }
      }
    }
    if (type.interfaces) {
      const node = bindings.getClassOrInterfaceRelatedNode(type);
      type.interfaces.forEach((iface) =>
        typeReferences.push({
          fqn: iface,
          node: node?.heritageClauses?.find(
            (hc) =>
              hc.token ===
              (spec.isInterfaceType(type)
                ? ts.SyntaxKind.ImplementsKeyword
                : ts.SyntaxKind.ExtendsKeyword),
          ),
        }),
      );
    }
  }
  for (const { member: prop } of _allProperties(assm)) {
    _collectTypeReferences(
      prop.type,
      bindings.getPropertyRelatedNode(prop)?.type,
    );
  }
  for (const { member: meth } of _allMethods(assm)) {
    if (meth.returns) {
      _collectTypeReferences(
        meth.returns.type,
        bindings.getMethodRelatedNode(meth)?.type,
      );
    }
    for (const param of meth.parameters ?? []) {
      _collectTypeReferences(
        param.type,
        bindings.getParameterRelatedNode(param)?.type,
      );
    }
  }
  return typeReferences;

  function _collectTypeReferences(
    type: spec.TypeReference,
    node: ts.Node | undefined,
  ): void {
    if (spec.isNamedTypeReference(type)) {
      typeReferences.push({ ...type, node });
    } else if (spec.isCollectionTypeReference(type)) {
      _collectTypeReferences(type.collection.elementtype, node);
    } else if (spec.isUnionTypeReference(type)) {
      type.union.types.forEach((type) => _collectTypeReferences(type, node));
    }
  }
}

function _dereference(
  typeRef: string | spec.NamedTypeReference,
  assembly: spec.Assembly,
  validator: Validator,
): spec.Type | undefined {
  if (typeof typeRef !== 'string') {
    typeRef = typeRef.fqn;
  }
  const [assm] = typeRef.split('.');
  if (assembly.name === assm) {
    return assembly.types?.[typeRef];
  }
  const foreignAssm = validator.projectInfo.dependencyClosure.find(
    (dep) => dep.name === assm,
  );
  return foreignAssm?.types?.[typeRef];
}

function _isEmpty(array: undefined | any[]): array is undefined {
  return array == null || array.length === 0;
}

/**
 * Return whether an identifier only consists of upperchase characters, digits and underscores
 *
 * We have our own check here (isConstantCase) which is more lenient than what
 * `case.constant()` prescribes. We also want to allow combinations of letters
 * and digits without underscores: `C5A`, which `case` would force to `C5_A`.
 * The hint we print will still use `case.constant()` but that is fine.
 */
function isConstantCase(x: string) {
  return !/[^A-Z0-9_]/.exec(x);
}

/**
 * Obtains the name of the given declaration, if it has one, or returns the declaration itself.
 * This function is meant to be used as a convenience to obtain the `ts.Node` to bind a
 * `JsiiDianostic` instance on.
 *
 * It may return `undefined` but is typed as `ts.Node` so that it is easier to use with
 * `JsiiDiagnostic` factories.
 *
 * @param decl the declaration which name is needed.
 *
 * @returns the name of the declaration if it has one, or the declaration itself. Might return
 *          `undefined` if the provided declaration is undefined.
 */
function declarationName(
  decl: ts.Declaration | ts.Expression | undefined,
): ts.Node {
  if (decl == null) {
    // Pretend we returned a node - this is used to create diagnostics, worst case it'll be unbound.
    return decl as any;
  }
  return ts.getNameOfDeclaration(decl) ?? decl;
}
