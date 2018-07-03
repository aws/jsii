export const SPEC_VERSION = 'jsii/1.0'; // minor version = no breaking change
export const SPEC_FILE_NAME = '.jsii';

/**
 * A module specification.
 */
export class Assembly implements Documentable {
    /**
     * The version of the spec schema
     */
    public schema = SPEC_VERSION;

    /**
     * The name of the module
     */
    public name: string;

    /**
     * The npm package name of this module
     */
    public package: string;

    /**
     * A map of module names in various languages.
     * This map is used when generating language-specific modules instead of the jsii$ module name.
     */
    public names: { [language: string]: string };

    /**
     * The version of the module
     */
    public version: string;

    /**
     * Dependencies on other modules (with semver)
     */
    public dependencies: { [module: string]: PackageVersion };

    /**
     * List if bundled dependencies (these are not expected to be jsii modules).
     */
    public bundled: { [module: string]: string };

    /**
     * All types in the module, keyed by their fully-qualified-name
     */
    public types: { [fqn: string]: Type };

    /**
     * All external types that are referenced from the visible
     * type signatures in this module (through ``types``). This
     * is provided so that consumers of an ``Assembly`` can reason
     * over the types that are used by this one without necessarily
     * having to load dependent assemblies.
     */
    public externalTypes?: { [fqn: string]: Type };

    /**
     * Number of types in the spec.
     */
    public typecount: number;

    /**
     * Namespace tree (see description on `NameTree`).
     */
    public nametree: NameTree;

    /**
     * Maps jsii module names to language-specific native names.
     * It is used by code generators and runtimes to translate jsii names to native names.
     * This map includes this module and all direct and indirect dependencies.
     *
     * For example:
     * {
     *   "jsii$mymodule$": {
     *     "java": "com.mymodule",
     *     "python": "mymodule",
     *     "ruby": "My::Module"
     *   }
     * }
     */
    public nativenames: {
        [jsii: string]: {
            [language: string]: string
        }
    };

    /**
     * Documentation
     */
    public docs = new Docs();

    public readme?: { markdown: string };

    /**
     * Assembly javascript code. Must be namespaced by assembly name.
     */
    public code?: string;
}

/**
 * The version of a package.
 */
export interface PackageVersion {
    /** Name of the package. */
    package: string;
    /** Version of the package. */
    version: string;
}

/**
 * Key value pairs of documentation nodes.
 * Based on JSDoc.
 */
export class Docs {
    [ key: string ]: string;
}

/**
 * Indicates that an entity is documentable.
 */
export interface Documentable {
    docs: Docs;
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
export class CollectionTypeReference {
    /**
     * The kind of collection.
     */
    public kind: CollectionKind;

    /**
     * The type of an element (map keys are always strings).
     */
    public elementtype: TypeReference;
}

/**
 * Represents a union type, which can be one of a list of types.
 */
export class UnionTypeReference {
    /**
     * All the possible types (including the primary type).
     */
    public types = new Array<TypeReference>();
}

/**
 * A reference to a type (primitive, collection or fqn).
 */
export class TypeReference {
    /**
     * If this is a reference to another type in the module, this will be
     * the fully-qualified-name of the type (can be located in spec.types[fqn]).
     * Mutually exclusive with `primitive` and `collection`.
     */
    public fqn?: string;

    /**
     * If this is a reference to a primitive type, this will include the
     * primitive type kind.
     * Mutually exclusive with `fqn` and `collection`.
     */
    public primitive?: PrimitiveType;

    /**
     * If this is a reference to a collection type, this will include the
     * collection reference.
     * Mutually exclusive with `fqn` and `primitive`.
     */
    public collection?: CollectionTypeReference;

    /**
     * Indicates that this is a union type, which means it can be one of a set of types.
     */
    public union?: UnionTypeReference;

    /**
     * Indicates if this value is optional.
     */
    public optional?: boolean;

    /**
     * Indicates if this type refers to a promise.
     */
    public promise?: boolean;
}

/**
 * A type reference for a user type (FQN).
 */
export class UserTypeReference extends TypeReference {
    /**
     * The fully-qualified-name of the type (can be located in spec.types[fqn]).
     */
    public fqn: string;
}

/**
 * A class property.
 */
export class Property implements Documentable {
    /**
     * The name of the property.
     */
    public name: string;

    /**
     * The type of the property.
     */
    public type: TypeReference;

    /**
     * Indicates if this property only has a getter (immutable).
     */
    public immutable?: boolean;

    /**
     * Indicates if this property is protected (otherwise it is public)
     */
    public protected?: boolean;

    /**
     * Indicates if this property is abstract
     */
    public abstract?: boolean;

    /**
     * Documentation.
     */
    public docs = new Docs();

    /**
     * Indicates if this is a static property.
     */
    public static?: boolean;

    /**
     * A hint that indicates that this static, immutable property is initialized
     * during startup. This allows emitting "const" idioms in different target languages.
     * Implies `static` and `immutable`.
     */
    public const?: boolean;
}

/**
 * Represents a method parameter.
 */
export class Parameter implements Documentable {

    /**
     * The name of the parameter.
     */
    public name: string;

    /**
     * The type of the parameter.
     */
    public type: TypeReference;

    /**
     * Documentation.
     */
    public docs = new Docs();

    /**
     * Whather this argument is the "rest" of a variadic signature.
     * The ``#type`` is that of every individual argument of the variadic list.
     */
    public variadic?: boolean;
}

/**
 * Represents a method.
 */
export class Method implements Documentable {

    /**
     * The name of the method. Undefined if this method is a initializer.
     */
    public name?: string;

