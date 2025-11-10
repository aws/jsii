import { Stability } from '@jsii/spec';
import * as reflect from 'jsii-reflect';
import * as log4js from 'log4js';

import { validateStabilities } from './stability';
import { TypeAnalysis, Analysis } from './type-analysis';
import {
  describeInterfaceType,
  describeType,
  ComparisonOptions,
  Mismatches,
  apiElementIdentifier,
  IReport,
} from './types';
import { RecursionBreaker } from './util';
import {
  validateBaseTypeAssignability,
  validateNotMadeAbstract,
  validateSubclassableNotRemoved,
  validateNoNewAbstractMembers,
  subclassableType,
  validateMethodCompatible,
  memberPairs,
  validateStaticSame,
  validateAsyncSame,
  validateReturnTypeNotWeakened,
  validateNotMadeNonVariadic,
  validateReturnTypeSame,
  validateExistingParams,
  validateNoNewRequiredParams,
  validateParameterTypeWeakened,
  validateParameterTypeSame,
  validateNotMadeImmutable,
  validatePropertyTypeNotWeakened,
  validatePropertyTypeSame,
  validateExistingMembers,
} from './validations';

const LOG = log4js.getLogger('jsii-diff');

/**
 * Root object for comparing two assemblies
 *
 * Tracks mismatches and used as a lookup table to convert FQNs -> ComparableType objects
 */
export class AssemblyComparison {
  public readonly mismatches: Mismatches;
  private readonly types = new Map<string, ComparableType<any>>();

  public constructor(public readonly options: ComparisonOptions) {
    this.mismatches = new Mismatches({
      defaultStability: options.defaultExperimental
        ? Stability.Experimental
        : Stability.Stable,
    });
  }

  /**
   * Load the types from two assemblies to compare
   *
   * Adds appropriate ComparableType<> instances.
   */
  public load(original: reflect.Assembly, updated: reflect.Assembly) {
    /* eslint-disable prettier/prettier */
    for (const [origClass, updatedClass] of this.typePairs(original.allClasses, updated)) {
      const { fqn, displayFqn } = this.resolveFqn(origClass);
      this.types.set(fqn, new ComparableClassType(this, origClass, updatedClass, displayFqn));
    }

    for (const [origIface, updatedIface] of this.typePairs(original.allInterfaces, updated)) {
      if (origIface.datatype !== updatedIface.datatype) {
        this.mismatches.report({
          ruleKey: 'iface-type',
          violator: origIface,
          message: `used to be a ${describeInterfaceType(
            origIface.datatype,
          )}, is now a ${describeInterfaceType(updatedIface.datatype)}.`,
        });
        continue;
      }

      const { fqn, displayFqn } = this.resolveFqn(origIface);
      this.types.set(fqn, origIface.datatype
        ? new ComparableStructType(this, origIface, updatedIface, displayFqn)
        : new ComparableInterfaceType(this, origIface, updatedIface, displayFqn));
    }

    for (const [origEnum, updatedEnum] of this.typePairs(original.allEnums, updated)) {
      const { fqn, displayFqn } = this.resolveFqn(origEnum);
      this.types.set(fqn, new ComparableEnumType(this, origEnum, updatedEnum, displayFqn));
    }
    /* eslint-enable prettier/prettier */
  }

  /**
   * Perform the comparison for all loaded types
   */
  public compare() {
    LOG.debug(`Comparing ${this.comparableTypes.length} types`);
    this.comparableTypes.forEach((t) => t.markTypeRoles());
    this.comparableTypes.forEach((t) => t.compare());
  }

  /**
   * Based on a JSII TypeReference, return all reachable ComparableType<> objects.
   */
  public typesIn(ref: reflect.TypeReference): Array<ComparableType<any>> {
    const ret = new Array<ComparableType<any>>();

    for (const fqn of fqnsFrom(ref)) {
      const t = this.types.get(this.resolveFqn(fqn).fqn);
      if (t) {
        ret.push(t);
      }
    }
    return ret;
  }

