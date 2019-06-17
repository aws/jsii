import * as spec from 'jsii-spec';
import {DotNetDependency} from './filegenerator';
import {DotNetNameUtils} from "./nameutils";

/**
 * Represents the namespaces used by a class/interface
 * And the name of the types it derives/implements
 */
class Implementation  {
    public namespaces: string[];
    public typeNames: string[];

    constructor(typeNames: string[], namespaces: string[]) {
        this.namespaces = namespaces;
        this.typeNames = typeNames;
    }
}

type FindModuleCallback = (fqn: string) => spec.Assembly | spec.PackageVersion;
type FindTypeCallback = (fqn: string) => spec.Type;

export class DotNetTypeResolver {
    // The dependency tree for the current jsii input model.
    // This is later used to output the csproj
    public namespaceDependencies: Map<string, DotNetDependency> = new Map<string, DotNetDependency>();

    // jsii fqn : dotnet short type
    public registeredShortTypes: Map<string, string> = new Map<string, string>();

    private readonly findModule: FindModuleCallback;
    private readonly findType: FindTypeCallback;
    private readonly assembly: spec.Assembly;
    private nameutils: DotNetNameUtils = new DotNetNameUtils();

    constructor(assembly: spec.Assembly,
                findModule: FindModuleCallback,
                findType: FindTypeCallback) {
        this.assembly = assembly;
        this.findModule = findModule;
        this.findType = findType;
    }

    /**
     * Translates a type fqn to a native .NET full type
     */
    public toNativeFqn(fqn: string): string {
        const type = this.findType(fqn);
        let typeName: string = '';
        switch (type.kind) {
            case spec.TypeKind.Interface:
                typeName = this.nameutils.convertInterfaceName(type.name);
                break;
            case spec.TypeKind.Class:
                if (this.registeredShortTypes.has(type.fqn)) {
                    // Already a known type, might be slugified, retrieving it
                    typeName = this.registeredShortTypes.get(type.fqn) as string;
                } else {
                    typeName = this.nameutils.convertClassName(type as spec.ClassType);
                }
                break;
            case spec.TypeKind.Enum:
                typeName = this.nameutils.convertTypeName(type.name);
                break;
            default:
                throw new Error('Unknown type: ' + type);
        }
        const [mod] = fqn.split('.');
        const depMod = this.findModule(mod);
        const dotnetNamespace = depMod.targets && depMod.targets.dotnet && depMod.targets.dotnet.namespace;
        if (!dotnetNamespace) {
            throw new Error(`The module does not have a dotnet.namespace setting`);
        }
        if (type.namespace) {
            // If the type is declared in an additional namespace.
            return `${dotnetNamespace}.${type.namespace}.${typeName}`;
        } else {
            return `${dotnetNamespace}.${typeName}`;
        }

    }

    /**
     * Resolves the namespaces dependencies by looking at the .jsii model
     */
    public resolveNamespacesDependencies(): void {
        const assmDependencies = this.assembly.dependencies || {};
        for (const depName of Object.keys(assmDependencies)) {
            const depInfo = assmDependencies[depName];
            if (!this.namespaceDependencies.has(depName)) {
                const dotnetInfo = depInfo.targets!.dotnet;
                const namespace = dotnetInfo!.namespace;
                const packageId = dotnetInfo!.packageId;
                const version = depInfo.version;
                this.namespaceDependencies.set(depName, new DotNetDependency(namespace, packageId, depName, version));
            }
        }
    }

    /**
     * Loops through the implemented interfaces and saves the types and namespaces
     *
     * [0] The type names will be added to the class/ifc declaration
     * [1] The namespace names will be added to the using statement
     */
    public resolveImplementedInterfaces(ifc: spec.InterfaceType | spec.ClassType): Implementation {
        const interfaces = ifc.interfaces || [];
        const baseNamespaces: string[] = [];
        const baseTypeNames: string[] = [];

        // For all base members
        for (const base of interfaces) {
            // Retrieve the interface name from the fqn
            const lastIndexOfDot = base.lastIndexOf('.');
            const baseFqn = base.substr(0, lastIndexOfDot);
            const baseName = base.substr(lastIndexOfDot + 1);
            // Adding the base type
            baseTypeNames.push(this.nameutils.convertInterfaceName(baseName));
            if (baseFqn === this.assembly.name) {
                // If the base interface is in the current assembly
                // Nothing to do, we just added it to the list of implemented ifc
            } else {
                // We need to add a reference to the interface assembly in the using statement and the csproj.
                const namespaceName = this.namespaceDependencies.get(baseFqn)!.namespace;
                // Adding the namespaceName to the base namespaces for the using statement
                if (!baseNamespaces.includes(namespaceName)) {
                    baseNamespaces.push(namespaceName);
                }
            }
        }
        return new Implementation(baseTypeNames, baseNamespaces);
    }

    /**
     * Translates any jsii type to its corresponding .NET type
     */
    public toDotNetType(typeref: spec.TypeReference): string {
        if (spec.isPrimitiveTypeReference(typeref)) {
            return this.toDotNetPrimitive(typeref.primitive);
        } else if (spec.isCollectionTypeReference(typeref)) {
            return this.toDotNetCollection(typeref);
        } else if (spec.isNamedTypeReference(typeref)) {
            return this.toNativeFqn(typeref.fqn);
        } else if (typeref.union) {
            return "object";
        } else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
    }

    /**
     * Translates a primitive in jsii to a native .NET primitive
     */
    private toDotNetPrimitive(primitive: spec.PrimitiveType): string {
        switch (primitive) {
            case spec.PrimitiveType.Boolean:
                return 'bool';
            case spec.PrimitiveType.Date:
                return 'System.DateTime';
            case spec.PrimitiveType.Json:
                return 'Newtonsoft.Json.Linq.JObject';
            case spec.PrimitiveType.Number:
                return 'double';
            case spec.PrimitiveType.String:
                return 'string';
            case spec.PrimitiveType.Any:
                return 'object';
            default:
                throw new Error('Unknown primitive type: ' + primitive);
        }
    }

    /**
     * Translates a collection in jsii to a native .NET collection
     */
    private toDotNetCollection(ref: spec.CollectionTypeReference): string {
        const elementDotNetType = this.toDotNetType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            // TODO: add using statement to System.Collections.Generic
            // when impl calc-base and calc
            // TODO: see what to do with the IList forMarshalling
            case spec.CollectionKind.Array:
                return `${elementDotNetType}[]`;
            case spec.CollectionKind.Map:
                return `System.Collections.Generic.IDictionary<string, ${elementDotNetType}>`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }
}