    /**
     * The return type of the method (undefined if void or initializer)
     */
    public returns?: TypeReference;

    /**
     * The parameters of the method/initializer
     */
    public parameters ? = new Array<Parameter>();

    /**
     * True if this method is an initializer, in which case it won't have a return type
     */
    public initializer: boolean;

    /**
     * Indicates if this method is protected (otherwise it is public)
     */
    public protected: boolean;

    /**
     * Is this method an abstract method (this means the class will also be an abstract class)
     */
    public abstract: boolean;

    /**
     * Documentation.
     */
    public docs = new Docs();

    /**
     * Indicates whether this method is variadic or not. When ``true``, the last
     * element of ``#parameters`` will also be flagged ``#variadic``.
     */
    public variadic?: boolean;

    /**
     * Indicates if this is a static method.
     */
    public static?: boolean;
}

/**
 * Represents a type definition (not a type reference).
 */
export class Type implements Documentable {
    /**
     * The fully qualified name of the type (<module>.<namespace>.<name>)
     */
    public fqn: string;

    /**
     * The name of the module. Cannot be undefined.
     */
    public module: string;

    /**
     * The namespace of the type (foo.goo.doo).
     * It is possible that namespace will be undefined, in which case the type is at the root
     * of the module.
     */
    public namespace?: string;

    /**
     * The simple name of the type (MyClass).
     */
    public name: string;

    /**
     * The kind of the type.
     */
    public kind: TypeKind;

    /**
     * Documentation.
     */
    public docs = new Docs();

    /**
     * FQNs of all the subtypes of this type.
     */
    public subtypes ? = new Array<string>();

    /**
     * FQN of the parent type of this type (or undefined if this is not a subtype).
     */
    public parenttype?: string;
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
export class ClassType extends Type {
    public kind = TypeKind.Class;

    /**
     * Base class (optional).
     */
    public base?: UserTypeReference;

    /**
     * Initializer (constructor) method.
     */
    public initializer?: Method;

    /**
     * List of properties.
     */
    public properties ? = new Array<Property>();

    /**
     * List of methods.
     */
    public methods ? = new Array<Method>();

    /**
     * Indicates if this class is an abstract class.
     */
    public abstract: boolean;

    /**
     * The set of interfaces implemented by this class.
     */
    public interfaces ? = new Array<UserTypeReference>();
}

export class InterfaceType extends Type {
    public kind = TypeKind.Interface;

    /**
     * All the base interfaces that this interface extends.
     */
    public interfaces ? = new Array<UserTypeReference>();

    /**
     * List of methods.
     */
    public methods ? = new Array<Method>();

    /**
     * List of properties.
     */
    public properties ? = new Array<Property>();

    /**
     * True if this interface only contains properties. Different backends might
     * have idiomatic ways to allow defining concrete instances such interfaces.
     * For example, in Java, the generator will produce a PoJo and a builder
     * which will allow users to create a concrete object with data which
     * adheres to this interface.
     */
    public datatype?: boolean;
}

/**
 * Represents a member of an enum.
 */
export class EnumMember implements Documentable {
    /**
     * The name/symbol of the member.
     */
    public name: string;

    /**
     * Documentation.
     */
    public docs = new Docs();
}

/**
 * Represents an enum type.
 */
export class EnumType extends Type {
    public kind = TypeKind.Enum;

    /**
     * Members of the enum.
     */
    public members = new Array<EnumMember>();
}

/**
 * A tree of all names in the module. A node represent a type (terminal)
 * and may represent another node in the namespace (at the same time).
 * Therefore, a key of '_' represents a terminal and references the fqn
 * of the type.
 *
 * For example, say we have the following types:
 *   - aws.ec2.Host
 *   - aws.ec2.Instance
 *   - aws.ec2.Instance.Subtype
 *
 * the the name tree will look like this:
 *
 * nametree: {
 *   aws: {
 *     ec2: {
 *       Host: {
 *         _: 'aws.ec2.Host'
 *       },
 *       Instance: {
 *         _: 'aws.ec2.Host',
 *         Subtype: 'aws.ec2.Host.Subtype'
 *       }
 *     }
 *   }
 * }
 */
export class NameTree {

    [ key: string ]: any

    /**
     * Returns the FQN of a concerete type within this node or undefined.
     */
    public getType(): string | undefined {
        return this._;
    }

    /**
     * Returns 'true' if this node has child trees.
     */
    public hasChildren() {
        return this.children().length > 0;
    }

    /**
     * Returns all the child names of this tree (or an empty array).
     */
    public children(): string[] {
        return Object.keys(this).filter(n => n !== '_');
    }

    /**
     * Invoke an action for each child in the tree
     * @param action The function to invoke for each child
     */
    public forEachChild(action: (child: NameTree) => void) {
        this.children().map(n => this[n]).forEach(action);
    }

    /**
     * Inserts a name into the name tree
     * @param fullPath The full path of the name to add to the tree
     * @param rest The rest parts of the path left to insert (null indicates all of them)
     */
    public add(fullPath: string, rest?: string[]) {
        // this means we have the full path to add
        if (!rest) {
            rest = fullPath.split('.');
        }

        const curr = rest.shift();

        // this means we reached a terminal node
        if (!curr) {
            if (this._) {
                throw new Error(`${fullPath} is already in the tree`);
            }
            this._ = fullPath;
            return; // done!
        }

        if (!this[curr]) {
            this[curr] = new NameTree();
        }

        if (!(this[curr] instanceof NameTree)) {
            throw new Error('Sub trees must be NameTrees');
        }

        // add the rest
        (this[curr] as NameTree).add(fullPath, rest);
    }
}