  /**
   * Return the type's FQN, running it through the translation table if present.
   */
  private resolveFqn(x: string | reflect.Type): {
    fqn: string;
    displayFqn: string;
  } {
    const fqn = typeof x === 'string' ? x : x.fqn;
    const finalFqn = this.options.fqnRemapping?.[fqn] ?? fqn;
    if (fqn !== finalFqn) {
      return { fqn: finalFqn, displayFqn: `${fqn} -> ${finalFqn}` };
    }
    return { fqn, displayFqn: fqn };
  }

  /**
   * All ComparableType<>s
   */
  private get comparableTypes() {
    return Array.from(this.types.values());
  }

  /**
   * Find the matching type in the updated assembly based on all types in the original assembly
   */
  private *typePairs<T extends reflect.Type>(
    xs: readonly T[],
    updatedAssembly: reflect.Assembly,
  ): IterableIterator<[T, T]> {
    for (const origType of xs) {
      const { fqn, displayFqn } = this.resolveFqn(origType);
      LOG.trace(displayFqn);

      const updatedType = updatedAssembly.tryFindType(fqn);
      if (!updatedType) {
        this.mismatches.report({
          ruleKey: 'removed',
          violator: origType,
          message: 'has been removed',
        });
        continue;
      }

      if (describeType(origType) !== describeType(updatedType)) {
        this.mismatches.report({
          ruleKey: 'struct-change',
          violator: origType,
          message: `has been turned into a ${describeType(updatedType)}`,
        });
        continue;
      }

      yield [origType, updatedType as T]; // Trust me I know what I'm doing
    }
  }
}

/**
 * Base class for comparable types
 *
 * Manages notions of crawling types for other reference types, and whether
 * they occur in an input/output role, and marking as such on the comparison
 * object.
 */
export abstract class ComparableType<T> {
  private static readonly recursionBreaker = new RecursionBreaker();

  private readonly _inputTypeReasons = new Array<string>();
  private readonly _outputTypeReasons = new Array<string>();

  public constructor(
    protected readonly assemblyComparison: AssemblyComparison,
    protected readonly oldType: T,
    protected readonly newType: T,
    protected readonly displayFqn: string,
  ) {}

  public get fqnRemapping(): Record<string, string> {
    return this.assemblyComparison.options.fqnRemapping ?? {};
  }

  /**
   * Does this type occur in an input role?
   */
  public get inputType() {
    return this._inputTypeReasons.length > 0;
  }

  /**
   * Does this type occur in an output role?
   */
  public get outputType() {
    return this._outputTypeReasons.length > 0;
  }

  /**
   * Mark this type as occurring in an input rule.
   *
   * All types reachable from this type will be marked as input types as well.
   */
  public markAsInputType(...reasonFragments: string[]) {
    ComparableType.recursionBreaker.do(this, () => {
      this._inputTypeReasons.push(reasonFragments.join(', '));
      this.forEachRoleSharingType((type, reason) => {
        type.markAsInputType(reason, ...reasonFragments);
      });
    });
  }

  /**
   * Mark this type as occurring in an input rule.
   *
   * All types reachable from this type will be marked as input types as well.
   */
  public markAsOutputType(...reasonFragments: string[]) {
    ComparableType.recursionBreaker.do(this, () => {
      this._outputTypeReasons.push(reasonFragments.join(', '));
      this.forEachRoleSharingType((type, reason) => {
        type.markAsOutputType(reason, ...reasonFragments);
      });
    });
  }

  /**
   * Describe why this type is an input type (if it is)
   */
  public get inputTypeReason(): string {
    return describeReasons(this._inputTypeReasons);
  }

  /**
   * Describe why this type is an output type (if it is)
   */
  public get outputTypeReason(): string {
    return describeReasons(this._outputTypeReasons);
  }

  /**
   * Should be overriden in subclasses to mark reachable types as input/output types
   *
   * Should only be implemented by subclasses that contain callables.
   */
  public markTypeRoles() {
    // Empty on purpose
  }

