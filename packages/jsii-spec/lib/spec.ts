export const SPEC_FILE_NAME = '.jsii';

/**
 * A JSII assembly specification.
 */
export interface Assembly extends Documentable {
    /**
     * The version of the spec schema
     */
    schema: SchemaVersion.LATEST;

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
     * The version of the jsii compiler that was used to produce this Assembly.
     * @minLength 1
     */
    jsiiVersion: string;

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
    readme?: { markdown: string };
}

/**
 * Versions of the JSII Assembly Specification.
 */
export enum SchemaVersion {
    LATEST = 'jsii/0.9.0'
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

    /**
     * Indicates if this dependency is a direct (peer) dependency or a
     * transitive dependency.
     *
     * Peer dependencies are expected to be explicitly defined by the user of
     * this library instead of brought in as transitive dependencies.
     *
     * jsii enforces that any direct dependency on another jsii module is also
     * defined as a peerDependency. Otherwise, it would be impossible to safely
     * use two versions of this dependency in a closure.
     *
     * @see https://github.com/awslabs/aws-cdk/issues/979
     * @see https://github.com/awslabs/jsii/issues/361
     * @see https://nodejs.org/en/blog/npm/peer-dependencies/
     */
    peer?: boolean;
}

/**
 * Key value pairs of documentation nodes.
 * Based on TSDoc.
 */
export interface Docs {
    /**
     * Summary documentation for an API item.
     *
     * The first part of the documentation before hitting a `@remarks` tags, or the first
     * line of the doc comment block if there is no `@remarks` tag.
     */
    summary?: string;

    /**
     * Detailed information about an API item.
     *
     * Either the explicitly tagged `@remarks` section, otherwise everything past the
     * first paragraph if there is no `@remarks` tag.
     */
    remarks?: string;

    /**
     * If present, this block indicates that an API item is no longer supported and may be
     * removed in a future release.  The `@deprecated` tag must be followed by a sentence
     * describing the recommended alternative.  Deprecation recursively applies to members
     * of a container.  For example, if a class is deprecated, then so are all of its members.
     */
    deprecated?: string;

    /**
     * The `@returns` block for this doc comment, or undefined if there is not one.
     */
    returns?: string;

    /**
     * Whether the API item is beta/experimental quality
     */
    stability?: Stability;

    /**
     * Example showing the usage of this API item
     *
     * Starts off in running text mode, may switch to code using fenced code
     * blocks.
     */
    example?: string;

    /**
     * A `@see` link with more information
     */
    see?: string;

    /**
     * Whether this class or interface was intended to be subclassed/implemented by library users.
     *
     * Classes intended for subclassing, and interfaces intended to be implemented
     * by consumers, are held to stricter standards of API compatibility.
     *
     * @default false
     */
    subclassable?: boolean;

    /**
     * Description of the default
     */
    default?: string;

    /**
     * Custom tags that are not any of the default ones
     */
    custom?: {[tag: string]: string};
}

export enum Stability {
    Experimental = 'experimental',
    Stable = 'stable',
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
 * Represents some instance of a type, for example as the return value of a method, a parameter, or a property.
 */
export interface TypeInstance<T extends TypeReference> {
    /**
     * The type of the instance that is denoted by this object.
     */
    type: T;

    /**
     * Whether this instance is optional (meaning it can be absent or null, ...) or not.
     *
     * @default false
     */
    optional?: boolean;

    /**
     * Whether this instance is a promise (meaning it may only become available at a later point) or immediate.
     *
     * @default false
     */
    promise?: boolean;
}

/**
 * A reference to a type (primitive, collection or fqn).
 */
export type TypeReference = NamedTypeReference | PrimitiveTypeReference | CollectionTypeReference | UnionTypeReference;

/**
 * Reference to a named type, defined by this assembly or one of it's dependencies.
 */
export interface NamedTypeReference {
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
export interface PrimitiveTypeReference {
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
export interface CollectionTypeReference {
    collection: {
        /**
         * The kind of collection.
         */
        kind: CollectionKind;

        /**
         * The type of an element (map keys are always strings).
         */
        elementtype: TypeInstance<TypeReference>;
    };
}
export function isCollectionTypeReference(ref: TypeReference | undefined): ref is CollectionTypeReference {
    return ref != null && !!(ref as CollectionTypeReference).collection;
}

/**
 * Reference to a union type.
 */
export interface UnionTypeReference {
    /**
     * Indicates that this is a union type, which means it can be one of a set of types.
     */
    union: {
        /**
         * All the possible types (including the primary type).
         * @minItems 2
         */
        types: Array<TypeInstance<TypeReference>>;
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
     * The specification for the property's value (including it's declared type and whether it is optional).
     */
    value: TypeInstance<TypeReference>;

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
     * The specification for the value of this parameter (includes it's declared type and whether it is optional).
     */
    value: TypeInstance<TypeReference>;

    /**
     * Whether this is the last parameter of a variadic method. In such cases,
     * the `#type` attribute is the type of each individual item of the variadic
     * arguments list (as opposed to some array type, as for example TypeScript
     * would model it)
     *
     * @default false
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
    returns?: TypeInstance<TypeReference>;

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
export type Type = TypeBase & (ClassType | EnumType | InterfaceType);

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
 * Return a string representation of the given type reference.
 */
export function describeTypeReference(type?: TypeReference): string {
    if (type === undefined) { return '(none)'; }

    if (isNamedTypeReference(type)) {
        return type.fqn;
    }

    if (isPrimitiveTypeReference(type)) {
        return type.primitive;
    }

    if (isCollectionTypeReference(type)) {
        return `${type.collection.kind}<${describeTypeInstance(type.collection.elementtype)}>`;
    }

    if (isUnionTypeReference(type)) {
        const unionType = type.union.types.map(describeTypeInstance).join(' | ');
        return unionType;
    }

    throw new Error('Unrecognized type reference');
}

/**
 * Returns a string representation of the given type instance.
 */
export function describeTypeInstance(instance?: TypeInstance<TypeReference>): string {
    const ref = instance && instance.type;
    let description = describeTypeReference(ref);
    if (instance && instance.optional) {
        description = `Optional<${description}>`;
    }
    if (instance && instance.promise) {
        description = `Promise<${description}>`;
    }
    return description;
}
