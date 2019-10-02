import * as spec from 'jsii-spec';
import { DotNetDependency } from './filegenerator';
import { DotNetNameUtils } from './nameutils';

type FindModuleCallback = (fqn: string) => spec.Assembly | spec.PackageVersion;
type FindTypeCallback = (fqn: string) => spec.Type;

export class DotNetTypeResolver {
  // The dependency tree for the current jsii input model.
  // This is later used to output the csproj
  public namespaceDependencies: Map<string, DotNetDependency> = new Map<string, DotNetDependency>();

  private readonly findModule: FindModuleCallback;
  private readonly findType: FindTypeCallback;
  private readonly assembly: spec.Assembly;
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  public constructor(assembly: spec.Assembly,
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
    let typeName = '';
    switch (type.kind) {
      case spec.TypeKind.Interface:
        typeName = this.nameutils.convertInterfaceName(type);
        break;
      case spec.TypeKind.Class:
        typeName = this.nameutils.convertClassName(type as spec.ClassType);
        break;
      case spec.TypeKind.Enum:
        typeName = this.nameutils.convertTypeName(type.name);
        break;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
    const [mod] = fqn.split('.');
    const depMod = this.findModule(mod);
    const dotnetNamespace = depMod.targets && depMod.targets.dotnet && depMod.targets.dotnet.namespace;
    if (!dotnetNamespace) {
      throw new Error('The module does not have a dotnet.namespace setting');
    }
    if (type.namespace) {
      // If the type is declared in an additional namespace.
      const namespaceFqn = `${this.assembly.name}.${type.namespace}`;
      const associatedNamespace = this.assembly.types && this.assembly.types[namespaceFqn];
      if (associatedNamespace) {
        // Checking if there is a C# type associated with this namespace, in case we need to slugify it
        const actualNamespace = this.toDotNetType(this.findType(namespaceFqn));
        return `${actualNamespace}.${typeName}`;
      }
      return `${dotnetNamespace}.${type.namespace}.${typeName}`;
    } 
    // When undefined, the type is located at the root of the assembly
    return `${dotnetNamespace}.${typeName}`;
    

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
        let version = depInfo.version;
        const suffix = depInfo.targets!.dotnet!.versionSuffix;
        if (suffix) {
          // suffix is guaranteed to start with a leading `-`
          version = `${depInfo.version}${suffix}`;
        }
        this.namespaceDependencies.set(depName, new DotNetDependency(namespace, packageId, depName, version));
      }
    }
  }

  /**
     * Loops through the implemented interfaces and returns the fully qualified .NET types of the interfaces
     *
     */
  public resolveImplementedInterfaces(ifc: spec.InterfaceType | spec.ClassType): string[] {
    const interfaces = ifc.interfaces || [];
    const baseTypeNames: string[] = [];

    // For all base members
    for (const base of interfaces) {
      const interfaceFullType = this.toNativeFqn(base);
      baseTypeNames.push(interfaceFullType);
    }
    return baseTypeNames;
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
      return 'object';
    } 
    throw new Error(`Invalid type reference: ${JSON.stringify(typeref)}`);
    
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
        throw new Error(`Unknown primitive type: ${primitive}`);
    }
  }

  /**
     * Translates a collection in jsii to a native .NET collection
     */
  private toDotNetCollection(ref: spec.CollectionTypeReference): string {
    const elementDotNetType = this.toDotNetType(ref.collection.elementtype);
    switch (ref.collection.kind) {
      case spec.CollectionKind.Array:
        return `${elementDotNetType}[]`;
      case spec.CollectionKind.Map:
        return `System.Collections.Generic.IDictionary<string, ${elementDotNetType}>`;
      default:
        throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
    }
  }
}