  /**
   * Should be overridden in subclasses to perform the comparison
   *
   * Input/output marking will already have been performed before this is called.
   */
  public abstract compare(): void;

  /**
   * Alias for the root object Mismaches object
   */
  protected get mismatches() {
    return this.assemblyComparison.mismatches;
  }

  /**
   * Should be overriden in subclasses to execute the callback on reachable types
   *
   * Should be overriden only for product types (structs).
   */
  protected forEachRoleSharingType(
    cb: (t: ComparableType<any>, reason: string) => void,
  ) {
    Array.isArray(cb);
  }
}

/**
 * Base class for reference types
 *
 * Contains shared code that applies to both class and interface types.
 */
export abstract class ComparableReferenceType<
  T extends reflect.ReferenceType,
> extends ComparableType<T> {
  /**
   * Compare members of the reference types
   */
  public compare() {
    LOG.debug(`Reference type ${this.displayFqn}`);

    validateStabilities(this.oldType, this.newType, this.mismatches);
    validateBaseTypeAssignability(
      this.oldType,
      this.newType,
      this.fqnRemapping,
      this.mismatches,
    );

    validateSubclassableNotRemoved(this.oldType, this.newType, this.mismatches);
    if (this.subclassableType) {
      validateNoNewAbstractMembers(this.oldType, this.newType, this.mismatches);
    }

    this.validateMethods();
    this.validateProperties();
  }

  /**
   * Mark type accesses (input/output) of methods and properties
   */
  public markTypeRoles() {
    for (const method of this.oldType.ownMethods) {
      determineTypeRolesFromMethod(this.assemblyComparison, method);
    }
    for (const property of this.oldType.ownProperties) {
      determineTypeRolesFromProperty(this.assemblyComparison, property);
    }
  }

  /**
   * Validate type signatures on all methods
   */
  protected validateMethods() {
    for (const [orig, updated] of memberPairs(
      this.oldType,
      this.oldType.allMethods,
      this.newType,
      this.mismatches,
    )) {
      if (reflect.isMethod(updated)) {
        this.validateMethod(orig, updated);
      }
    }
  }

  /**
   * Validate type signature changes on the given method
   */
  protected validateMethod(original: reflect.Method, updated: reflect.Method) {
    validateStaticSame(original, updated, this.mismatches);
    validateAsyncSame(original, updated, this.mismatches);

    if (this.subclassableType) {
      validateReturnTypeSame(
        original,
        updated,
        this.mismatches.withMotivation('type is @subclassable'),
      );
    } else {
      validateReturnTypeNotWeakened(
        original,
        updated,
        this.fqnRemapping,
        this.mismatches,
      );
    }

    this.validateCallable(original, updated);
  }

  /**
   * Validate type signature changes on the given callable (method or initializer)
   */
  protected validateCallable<T extends reflect.Method | reflect.Initializer>(
    original: T,
    updated: T,
  ) {
    validateStabilities(original, updated, this.mismatches);
    validateNotMadeNonVariadic(original, updated, this.mismatches);

    // Check that every original parameter can still be mapped to a parameter in the updated method
    validateExistingParams(
      original,
      updated,
      this.mismatches,
      (oldParam, newParam) => {
        if (this.subclassableType) {
          validateParameterTypeSame(
            original,
            oldParam,
            newParam,
            this.mismatches.withMotivation('type is @subclassable'),
          );
        } else {
          validateParameterTypeWeakened(
            original,
            oldParam,
            newParam,
            this.fqnRemapping,
            this.mismatches,
          );
        }
      },
    );

    validateNoNewRequiredParams(original, updated, this.mismatches);
  }

  /**
   * Validate type signature changes on all properties
   */
  protected validateProperties() {
    for (const [orig, updated] of memberPairs(
      this.oldType,
      this.oldType.allProperties,
      this.newType,
      this.mismatches,
    )) {
      if (reflect.isProperty(updated)) {
        this.validateProperty(orig, updated);
      }
    }
  }

  /**
   * Validate type signature changes on the given property
   */
  protected validateProperty(
    original: reflect.Property,
    updated: reflect.Property,
  ) {
    validateStabilities(original, updated, this.mismatches);
    validateStaticSame(original, updated, this.mismatches);
    validateNotMadeImmutable(original, updated, this.mismatches);

    if (this.subclassableType) {
      // Hello C# my old friend
      validatePropertyTypeSame(
        original,
        updated,
        this.mismatches.withMotivation('type is @subclassable'),
      );
    } else if (!original.immutable) {
      // If the type can be read, it can't be weakened (can't change Dog to Animal, consumers might be counting on a Dog).
      // If the type can be written, it can't be strengthened (can't change Animal to Dog, consumers might be sending a Cat).
      // => it must remain the same
      validatePropertyTypeSame(
        original,
        updated,
        this.mismatches.withMotivation('mutable property cannot change type'),
      );
    } else {
      validatePropertyTypeNotWeakened(
        original,
        updated,
        this.fqnRemapping,
        this.mismatches,
      );
    }
  }

  /**
   * Whether the current reference type has been marked as subclassable
   */
  private get subclassableType() {
    return subclassableType(this.oldType);
  }
}

