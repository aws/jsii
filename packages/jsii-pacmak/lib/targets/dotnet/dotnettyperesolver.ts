import * as spec from '@jsii/spec';
import { toPascalCase } from 'codemaker';

import { DotNetDependency } from './filegenerator';
import { DotNetNameUtils } from './nameutils';

type FindModuleCallback = (fqn: string) => spec.AssemblyConfiguration;
type FindTypeCallback = (fqn: string) => spec.Type;

export class DotNetTypeResolver {
  // The dependency tree for the current jsii input model.
  // This is later used to output the csproj
  public namespaceDependencies: Map<string, DotNetDependency> = new Map<
    string,
    DotNetDependency
  >();

  private readonly findModule: FindModuleCallback;
  private readonly findType: FindTypeCallback;
  private readonly assembly: spec.Assembly;
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  public constructor(
    assembly: spec.Assembly,
    findModule: FindModuleCallback,
    findType: FindTypeCallback,
    private readonly assembliesCurrentlyBeingCompiled: string[],
  ) {
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
        throw new Error(`Unknown type: ${type as any}`);
    }
    const [mod] = fqn.split('.');
    const depMod = this.findModule(mod);

    const dotnetNamespace = depMod.targets?.dotnet?.namespace;
    if (!dotnetNamespace) {
      throw new Error(
        `The assembly ${mod} does not have a dotnet.namespace setting`,
      );
    }

    if (type.namespace) {
      // If the type is declared in an additional namespace.
      const namespaceFqn = `${this.assembly.name}.${type.namespace}`;
      const associatedNamespace = this.assembly.types?.[namespaceFqn];
      if (associatedNamespace) {
        // Checking if there is a C# type associated with this namespace, in case we need to slugify it
        const actualNamespace = this.toDotNetType(this.findType(namespaceFqn));
        return `${actualNamespace}.${typeName}`;
      }
      const ns = this.resolveNamespace(depMod, mod, type.namespace);
      return `${ns}.${typeName}`;
    }
    // When undefined, the type is located at the root of the assembly
    return `${dotnetNamespace}.${typeName}`;
  }

  /**
   * Resolves the namespaces dependencies by looking at the .jsii model
   */
  public resolveNamespacesDependencies(): void {
    const assmDependencies = this.assembly.dependencies ?? {};
    const assmConfigurations = this.assembly.dependencyClosure ?? {};
    for (const [depName, version] of Object.entries(assmDependencies)) {
      const depInfo = assmConfigurations[depName];
      if (!this.namespaceDependencies.has(depName)) {
        const dotnetInfo = depInfo.targets!.dotnet!;
        const namespace = dotnetInfo.namespace;
        const packageId = dotnetInfo.packageId;
        const suffix = depInfo.targets!.dotnet!.versionSuffix;

        this.namespaceDependencies.set(
          depName,
          new DotNetDependency(
            namespace,
            packageId,
            depName,
            // suffix, when present, is guaranteed to start with a leading `-`
            suffix ? `${version}${suffix}` : version,
            this.assembliesCurrentlyBeingCompiled.includes(depName),
          ),
        );
      }
    }
  }

  /**
   * Loops through the implemented interfaces and returns the fully qualified .NET types of the interfaces
   *
   */
  public resolveImplementedInterfaces(
    ifc: spec.InterfaceType | spec.ClassType,
  ): string[] {
    const interfaces = ifc.interfaces ?? [];
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
    } else if (spec.isUnionTypeReference(typeref)) {
      return 'object';
    }
    throw new Error(`Invalid type reference: ${JSON.stringify(typeref)}`);
  }

  /**
   * Translates any jsii type to the name of its corresponding .NET type (as a .NET string).
   */
  public toDotNetTypeName(typeref: spec.TypeReference): string {
    if (spec.isPrimitiveTypeReference(typeref)) {
      return this.toDotNetPrimitiveName(typeref.primitive);
    } else if (spec.isCollectionTypeReference(typeref)) {
      return this.toDotNetCollectionName(typeref);
    } else if (spec.isNamedTypeReference(typeref)) {
      return `typeof(${this.toNativeFqn(typeref.fqn)}).FullName`;
    } else if (spec.isUnionTypeReference(typeref)) {
      return '"object"';
    }
    throw new Error(`Invalid type reference: ${JSON.stringify(typeref)}`);
  }

  public resolveNamespace(
    assm: spec.AssemblyConfiguration,
    assmName: string,
    ns: string,
  ): string {
    let resolved = assm.targets?.dotnet?.namespace;
    if (!resolved) {
      throw new Error(
        `Assembly ${assmName} does not have targets.dotnet.namespace configured!`,
      );
    }
    const segments = ns.split('.');
    for (let i = 0; i < segments.length; i++) {
      const submoduleName = `${assmName}.${segments.slice(0, i + 1).join('.')}`;
      const submodule = assm.submodules?.[submoduleName];
      if (submodule) {
        // This is a submodule, either it has an explicit namespace or we do the name conversion here
        resolved =
          submodule.targets?.dotnet?.namespace ??
          `${resolved}.${toPascalCase(segments[i])}`;
      } else {
        // If it's not a submodule, it's a type and we need to convert the name the way we would convert names normally.
        resolved = `${resolved}.${new DotNetNameUtils().convertTypeName(segments[i])}`;
      }
    }
    return resolved;
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
        throw new Error(`Unknown primitive type: ${primitive as any}`);
    }
  }

  /**
   * Translates a primitive in jsii to the name of a native .NET primitive
   */
  private toDotNetPrimitiveName(primitive: spec.PrimitiveType): string {
    switch (primitive) {
      case spec.PrimitiveType.Boolean:
        return '"bool"';
      case spec.PrimitiveType.Date:
        return 'typeof(System.DateTime).FullName';
      case spec.PrimitiveType.Json:
        return 'typeof(Newtonsoft.Json.Linq.JObject).FullName';
      case spec.PrimitiveType.Number:
        return '"double"';
      case spec.PrimitiveType.String:
        return '"string"';
      case spec.PrimitiveType.Any:
        return '"object"';
      default:
        throw new Error(`Unknown primitive type: ${primitive as any}`);
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
        throw new Error(
          `Unsupported collection kind: ${ref.collection.kind as any}`,
        );
    }
  }

  /**
   * Translates a collection in jsii to the name of a native .NET collection
   */
  private toDotNetCollectionName(ref: spec.CollectionTypeReference): string {
    const [_, dollar, quote, content] = /^(?:(\$)?("))?([^"]+)"?$/.exec(
      this.toDotNetTypeName(ref.collection.elementtype),
    )!;

    const interpolates = dollar || !quote ? '$' : '';
    const elementTypeName = quote ? content : `{${content}}`;

    switch (ref.collection.kind) {
      case spec.CollectionKind.Array:
        return `${interpolates}"${elementTypeName}[]"`;
      case spec.CollectionKind.Map:
        return `${interpolates}"System.Collections.Generic.IDictionary<string, ${elementTypeName}>"`;
      default:
        throw new Error(
          `Unsupported collection kind: ${ref.collection.kind as any}`,
        );
    }
  }
}
