export const SPEC_FILE_NAME = '.jsii';

/**
 * A module specification.
 */
export interface Assembly extends Documentable {
    /**
     * The version of the spec schema
     */
    schema: SchemaVersion.V1_0;

    /**
     * The name of the module
     */
    name: string;

    /**
     * A fingerprint that can be used to determine if the specification has changed.
     */
    fingerprint: string;

    /**
     * The version of the module
     */
    version: string;

    /**
     * A map of target name to configuration, which is used when generating packages for
     * various languages.
     */
    targets: AssemblyTargets;

    /**
     * Dependencies on other modules (with semver), the key is the JSII assembly name.
     */
    dependencies?: { [module: string]: PackageVersion };

    /**
     * List if bundled dependencies (these are not expected to be jsii modules).
     */
    bundled?: { [module: string]: string };

    /**
     * All types in the module, keyed by their fully-qualified-name
     */
    types: { [fqn: string]: Type };

    /**
     * All external types that are referenced from the visible
     * type signatures in this module (through ``types``). This
     * is provided so that consumers of an ``Assembly`` can reason
     * over the types that are used by this one without necessarily
     * having to load dependent assemblies.
     */
    externals?: { [fqn: string]: Type };

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
    /** Version of the package. */
    version: string;
    /** Targets for a given assembly. */
    targets: AssemblyTargets;

    /** Dependencies of this dependency */
    dependencies?: { [module: string]: PackageVersion };
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
 * A reference to a collection type.
 */
export interface CollectionTypeReference {
    /**
     * The kind of collection.
     */
    kind: CollectionKind;

    /**
     * The type of an element (map keys are always strings).
     */
    elementtype: TypeReference;
}

/**
 * Represents a union type, which can be one of a list of types.
 */
export interface UnionTypeReference {
    /**
     * All the possible types (including the primary type).
     */
    types: TypeReference[];
}

/**
 * A reference to a type (primitive, collection or fqn).
 */
export interface TypeReference {
    /**
     * If this is a reference to another type in the module, this will be
     * the fully-qualified-name of the type (can be located in spec.types[fqn]).
     * Mutually exclusive with `primitive` and `collection`.
     */
    fqn?: string;

    /**
     * If this is a reference to a primitive type, this will include the
     * primitive type kind.
     * Mutually exclusive with `fqn` and `collection`.
     */
    primitive?: PrimitiveType;

    /**
     * If this is a reference to a collection type, this will include the
     * collection reference.
     * Mutually exclusive with `fqn` and `primitive`.
     */
    collection?: CollectionTypeReference;

    /**
     * Indicates that this is a union type, which means it can be one of a set of types.
     */
    union?: UnionTypeReference;

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
 * A type reference for a user type (FQN).
 */
export interface UserTypeReference extends TypeReference {
    /**
     * The fully-qualified-name of the type (can be located in spec.types[fqn]).
     */
    fqn: string;
}

/**
 * A class property.
 */
export interface Property extends Documentable {
    /**
     * The name of the property.
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
     * Documentation.
     */
    docs: Docs;

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
     */
    name: string;

    /**
     * The type of the parameter.
     */
    type: TypeReference;

    /**
     * Documentation.
     */
    docs: Docs;

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
     * Documentation.
     */
    docs: Docs;

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
export interface Type extends Documentable {
    /**
     * The fully qualified name of the type (<module>.<namespace>.<name>)
     */
    fqn: string;

    /**
     * The name of the module. Cannot be undefined.
     */
    module: string;

    /**
     * The namespace of the type (foo.goo.doo).
     * It is possible that namespace will be undefined, in which case the type is at the root
     * of the module.
     */
    namespace?: string;

    /**
     * The simple name of the type (MyClass).
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
export interface ClassType extends Type {
    kind: TypeKind.Class;

    /**
     * Base class (optional).
     */
    base?: UserTypeReference;

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
    interfaces?: UserTypeReference[];
}

export function isClassType(type: Type): type is ClassType {
    return type.kind === TypeKind.Class;
}

export interface InterfaceType extends Type {
    kind: TypeKind.Interface;

    /**
     * All the base interfaces that this interface extends.
     */
    interfaces?: UserTypeReference[];

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
export interface EnumType extends Type {
    kind: TypeKind.Enum;

    /**
     * Members of the enum.
     */
    members: EnumMember[];
}

export function isEnumType(type: Type): type is EnumType {
    return type.kind === TypeKind.Enum;
}