export class ComparableClassType extends ComparableReferenceType<reflect.ClassType> {
  /**
   * Perform the reference type comparison and include class-specific checks
   */
  public compare() {
    super.compare();

    validateNotMadeAbstract(this.oldType, this.newType, this.mismatches);

    // JSII assembler has already taken care of inheritance here
    if (this.oldType.initializer && this.newType.initializer) {
      validateMethodCompatible(
        this.oldType.initializer,
        this.newType.initializer,
        this.fqnRemapping,
        this.mismatches,
      );
    }
  }

  /**
   * Type role marking -- include the initializer
   */
  public markTypeRoles() {
    if (this.oldType.initializer) {
      determineTypeRolesFromMethod(
        this.assemblyComparison,
        this.oldType.initializer,
      );
    }
    super.markTypeRoles();
  }
}

/**
 * Interface type comparison
 *
 * (Actually just plain reference type comparison)
 */
export class ComparableInterfaceType extends ComparableReferenceType<reflect.InterfaceType> {}

/**
 * Struct type comparison
 *
 * Most notably: does no-strengthening/no-weakening checks based on whether
 * structs appear in input/output positions.
 */
export class ComparableStructType extends ComparableType<reflect.InterfaceType> {
  public compare() {
    LOG.debug(`Struct type ${this.displayFqn}`);

    validateStabilities(this.oldType, this.newType, this.mismatches);
    validateBaseTypeAssignability(
      this.oldType,
      this.newType,
      this.fqnRemapping,
      this.mismatches,
    );
    this.validateNoPropertiesRemoved();

    if (this.inputType) {
      // If the struct is written, it can't be strengthened (ex: can't change an optional property to required)
      this.validateNotStrengthened(
        this.mismatches.withMotivation(this.inputTypeReason),
      );
    }

    if (this.outputType) {
      // If the struct is read, it can't be weakened (ex: can't change a required property to optional)
      this.validateNotWeakened(
        this.mismatches.withMotivation(this.outputTypeReason),
      );
    }
  }

  /**
   * Every type of every property should have the same in/out classification as the outer type
   */
  protected forEachRoleSharingType(
    cb: (t: ComparableType<any>, reason: string) => void,
  ) {
    for (const prop of this.oldType.allProperties) {
      for (const t of this.assemblyComparison.typesIn(prop.type)) {
        cb(t, `type of property ${prop.name}`);
      }
    }
  }

  /**
   * Check that all properties are still present
   *
   * This is because for all non-structurally typed languages it is not allowed
   * to specify members which aren't actually present in the type.
   */
  private validateNoPropertiesRemoved() {
    // A single run of memberPairs() with nothing else will do this check.
    Array.from(
      memberPairs(
        this.oldType,
        this.oldType.allProperties,
        this.newType,
        this.mismatches,
      ),
    );
  }

