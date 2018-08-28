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
         * The type of the repository (``git``, ``svn``, ...)
         */
        type: string;

        /**
         * The URL of the repository.
         */
        url: string;
    };

    /**
     * The main author of this package.
     */
    author: Person;

    /**
     * Additional contributors to this package.
     */
    contributors?: Person[];

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
 * Metadata about people or organizations associated with the project that
 * resulted in the Assembly. Some of this metadata is required in order to
 * publish to certain package repositories (for example, Maven Central), but is
 * not normalized, and the meaning of fields (role, for example), is up to each
 * project maintainer.
 */
export interface Person {
    /** The name of the person */
    name: string;

    /**
     * A list of roles this person has in the project, for example `maintainer`,
     * `contributor`, `owner`, ...
     */
    roles: string[];

    /** The email of the person */
    email?: string;

    /** The URL for the person */
    url?: string;

    /** If true, this person is, in fact, an organization */
    organization?: boolean;
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
     * Value with "any" or "unknown" type (aka Object)
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
export function isNamedTypeReference(ref: TypeReference | undefined): ref is NamedTypeReference {
    return ref != null && !!(ref as NamedTypeReference).fqn;
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
export function isPrimitiveTypeReference(ref: TypeReference | undefined): ref is PrimitiveTypeReference {
    return ref != null && !!(ref as PrimitiveTypeReference).primitive;
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
export function isCollectionTypeReference(ref: TypeReference | undefined): ref is CollectionTypeReference {
    return ref != null && !!(ref as CollectionTypeReference).collection;
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
export function isUnionTypeReference(ref: TypeReference | undefined): ref is UnionTypeReference {
    return ref != null && !!(ref as UnionTypeReference).union;
}

/**
 * Methods and properties can be overridden from parent classes or implemented from interfaces.
 */
export interface Overridable {
    /**
     * The name of the parent type (class or interface) that this entity overrides or implements. If undefined, then
     * this entity is the first in it's hierarchy to declare this entity.
     *
     * @default undefined
     */
    overrides?: NamedTypeReference;
}

/**
 * A class property.
 */
export interface Property extends Documentable, Overridable {
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
export interface Method extends Documentable, Overridable {

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
     * The fully qualified name of the type (``<assembly>.<namespace>.<name>``)
     * @minLength 3
     */
    fqn: string;

    /**
     * The name of the assembly the type belongs to.
     * @minLength 1
     */
    assembly: string;

    /**
     * The namespace of the type (``foo.bar.baz``). When undefined, the type is located at the root of the assembly
     * (it's ``fqn`` would be like ``<assembly>.<name>``). If the `namespace` corresponds to an existing type's
     * namespace-qualified (e.g: ``<namespace>.<name>``), then the current type is a nested type.
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

export function isClassType(type: Type | undefined): type is ClassType {
    return type != null && type.kind === TypeKind.Class;
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

export function isInterfaceType(type: Type | undefined): type is InterfaceType {
    return type != null && type.kind === TypeKind.Interface;
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

export function isEnumType(type: Type | undefined): type is EnumType {
    return type != null && type.kind === TypeKind.Enum;
}

/**
 * Return whether this type is a class or interface type
 */
export function isClassOrInterfaceType(type: Type | undefined): type is (InterfaceType | ClassType) {
    return isClassType(type) || isInterfaceType(type);
}

/**
 * Return a string representation of the given type reference
 */
export function describeTypeReference(a?: TypeReference): string {
    if (a === undefined) { return '(none)'; }

    const optionalMarker = a.optional ? '?' : '';

    if (isNamedTypeReference(a)) {
        return `${a.fqn}${optionalMarker}`;
    }

    if (isPrimitiveTypeReference(a)) {
        return `${a.primitive}${optionalMarker}`;
    }

    if (isCollectionTypeReference(a)) {
        return `${a.collection.kind}<${describeTypeReference(a.collection.elementtype)}>${optionalMarker}`;
    }
    if (isUnionTypeReference(a)) {
        const unionType = a.union.types.map(describeTypeReference).join(' | ');
        if (a.optional) {
            return `(${unionType})${optionalMarker}`;
        } else {
            return unionType;
        }
    }

    throw new Error('Unrecognized type reference');
}
