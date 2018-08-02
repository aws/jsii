export const SPEC_FILE_NAME = '.jsii';

/**
 * A JSII assembly specification.
 */
export interface Assembly extends Documentable {
    /**
     * The version of the spec schema
     */
    schema: SchemaVersion.V1_0;

    /**
     * The name of the assembly
     * @minLength 1
     */
    name: string;

    /**
     * Description of the assembly, maps to "description" from package.json
     * This is required since some package managers (like Maven) require it.
     */
    description: string;

    /**
     * The url to the project homepage. Maps to "homepage" from package.json.
     */
    homepage: string;

    /**
     * The module repository, maps to "repository" from package.json
     * This is required since some package managers (like Maven) require it.
     */
    repository: {
        /**
         * Type of repository.
         */
        type: string;

        /**
         * The URL of the repository.
         */
        url: string;
    };

    // TODO: add author!

    /**
     * A fingerprint that can be used to determine if the specification has changed.
     * @minLength 1
     */
    fingerprint: string;

    /**
     * The version of the assembly
     * @minLength 1
     */
    version: string;

    /**
     * The SPDX name of the license this assembly is distributed on.
     */
    license: string;

    /**
     * A map of target name to configuration, which is used when generating packages for
     * various languages.
     */
    targets?: AssemblyTargets;

    /**
     * Dependencies on other assemblies (with semver), the key is the JSII assembly name.
     */
    dependencies?: { [assembly: string]: PackageVersion };

    /**
     * List if bundled dependencies (these are not expected to be jsii assemblies).
     */
    bundled?: { [module: string]: string };

    /**
     * All types in the assembly, keyed by their fully-qualified-name
     */
    types?: { [fqn: string]: Type };

    /**
     * The top-level readme document for this assembly (if any).
     */
    readme?: { markdown: string };
}

/**
 * Versions of the JSII Assembly Specification.
 */
export enum SchemaVersion {
    V1_0 = 'jsii/1.0'
}

/**
 * Configurable targets for an asembly.
 */
export interface AssemblyTargets {
    /** Information about a particular language's targets */
    [language: string]: { [key: string]: any } | undefined;
}

/**
 * The version of a package.
 */
export interface PackageVersion {
    /**
     * Version of the package.
     * @minLength 1
     */
    version: string;

    /** Targets for a given assembly. */
    targets?: AssemblyTargets;

    /** Dependencies of this dependency */
    dependencies?: { [assembly: string]: PackageVersion };
}

/**
 * Key value pairs of documentation nodes.
 * Based on JSDoc.
 */
export interface Docs {
    [key: string]: string;
}

/**
 * Indicates that an entity is documentable.
 */
export interface Documentable {
    docs?: Docs;
}

/**
 * Kinds of collections.
 */
export enum CollectionKind {
    Array = 'array',
    Map = 'map',
}

/**
 * Kinds of primitive types.
 */
export enum PrimitiveType {
    Date = 'date',
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',

    /**
     * A JSON object
     */
    Json = 'json',

    /**
     * Any value or object (i.e. Object)
     */
    Any = 'any'
}

/**
 * A reference to a type (primitive, collection or fqn).
 */
export type TypeReference = TypeReferenceBase & (NamedTypeReference | PrimitiveTypeReference | CollectionTypeReference | UnionTypeReference);

/**
 * Common attributes of a TypeReference.
 */
export interface TypeReferenceBase {
    /**
     * Indicates if this value is optional.
     */
    optional?: boolean;

    /**
     * Indicates if this type refers to a promise.
     */
    promise?: boolean;
}

/**
 * Reference to a named type, defined by this assembly or one of it's dependencies.
 */
export interface NamedTypeReference extends TypeReferenceBase {
    /**
     * The fully-qualified-name of the type (can be located in the
     * ``spec.types[fqn]``` of the assembly that defines the type).
     */
    fqn: string;
}
export function isNamedTypeReference(ref: TypeReference): ref is NamedTypeReference {
    return !!(ref as NamedTypeReference).fqn;
}

/**
 * Reference to a primitive type.
 */
export interface PrimitiveTypeReference extends TypeReferenceBase {
    /**
     * If this is a reference to a primitive type, this will include the
     * primitive type kind.
     */
    primitive: PrimitiveType;
}
export function isPrimitiveTypeReference(ref: TypeReference): ref is PrimitiveTypeReference {
    return !!(ref as PrimitiveTypeReference).primitive;
}

/**
 * Reference to a collection type.
 */
export interface CollectionTypeReference extends TypeReferenceBase {
    collection: {
        /**
         * The kind of collection.
         */
        kind: CollectionKind;

        /**
         * The type of an element (map keys are always strings).
         */
        elementtype: TypeReference;
    };
}
export function isCollectionTypeReference(ref: TypeReference): ref is CollectionTypeReference {
    return !!(ref as CollectionTypeReference).collection;
}

/**
 * Reference to a union type.
 */
export interface UnionTypeReference extends TypeReferenceBase {
    /**
     * Indicates that this is a union type, which means it can be one of a set of types.
     */
    union: {
        /**
         * All the possible types (including the primary type).
         * @minItems 2
         */
        types: TypeReference[];
    }
}
export function isUnionTypeReference(ref: TypeReference): ref is UnionTypeReference {
    return !!(ref as UnionTypeReference).union;
}