  /**
   * Check that the current type is not weakened
   */
  private validateNotWeakened(mismatches: IReport) {
    const ana = this.isStructuralSuperType(this.oldType, this.newType);
    if (!ana.success) {
      mismatches.report({
        ruleKey: 'weakened',
        violator: this.oldType,
        message: ana.reasons.join(', '),
      });
    }
  }

  /**
   * Check that the current type is not strengthened
   */
  private validateNotStrengthened(mismatches: IReport) {
    const ana = this.isStructuralSuperType(this.newType, this.oldType);
    if (!ana.success) {
      mismatches.report({
        ruleKey: 'strengthened',
        violator: this.oldType,
        message: ana.reasons.join(', '),
      });
    }
  }

  private isStructuralSuperType(
    a: reflect.InterfaceType,
    b: reflect.InterfaceType,
  ): Analysis {
    try {
      return new TypeAnalysis(
        this.newType.system,
        this.fqnRemapping,
      ).isStructuralSuperType(a, b);
    } catch (e: any) {
      // We might get an exception if the type is supposed to come from a different
      // assembly and the lookup fails.
      return { success: false, reasons: [e.message] };
    }
  }
}

/**
 * Comparison for enums
 */
export class ComparableEnumType extends ComparableType<reflect.EnumType> {
  /**
   * Perform comparisons on enum members
   */
  public compare() {
    LOG.debug(`Enum type ${this.displayFqn}`);

    validateStabilities(this.oldType, this.newType, this.mismatches);

    validateExistingMembers(
      this.oldType,
      this.newType,
      this.mismatches,
      (oldMember, newMember) => {
        validateStabilities(oldMember, newMember, this.mismatches);
      },
    );
  }
}

/**
 * Determines input/output roles of types used in this method
 *
 * - Argument types are treated as IN types
 * - Return type is treated as OUT type
 */
function determineTypeRolesFromMethod(
  comparison: AssemblyComparison,
  method: reflect.Method | reflect.Initializer,
) {
  if (reflect.isMethod(method)) {
    for (const t of comparison.typesIn(method.returns.type)) {
      t.markAsOutputType(`returned from ${apiElementIdentifier(method)}`);
    }
  }

  for (const param of method.parameters ?? []) {
    for (const t of comparison.typesIn(param.type)) {
      t.markAsInputType(`input to ${apiElementIdentifier(method)}`);
    }
  }
}

/**
 * Determines input/output roles of types used in this property
 *
 * - Property type is treated as OUT type
 * - If mutable, property type is also treated as IN type
 *
 * In effect, a property is treated as the following methods:
 *
 * - property(): T;
 * - setProperty(: T);  <- only if mutable
 */
function determineTypeRolesFromProperty(
  comparison: AssemblyComparison,
  property: reflect.Property,
) {
  for (const t of comparison.typesIn(property.type)) {
    t.markAsOutputType(`type of ${apiElementIdentifier(property)}`);
  }
  if (!property.immutable) {
    for (const t of comparison.typesIn(property.type)) {
      t.markAsInputType(`type of mutable ${apiElementIdentifier(property)}`);
    }
  }
}

/**
 * Return all the FQNs from a type reference
 *
 * In the simple case, a simple FQN, but the type might
 * be a union or complex type as well.
 */
function fqnsFrom(ref: reflect.TypeReference) {
  const ret = new Array<string>();
  recurse(ref);
  return ret;

  function recurse(type: reflect.TypeReference) {
    if (type.mapOfType) {
      recurse(type.mapOfType);
    } else if (type.arrayOfType) {
      recurse(type.arrayOfType);
    } else if (type.unionOfTypes) {
      type.unionOfTypes.forEach(recurse);
    } else if (type.fqn) {
      ret.push(type.fqn);
    }
  }
}

function describeReasons(reasons: string[]) {
  if (reasons.length === 0) {
    return '';
  }
  if (reasons.length === 1) {
    return reasons[0];
  }
  return `${reasons[0]} (...and ${reasons.length - 1} more...)`;
}