/**
 * A class property.
 */
export interface Property extends Documentable {
    /**
     * The name of the property.
     * @minLength 1
     */
    name: string;

    /**
     * The type of the property.
     */
    type: TypeReference;

    /**
     * Indicates if this property only has a getter (immutable).
     */
    immutable?: boolean;

    /**
     * Indicates if this property is protected (otherwise it is public)
     */
    protected?: boolean;

    /**
     * Indicates if this property is abstract
     */
    abstract?: boolean;

    /**
     * Indicates if this is a static property.
     */
    static?: boolean;

    /**
     * A hint that indicates that this static, immutable property is initialized
     * during startup. This allows emitting "const" idioms in different target languages.
     * Implies `static` and `immutable`.
     */
    const?: boolean;
}

/**
 * Represents a method parameter.
 */
export interface Parameter extends Documentable {

    /**
     * The name of the parameter.
     * @minLength 1
     */
    name: string;

    /**
     * The type of the parameter.
     */
    type: TypeReference;

    /**
     * Whather this argument is the "rest" of a variadic signature.
     * The ``#type`` is that of every individual argument of the variadic list.
     */
    variadic?: boolean;
}

/**
 * Represents a method.
 */
export interface Method extends Documentable {

    /**
     * The name of the method. Undefined if this method is a initializer.
     */
    name?: string;

    /**
     * The return type of the method (undefined if void or initializer)
     */
    returns?: TypeReference;

    /**
     * The parameters of the method/initializer
     */
    parameters?: Parameter[];

    /**
     * True if this method is an initializer, in which case it won't have a return type
     */
    initializer?: boolean;

    /**
     * Indicates if this method is protected (otherwise it is public)
     */
    protected?: boolean;

    /**
     * Is this method an abstract method (this means the class will also be an abstract class)
     */
    abstract?: boolean;

    /**
     * Indicates whether this method is variadic or not. When ``true``, the last
     * element of ``#parameters`` will also be flagged ``#variadic``.
     */
    variadic?: boolean;

    /**
     * Indicates if this is a static method.
     */
    static?: boolean;
}

/**
 * Represents a type definition (not a type reference).
 */
export type Type = TypeBase & (ClassType | EnumType | InterfaceType);

/**
 * Common attributes of a type definition.
 */
export interface TypeBase extends Documentable {
    /**
     * The fully qualified name of the type (<assembly>.<namespace>.<name>)
     * @minLength 1
     */
    fqn: string;

    /**
     * The name of the assembly. Cannot be undefined.
     * @minLength 1
     */
    assembly: string;

    /**
     * The namespace of the type (foo.goo.doo).
     * It is possible that namespace will be undefined, in which case the type is at the root
     * of the assembly.
     */
    namespace?: string;

    /**
     * The simple name of the type (MyClass).
     * @minLength 1
     */
    name: string;

    /**
     * The kind of the type.
     */
    kind: TypeKind;

    /**
     * FQNs of all the subtypes of this type.
     */
    subtypes?: string[];

    /**
     * FQN of the parent type of this type (or undefined if this is not a subtype).
     */
    parenttype?: string;
}

/**
 * Kinds of types.
 */
export enum TypeKind {
    Class = 'class',
    Enum = 'enum',
    Interface = 'interface'
}

/**
 * Represents classes.
 */
export interface ClassType extends TypeBase {
    kind: TypeKind.Class;

    /**
     * Base class (optional).
     */
    base?: NamedTypeReference;

    /**
     * Initializer (constructor) method.
     */
    initializer?: Method;

    /**
     * List of properties.
     */
    properties?: Property[];

    /**
     * List of methods.
     */
    methods?: Method[];

    /**
     * Indicates if this class is an abstract class.
     */
    abstract?: boolean;

    /**
     * The set of interfaces implemented by this class.
     */
    interfaces?: NamedTypeReference[];
}

export function isClassType(type: Type): type is ClassType {
    return type.kind === TypeKind.Class;
}

export interface InterfaceType extends TypeBase {
    kind: TypeKind.Interface;

    /**
     * All the base interfaces that this interface extends.
     */
    interfaces?: NamedTypeReference[];

    /**
     * List of methods.
     */
    methods?: Method[];

    /**
     * List of properties.
     */
    properties?: Property[];

    /**
     * True if this interface only contains properties. Different backends might
     * have idiomatic ways to allow defining concrete instances such interfaces.
     * For example, in Java, the generator will produce a PoJo and a builder
     * which will allow users to create a concrete object with data which
     * adheres to this interface.
     */
    datatype?: boolean;
}

export function isInterfaceType(type: Type): type is InterfaceType {
    return type.kind === TypeKind.Interface;
}

/**
 * Represents a member of an enum.
 */
export interface EnumMember extends Documentable {
    /**
     * The name/symbol of the member.
     */
    name: string;
}

/**
 * Represents an enum type.
 */
export interface EnumType extends TypeBase {
    kind: TypeKind.Enum;

    /**
     * Members of the enum.
     */
    members: EnumMember[];
}

export function isEnumType(type: Type): type is EnumType {
    return type.kind === TypeKind.Enum;
}
