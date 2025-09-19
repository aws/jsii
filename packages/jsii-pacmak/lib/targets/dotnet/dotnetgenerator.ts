import * as spec from '@jsii/spec';
import * as clone from 'clone';
import * as fs from 'fs-extra';
import * as http from 'http';
import * as https from 'https';
import * as reflect from 'jsii-reflect';
import { RosettaTabletReader } from 'jsii-rosetta';
import * as path from 'path';

import { Generator, Legalese } from '../../generator';
import { debug } from '../../logging';
import { MethodDefinition, PropertyDefinition } from '../_utils';
import { DotNetDocGenerator } from './dotnetdocgenerator';
import { DotNetRuntimeGenerator } from './dotnetruntimegenerator';
import { DotNetTypeResolver } from './dotnettyperesolver';
import { FileGenerator } from './filegenerator';
import { DotNetNameUtils } from './nameutils';
import { ParameterValidator } from './runtime-type-checking';

/**
 * CODE GENERATOR V2
 */
export class DotNetGenerator extends Generator {
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  private readonly rosetta: RosettaTabletReader;

  // Flags that tracks if we have already wrote the first member of the class
  private firstMemberWritten = false;

  private typeresolver!: DotNetTypeResolver;

  private dotnetRuntimeGenerator!: DotNetRuntimeGenerator;

  private dotnetDocGenerator!: DotNetDocGenerator;

  public constructor(
    private readonly assembliesCurrentlyBeingCompiled: string[],
    options: {
      readonly rosetta: RosettaTabletReader;
      readonly runtimeTypeChecking: boolean;
    },
  ) {
    super(options);

    // Override the openBlock to get a correct C# looking code block with the curly brace after the line
    this.code.openBlock = function (text) {
      this.line(text);
      this.open('{');
    };

    this.rosetta = options.rosetta;
  }

  public async load(
    packageRoot: string,
    assembly: reflect.Assembly,
  ): Promise<void> {
    await super.load(packageRoot, assembly);
  }

  /**
   * Runs the generator (in-memory).
   */
  public generate(fingerprint: boolean) {
    this.typeresolver = new DotNetTypeResolver(
      this.assembly,
      (fqn: string) => this.findModule(fqn),
      (fqn: string) => this.findType(fqn),
      this.assembliesCurrentlyBeingCompiled,
    );

    this.dotnetRuntimeGenerator = new DotNetRuntimeGenerator(
      this.code,
      this.typeresolver,
    );
    this.dotnetDocGenerator = new DotNetDocGenerator(
      this.code,
      this.rosetta,
      this.assembly,
      this.typeresolver,
    );

    this.emitAssemblyDocs();

    // We need to resolve the dependency tree
    this.typeresolver.resolveNamespacesDependencies();
    super.generate(fingerprint);
  }

  public async save(
    outdir: string,
    tarball: string,
    { license, notice }: Legalese,
  ): Promise<string[]> {
    // Generating the csproj and AssemblyInfo.cs files
    const tarballFileName = path.basename(tarball);
    const filegen = new FileGenerator(
      this.assembly,
      tarballFileName,
      this.code,
    );
    filegen.generateAssemblyInfoFile();

    // Calling super.save() dumps the tarball in the format name@version.jsii.tgz.
    // This is not in sync with the Old .NET generator where the name is scope-name-version.tgz.
    // Hence we are saving the files ourselves here:
    const assm = this.assembly;
    const packageId: string = assm.targets!.dotnet!.packageId;
    if (!packageId) {
      throw new Error(
        `The module ${assm.name} does not have a dotnet.packageId setting`,
      );
    }
    await fs.mkdirp(path.join(outdir, packageId));
    await fs.copyFile(tarball, path.join(outdir, packageId, tarballFileName));

    // Attempt to download the package icon from the configured URL so we can use the non-deprecated PackageIcon
    // attribute. If this fails or is opted out (via $JSII_PACMAK_DOTNET_NO_DOWNLOAD_ICON being set), then only the
    // deprecated PackageIconUrl will be emitted.
    const iconFile =
      this.assembly.targets?.dotnet?.iconUrl != null &&
      !process.env.JSII_PACMAK_DOTNET_NO_DOWNLOAD_ICON
        ? await tryDownloadResource(
            this.assembly.targets.dotnet.iconUrl,
            path.join(outdir, packageId),
          ).catch((err: any) => {
            debug(
              `[dotnet] Unable to download package icon, will only use deprecated PackageIconUrl attribute: ${err.cause}`,
            );
            return Promise.resolve(undefined);
          })
        : undefined;
    filegen.generateProjectFile(
      this.typeresolver.namespaceDependencies,
      iconFile,
    );

    // Create an anchor file for the current model
    this.generateDependencyAnchorFile();

    if (license) {
      await fs.writeFile(path.join(outdir, packageId, 'LICENSE'), license, {
        encoding: 'utf8',
      });
    }
    if (notice) {
      await fs.writeFile(path.join(outdir, packageId, 'NOTICE'), notice, {
        encoding: 'utf8',
      });
    }

    // Saving the generated code.
    return this.code.save(outdir);
  }

  /**
   * Generates the anchor file
   */
  protected generateDependencyAnchorFile() {
    const namespace = `${
      this.assembly.targets!.dotnet!.namespace
    }.Internal.DependencyResolution`;
    this.openFileIfNeeded('Anchor', namespace, false, false);
    this.code.openBlock('public sealed class Anchor');
    this.code.openBlock('public Anchor()');
    this.typeresolver.namespaceDependencies.forEach((value) =>
      this.code.line(
        `new ${value.namespace}.Internal.DependencyResolution.Anchor();`,
      ),
    );
    this.code.closeBlock();
    this.code.closeBlock();
    this.closeFileIfNeeded('Anchor', namespace, false);
  }

  /**
   * Not used as we override the save() method
   */
  protected getAssemblyOutputDir(mod: spec.Assembly): string {
    return this.nameutils.convertPackageName(mod.name);
  }

  /**
   * Namespaces are handled implicitly by openFileIfNeeded().
   *
   * Do generate docs if this is for a submodule though.
   */
  protected onBeginNamespace(jsiiNs: string) {
    const submodule = this.assembly.submodules?.[jsiiNs];
    if (submodule) {
      const dotnetNs = this.typeresolver.resolveNamespace(
        this.assembly,
        this.assembly.name,
        // Strip the `${assmName}.` prefix here, as the "assembly-relative" NS
        // is expected by `this.typeResolver.resovleNamespace`.
        jsiiNs.slice(this.assembly.name.length + 1),
      );
      this.emitNamespaceDocs(dotnetNs, jsiiNs, submodule);
    }
  }

  protected onEndNamespace(_ns: string) {
    /* noop */
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {
    const implementations = this.typeresolver.resolveImplementedInterfaces(ifc);
    const interfaceName = this.nameutils.convertInterfaceName(ifc);
    const namespace = this.namespaceFor(this.assembly, ifc);
    this.openFileIfNeeded(interfaceName, namespace, this.isNested(ifc));

    this.dotnetDocGenerator.emitDocs(ifc, { api: 'type', fqn: ifc.fqn });
    this.dotnetRuntimeGenerator.emitAttributesForInterface(ifc);

    if (implementations.length > 0) {
      this.code.openBlock(
        `public interface ${interfaceName} : ${implementations.join(', ')}`,
      );
    } else {
      this.code.openBlock(`public interface ${interfaceName}`);
    }
    this.flagFirstMemberWritten(false);
  }

  protected onEndInterface(ifc: spec.InterfaceType) {
    // emit interface proxy class
    this.emitInterfaceProxy(ifc);

    const interfaceName = this.nameutils.convertInterfaceName(ifc);
    this.code.closeBlock();
    const namespace = this.namespaceFor(this.assembly, ifc);
    this.closeFileIfNeeded(interfaceName, namespace, this.isNested(ifc));

    // emit implementation class
    // TODO: If datatype then we may not need the interface proxy to be created, We could do with just the interface impl?
    if (ifc.datatype) {
      this.emitInterfaceDataType(ifc);
    }
  }

  protected onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method) {
    this.dotnetDocGenerator.emitDocs(method, {
      api: 'member',
      fqn: ifc.fqn,
      memberName: method.name,
    });
    this.dotnetRuntimeGenerator.emitAttributesForMethod(ifc, method);
    const returnType = method.returns
      ? this.typeresolver.toDotNetType(method.returns.type)
      : 'void';
    const nullable = method.returns?.optional ? '?' : '';

    const { parameters, whereClause, typeParameters } =
      this.typeresolver.renderGenericParameters(method.parameters);

    this.code.line(
      `${returnType}${nullable} ${this.nameutils.convertMethodName(
        method.name,
      )}${typeParameters}(${this.renderParametersString(parameters)})${whereClause};`,
    );
  }

  protected onInterfaceMethodOverload(
    ifc: spec.InterfaceType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.onInterfaceMethod(ifc, overload);
  }

  protected onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property) {
    if (!prop.abstract) {
      throw new Error(`Interface properties must be abstract: ${prop.name}`);
    }

    if (prop.protected) {
      throw new Error(
        `Protected properties are not allowed on interfaces: ${prop.name}`,
      );
    }

    if (prop.static) {
      throw new Error(
        `Property ${ifc.name}.${prop.name} is marked as static, but interfaces must not contain static members.`,
      );
    }

    this.emitNewLineIfNecessary();
    this.dotnetDocGenerator.emitDocs(prop, {
      api: 'member',
      fqn: ifc.fqn,
      memberName: prop.name,
    });
    this.dotnetRuntimeGenerator.emitAttributesForProperty(prop);

    // Unfortunately we can only render this as one type. We'll take the first one.
    let apparentType = prop.type;
    if (spec.isIntersectionTypeReference(apparentType)) {
      apparentType = apparentType.intersection.types[0];
    }

    const propType = this.typeresolver.toDotNetType(apparentType);
    const propName = this.nameutils.convertPropertyName(prop.name);

    if (prop.optional) {
      this.code.line('[Amazon.JSII.Runtime.Deputy.JsiiOptional]');
    }

    // Specifying that a type is nullable is only required for primitive value types
    const isOptional = prop.optional ? '?' : '';
    this.code.openBlock(`${propType}${isOptional} ${propName}`);

    if (prop.optional) {
      this.code.openBlock('get');
      this.code.line('return null;');
      this.code.closeBlock();
      if (!prop.immutable) {
        this.code.openBlock('set');
        this.code.line(
          `throw new System.NotSupportedException("'set' for '${propName}' is not implemented");`,
        );
        this.code.closeBlock();
      }
    } else {
      this.code.line('get;');
      if (!prop.immutable) {
        this.code.line('set;');
      }
    }

    this.code.closeBlock();
    this.flagFirstMemberWritten(true);
  }

  protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
    let baseTypeNames: string[] = [];
    const namespace = this.namespaceFor(this.assembly, cls);

    // A class can derive from only one base class
    // But can implement multiple interfaces
    if (!cls.base) {
      baseTypeNames.push('DeputyBase');
    } else {
      const classBase = this.typeresolver.toDotNetType({ fqn: cls.base });
      baseTypeNames.push(classBase);
    }

    if (cls.interfaces && cls.interfaces.length > 0) {
      const implementations =
        this.typeresolver.resolveImplementedInterfaces(cls);
      baseTypeNames = baseTypeNames.concat(implementations);
    }

    const className = this.nameutils.convertClassName(cls);

    // Nested classes will be dealt with during calc code generation
    const nested = this.isNested(cls);
    const absPrefix = abstract ? ' abstract' : '';

    this.openFileIfNeeded(className, namespace, nested);

    const implementsExpr = ` : ${baseTypeNames.join(', ')}`;

    this.dotnetDocGenerator.emitDocs(cls, {
      api: 'type',
      fqn: cls.fqn,
    });

    this.dotnetRuntimeGenerator.emitAttributesForClass(cls);

    this.code.openBlock(
      `public${absPrefix} class ${className}${implementsExpr}`,
    );

    // Compute the class parameters
    let parametersDefinition = '';
    let parametersBase = '';

    const initializer = cls.initializer;
    if (initializer) {
      this.dotnetDocGenerator.emitDocs(initializer, {
        api: 'initializer',
        fqn: cls.fqn,
      });
      this.dotnetRuntimeGenerator.emitDeprecatedAttributeIfNecessary(
        initializer,
      );
      if (initializer.parameters) {
        const { parameters, whereClause } =
          this.typeresolver.renderGenericParameters(initializer.parameters);

        if (whereClause) {
          throw new Error(
            'C# does not allow generic parameters to a constructor',
          );
        }

        parametersDefinition = this.renderParametersString(parameters);
        for (const p of initializer.parameters) {
          parametersBase += `${this.nameutils.convertParameterName(p.name)}`;
          // If this is not the last parameter, append ,
          if (
            initializer.parameters.indexOf(p) !==
            initializer.parameters.length - 1
          ) {
            parametersBase += ', ';
          }
        }
      }

      // Create the constructors:
      // Abstract classes have protected constructors.
      const visibility = cls.abstract ? 'protected' : 'public';

      this.code.openBlock(
        `${visibility} ${className}(${parametersDefinition}): base(_MakeDeputyProps(${parametersBase}))`,
      );
      this.code.closeBlock();
      this.code.line();

      // This private method is injected so we can validate arguments before deferring to the base constructor, where
      // the instance will be created in the kernel (where it'd fail on a sub-optimal error instead)...
      this.code.line(
        '[System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]',
      );
      this.code.openBlock(
        `private static DeputyProps _MakeDeputyProps(${parametersDefinition})`,
      );
      this.emitUnionParameterValdation(
        (this.reflectAssembly.findType(cls.fqn) as reflect.ClassType)
          .initializer?.parameters,
      );
      const args =
        parametersBase.length > 0
          ? `new object?[]{${parametersBase}}`
          : `System.Array.Empty<object?>()`;
      this.code.line(`return new DeputyProps(${args});`);
      this.code.closeBlock();
      this.code.line();
    }

    this.code.line(
      '/// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>',
    );
    this.code.line(
      '/// <param name="reference">The Javascript-owned object reference</param>',
    );
    this.dotnetRuntimeGenerator.emitDeprecatedAttributeIfNecessary(initializer);
    this.emitHideAttribute();
    this.code.openBlock(
      `protected ${className}(ByRefValue reference): base(reference)`,
    );
    this.code.closeBlock();
    this.code.line();

    this.code.line(
      '/// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>',
    );
    this.code.line('/// <param name="props">The deputy props</param>');
    this.dotnetRuntimeGenerator.emitDeprecatedAttributeIfNecessary(initializer);
    this.emitHideAttribute();
    this.code.openBlock(
      `protected ${className}(DeputyProps props): base(props)`,
    );
    this.code.closeBlock();

    // We have already outputted members (constructors), setting the flag to true
    this.flagFirstMemberWritten(true);
  }

  protected onEndClass(cls: spec.ClassType) {
    if (cls.abstract) {
      this.emitInterfaceProxy(cls);
    }

    this.code.closeBlock();
    const className = this.nameutils.convertClassName(cls);
    const namespace = this.namespaceFor(this.assembly, cls);
    this.closeFileIfNeeded(className, namespace, this.isNested(cls));
  }

  protected onField(
    _cls: spec.ClassType,
    _prop: spec.Property,
    _union?: spec.UnionTypeReference,
  ) {
    /* noop */
  }

  protected onMethod(cls: spec.ClassType, method: spec.Method) {
    this.emitMethod(cls, method, cls);
  }

  protected onMethodOverload(
    cls: spec.ClassType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.onMethod(cls, overload);
  }

  protected onProperty(cls: spec.ClassType, prop: spec.Property) {
    this.emitProperty(cls, prop, cls);
  }

  protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
    this.emitMethod(cls, method, cls);
  }

  protected onStaticMethodOverload(
    cls: spec.ClassType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.emitMethod(cls, overload, cls);
  }

  protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
    if (prop.const) {
      this.emitConstProperty(cls, prop);
    } else {
      this.emitProperty(cls, prop, cls);
    }
  }

  protected onUnionProperty(
    cls: spec.ClassType,
    prop: spec.Property,
    _union: spec.UnionTypeReference,
  ) {
    this.emitProperty(cls, prop, cls);
  }

  protected onBeginEnum(enm: spec.EnumType) {
    const enumName = this.nameutils.convertTypeName(enm.name);
    const namespace = this.namespaceFor(this.assembly, enm);
    this.openFileIfNeeded(enumName, namespace, this.isNested(enm));
    this.emitNewLineIfNecessary();
    this.dotnetDocGenerator.emitDocs(enm, {
      api: 'type',
      fqn: enm.fqn,
    });
    this.dotnetRuntimeGenerator.emitAttributesForEnum(enm, enumName);
    this.code.openBlock(`public enum ${enm.name}`);
  }

  protected onEndEnum(enm: spec.EnumType) {
    this.code.closeBlock();
    const enumName = this.nameutils.convertTypeName(enm.name);
    const namespace = this.namespaceFor(this.assembly, enm);
    this.closeFileIfNeeded(enumName, namespace, this.isNested(enm));
  }

  protected onEnumMember(enm: spec.EnumType, member: spec.EnumMember) {
    this.dotnetDocGenerator.emitDocs(member, {
      api: 'member',
      fqn: enm.fqn,
      memberName: member.name,
    });
    const enumMemberName = this.nameutils.convertEnumMemberName(member.name);
    this.dotnetRuntimeGenerator.emitAttributesForEnumMember(
      enumMemberName,
      member,
    );
    // If we are on the last enum member, we don't need a comma
    if (enm.members.indexOf(member) !== enm.members.length - 1) {
      this.code.line(`${enumMemberName},`);
    } else {
      this.code.line(`${enumMemberName}`);
    }
  }

  private namespaceFor(assm: spec.Assembly, type: spec.Type): string {
    let ns = type.namespace;
    while (ns != null && assm.types?.[`${assm.name}.${ns}`] != null) {
      const nesting = assm.types[`${assm.name}.${ns}`];
      ns = nesting.namespace;
    }
    if (ns != null) {
      return this.typeresolver.resolveNamespace(assm, assm.name, ns);
    }
    return assm.targets!.dotnet!.namespace;
  }

  private emitMethod(
    cls: spec.ClassType | spec.InterfaceType,
    method: spec.Method,
    definingType: spec.Type,
    emitForProxyOrDatatype = false,
  ): void {
    this.emitNewLineIfNecessary();
    const returnType = method.returns
      ? this.typeresolver.toDotNetType(method.returns.type)
      : 'void';
    const staticKeyWord = method.static ? 'static ' : '';

    const { overrideKeyword, virtualKeyword } = this.memberKeywords(
      cls,
      method,
      emitForProxyOrDatatype,
    );

    const access = this.renderAccessLevel(method);
    const methodName = this.nameutils.convertMethodName(method.name);

    const isOptional = method.returns && method.returns.optional ? '?' : '';

    const { parameters, whereClause, typeParameters } =
      this.typeresolver.renderGenericParameters(method.parameters);

    const signature = `${returnType}${isOptional} ${methodName}${typeParameters}(${this.renderParametersString(
      parameters,
    )})${whereClause}`;

    this.dotnetDocGenerator.emitDocs(method, {
      api: 'member',
      fqn: definingType.fqn,
      memberName: method.name,
    });
    this.dotnetRuntimeGenerator.emitAttributesForMethod(
      cls,
      method /*, emitForProxyOrDatatype*/,
    );

    if (method.abstract) {
      this.code.line(`${access} ${overrideKeyword}abstract ${signature};`);
      this.code.line();
    } else {
      this.code.openBlock(
        `${access} ${staticKeyWord}${overrideKeyword}${virtualKeyword}${signature}`,
      );
      this.emitUnionParameterValdation(
        (
          this.reflectAssembly.findType(cls.fqn) as
            | reflect.ClassType
            | reflect.InterfaceType
        ).allMethods.find((m) => m.name === method.name)!.parameters,
      );
      this.code.line(
        this.dotnetRuntimeGenerator.createInvokeMethodIdentifier(
          method,
          cls as spec.ClassType,
        ),
      );
      this.code.closeBlock();
    }
  }

  private memberKeywords(
    currentClass: spec.Type,
    member: spec.Property | spec.Method,
    proxyOrDataType: boolean,
  ): { overrideKeyword: string; virtualKeyword: string } {
    if (!spec.isClassType(currentClass)) {
      return { overrideKeyword: '', virtualKeyword: '' };
    }

    const implementedInBase = this.isMemberDefinedOnAncestor(
      currentClass,
      member,
    );

    if (implementedInBase || proxyOrDataType) {
      // Override if the property is in a datatype or proxy class or declared in a parent class. If the member is
      // static, use the "new" keyword instead, to indicate we are intentionally hiding the ancestor declaration (as
      // C# does not inherit statics, they can be hidden but not overridden).The "new" keyword is optional in this
      // context, but helps clarify intention.
      return {
        overrideKeyword: member.static ? 'new ' : 'override ',
        virtualKeyword: '',
      };
    } else if (member.abstract) {
      // Abstract members get decorated as such
      return {
        overrideKeyword: '',
        virtualKeyword: 'abstract ',
      };
    } else if (!member.static && !implementedInBase) {
      // Virtual if the prop is not static, and is not implemented in base member, this way we can later override it.
      return {
        overrideKeyword: '',
        virtualKeyword: 'virtual ',
      };
    }

    return {
      overrideKeyword: '',
      virtualKeyword: '',
    };
  }

  /**
   * Emits type checks for values passed for type union parameters.
   *
   * @param parameters the list of parameters received by the function.
   * @param noMangle   use parameter names as-is (useful for setters, for example) instead of mangling them.
   */
  private emitUnionParameterValdation(
    parameters: readonly reflect.Parameter[] = [],
    opts: { readonly noMangle: boolean } = { noMangle: false },
  ): void {
    if (!this.runtimeTypeChecking) {
      // We were configured not to emit those, so bail out now.
      return;
    }

    const validator = ParameterValidator.forParameters(
      parameters,
      this.nameutils,
      opts,
    );
    if (validator == null) {
      return;
    }

    this.code.openBlock(
      'if (Amazon.JSII.Runtime.Configuration.RuntimeTypeChecking)',
    );
    validator.emit(this.code, this.typeresolver);
    this.code.closeBlock();
  }

  /**
   * Founds out if a member (property or method) is already defined in one of the base classes
   *
   * Used to figure out if the override or virtual keywords are necessary.
   */
  private isMemberDefinedOnAncestor(
    cls: spec.ClassType,
    member: spec.Property | spec.Method,
  ): boolean {
    if (member as spec.Method) {
      const objectMethods = ['ToString', 'GetHashCode', 'Equals'];
      // Methods defined on the Object class should be overridden, return true;
      if (
        objectMethods.includes(this.nameutils.convertMethodName(member.name))
      ) {
        return true;
      }
    }

    // Check the `overrides` directive directly from the jsii assembly
    if (member.overrides) {
      const overrideType = this.findType(member.overrides);
      if (spec.isClassType(overrideType)) {
        // Overrides a class, needs overrides keyword
        return true;
      }
    }

    // Look for something that's named the same
    const base = cls.base;
    if (base) {
      const baseType = this.findType(base) as spec.ClassType;

      if (member as spec.Property) {
        if (baseType.properties) {
          if (
            baseType.properties.filter(
              (property) => property.name === member.name,
            ).length > 0
          ) {
            // property found in base parent
            return true;
          }
        }
        return this.isMemberDefinedOnAncestor(baseType, member);
      } else if (member as spec.Method) {
        if (baseType.methods) {
          const myMethod = member as spec.Method;
          // If the name, parameters and returns are similar then it is the same method in .NET
          for (const m of baseType.methods) {
            if (
              m.name === myMethod.name &&
              m.parameters === myMethod.parameters &&
              m.returns === myMethod.returns
            ) {
              return true;
            }
          }
        }
        return this.isMemberDefinedOnAncestor(baseType, member);
      }
      return false;
    }
    return false;
  }

  /**
   * Renders parameters string for methods or constructors
   */
  private renderParametersString(
    parameters: spec.Parameter[] | undefined,
  ): string {
    const params = [];
    if (parameters) {
      for (const p of parameters) {
        let optionalPrimitive = '';
        let optionalKeyword = '';
        let type = this.typeresolver.toDotNetType(p.type);
        if (p.optional) {
          optionalKeyword = ' = null';
          if (p.optional) {
            optionalPrimitive = '?';
          }
        } else if (p.variadic) {
          type = `params ${type}[]`;
        }
        const st = `${type}${optionalPrimitive} ${this.nameutils.convertParameterName(
          p.name,
        )}${optionalKeyword}`;
        params.push(st);
      }
    }
    return params.join(', ');
  }

  /**
   * Emits an interface proxy for an interface or an abstract class.
   */
  private emitInterfaceProxy(ifc: spec.InterfaceType | spec.ClassType): void {
    const name = '_Proxy';
    const namespace = this.namespaceFor(this.assembly, ifc);
    const isNested = true;
    this.openFileIfNeeded(name, namespace, isNested);

    this.code.line();
    this.dotnetDocGenerator.emitDocs(ifc, {
      api: 'type',
      fqn: ifc.fqn,
    });
    this.dotnetRuntimeGenerator.emitAttributesForInterfaceProxy(ifc);

    const interfaceFqn = this.typeresolver.toNativeFqn(ifc.fqn);
    const suffix = spec.isInterfaceType(ifc)
      ? `: DeputyBase, ${interfaceFqn}`
      : `: ${interfaceFqn}`;
    const newModifier = this.proxyMustUseNewModifier(ifc) ? 'new ' : '';

    this.code.openBlock(
      `${newModifier}internal sealed class ${name} ${suffix}`,
    );

    // Create the private constructor
    this.code.openBlock(
      `private ${name}(ByRefValue reference): base(reference)`,
    );
    this.code.closeBlock();

    // We have already output a member (constructor), setting the first member flag to true
    this.flagFirstMemberWritten(true);

    const datatype = false;
    const proxy = true;
    this.emitInterfaceMembersForProxyOrDatatype(ifc, datatype, proxy);

    this.code.closeBlock();
    this.closeFileIfNeeded(name, namespace, isNested);
  }

  /**
   * Determines whether any ancestor of the given type must use the `new`
   * modifier when introducing it's own proxy.
   *
   * If the type is a `class`, then it must use `new` if it extends another
   * abstract class defined in the same assembly (since proxies are internal,
   * external types' proxies are not visible in that context).
   *
   * If the type is an `interface`, then it must use `new` if it extends another
   * interface from the same assembly.
   *
   * @param type the tested proxy-able type (an abstract class or an interface).
   *
   * @returns true if any ancestor of this type has a visible proxy.
   */
  private proxyMustUseNewModifier(
    type: spec.ClassType | spec.InterfaceType,
  ): boolean {
    if (spec.isClassType(type)) {
      if (type.base == null) {
        return false;
      }

      const base = this.findType(type.base) as spec.ClassType;
      return (
        base.assembly === type.assembly &&
        (base.abstract
          ? true
          : // An abstract class could extend a concrete class... We must walk up the inheritance tree in this case...
            this.proxyMustUseNewModifier(base))
      );
    }
    return (
      type.interfaces != null &&
      type.interfaces.some(
        (fqn) =>
          (this.findType(fqn) as spec.InterfaceType).assembly === type.assembly,
      )
    );
  }

  /**
   * Emits an Interface Datatype class
   *
   * This is used to emit a class implementing an interface when the datatype property is true in the jsii model
   * The generation of the interface proxy may not be needed if the interface is also set as a datatype
   */
  private emitInterfaceDataType(ifc: spec.InterfaceType): void {
    // Interface datatypes do not need to be prefixed by I, we can call convertClassName
    const name = this.nameutils.convertClassName(ifc);
    const namespace = this.namespaceFor(this.assembly, ifc);
    const isNested = this.isNested(ifc);
    this.openFileIfNeeded(name, namespace, isNested);

    if (ifc.properties?.find((prop) => !prop.optional) != null) {
      // We don't want to be annoyed by the lack of initialization of non-nullable fields in this case.
      this.code.line('#pragma warning disable CS8618');
      this.code.line();
    }

    this.dotnetDocGenerator.emitDocs(ifc, {
      api: 'type',
      fqn: ifc.fqn,
    });
    const suffix = `: ${this.typeresolver.toNativeFqn(ifc.fqn)}`;
    this.dotnetRuntimeGenerator.emitAttributesForInterfaceDatatype(ifc);
    this.code.openBlock(`public class ${name} ${suffix}`);
    this.flagFirstMemberWritten(false);
    const datatype = true;
    const proxy = false;
    this.emitInterfaceMembersForProxyOrDatatype(ifc, datatype, proxy);
    this.code.closeBlock();
    this.closeFileIfNeeded(name, namespace, isNested);
  }

  /**
   * Generates the body of the interface proxy or data type class
   *
   * This loops through all the member and generates them
   */
  private emitInterfaceMembersForProxyOrDatatype(
    ifc: spec.InterfaceType | spec.ClassType,
    datatype: boolean,
    proxy: boolean,
  ): void {
    // The key is in the form 'method.name;parameter1;parameter2;' etc
    const methods = new Map<string, MethodDefinition>();
    /*
          Only get the first declaration encountered, and keep it if it is abstract. The list contains ALL
          methods and properties encountered, in the order encountered. An abstract class can have concrete
          implementations. Therefore, we only generate methods/properties if the first member encountered
          is unimplemented.
        */
    const excludedMethod: string[] = []; // Keeps track of the methods we already ran into and don't want to emit
    const excludedProperties: string[] = []; // Keeps track of the properties we already ran into and don't want to emit
    const properties: { [name: string]: PropertyDefinition } = {};
    const collectAbstractMembers = (
      currentType: spec.InterfaceType | spec.ClassType,
    ) => {
      for (const prop of currentType.properties ?? []) {
        if (!excludedProperties.includes(prop.name)) {
          // If we have never run into this property before and it is abstract, we keep it
          if (prop.abstract) {
            properties[prop.name] = { prop, definingType: currentType };
          }
          excludedProperties.push(prop.name);
        }
      }

      for (const method of currentType.methods ?? []) {
        let methodParameters = '';
        if (method.parameters) {
          method.parameters.forEach((param) => {
            methodParameters += `;${this.typeresolver.toDotNetType(
              param.type,
            )}`;
          });
        }
        if (!excludedMethod.includes(`${method.name}${methodParameters}`)) {
          // If we have never run into this method before and it is abstract, we keep it
          if (method.abstract) {
            methods.set(`${method.name}${methodParameters}`, {
              method,
              definingType: currentType,
            });
          }
          excludedMethod.push(`${method.name}${methodParameters}`);
        }
      }

      const bases = new Array<spec.NamedTypeReference>();
      bases.push(
        ...(currentType.interfaces ?? []).map((iface) => this.findType(iface)),
      );
      if (spec.isClassType(currentType) && currentType.base) {
        bases.push(this.findType(currentType.base));
      }
      for (const base of bases) {
        const type = this.findType(base.fqn);
        if (
          type.kind !== spec.TypeKind.Interface &&
          type.kind !== spec.TypeKind.Class
        ) {
          throw new Error(
            `Base interfaces of an interface must be an interface or a class (${base.fqn} is of type ${type.kind})`,
          );
        }
        collectAbstractMembers(type);
      }
    };
    collectAbstractMembers(ifc);

    // emit all properties
    for (const propName of Object.keys(properties)) {
      const prop = clone(properties[propName]);
      prop.prop.abstract = false;
      this.emitProperty(ifc, prop.prop, prop.definingType, datatype, proxy);
    }
    // emit all the methods
    for (const methodNameAndParameters of methods.keys()) {
      const originalMethod = methods.get(methodNameAndParameters);
      if (originalMethod) {
        const method = clone(originalMethod);
        method.method.abstract = false;
        this.emitMethod(
          ifc,
          method.method,
          method.definingType,
          /* emitForProxyOrDatatype */ true,
        );

        for (const overloadedMethod of this.createOverloadsForOptionals(
          method.method,
        )) {
          overloadedMethod.abstract = false;
          this.emitMethod(
            ifc,
            overloadedMethod,
            method.definingType,
            /* emitForProxyOrDatatype */ true,
          );
        }
      }
    }
  }

  /**
   * Emits a property
   */
  private emitProperty(
    cls: spec.Type,
    prop: spec.Property,
    definingType: spec.Type,
    datatype = false,
    proxy = false,
  ): void {
    this.emitNewLineIfNecessary();

    const className = this.typeresolver.toNativeFqn(cls.fqn);
    const access = this.renderAccessLevel(prop);
    const staticKeyWord = prop.static ? 'static ' : '';
    const propName = this.nameutils.convertPropertyName(prop.name);

    // Unfortunately we can only render this as one type. We'll take the first one.
    let apparentType = prop.type;
    if (spec.isIntersectionTypeReference(apparentType)) {
      apparentType = apparentType.intersection.types[0];
    }
    const propTypeFQN = this.typeresolver.toDotNetType(apparentType);
    const isOptional = prop.optional ? '?' : '';

    // We need to use a backing field so we can perform type checking if the property type is a union, and this is a struct.
    const backingFieldName =
      spec.isInterfaceType(cls) && datatype && containsUnionType(apparentType)
        ? // We down-case the first letter, private fields are conventionally named with a _ prefix, and a camelCase name.
          `_${propName.replace(/[A-Z]/, (c) => c.toLowerCase())}`
        : undefined;
    if (backingFieldName != null) {
      this.code.line(
        `private ${propTypeFQN}${isOptional} ${backingFieldName};`,
      );
      this.code.line();
    }

    this.dotnetDocGenerator.emitDocs(prop, {
      api: 'member',
      fqn: definingType.fqn,
      memberName: prop.name,
    });
    if (prop.optional) {
      this.code.line('[JsiiOptional]');
    }
    this.dotnetRuntimeGenerator.emitAttributesForProperty(prop);

    const { virtualKeyword, overrideKeyword } = this.memberKeywords(
      cls,
      prop,
      datatype || proxy,
    );
    const statement = `${access} ${virtualKeyword}${staticKeyWord}${overrideKeyword}${propTypeFQN}${isOptional} ${propName}`;
    this.code.openBlock(statement);

    // Emit getters
    if (backingFieldName != null) {
      this.code.line(`get => ${backingFieldName};`);
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    } else if (datatype || prop.const || prop.abstract) {
      this.code.line('get;');
    } else {
      // If the property is non-optional, add a bang to silence compiler warning
      const bang = prop.optional ? '' : '!';
      if (prop.static) {
        this.code.line(
          `get => GetStaticProperty<${propTypeFQN}${isOptional}>(typeof(${className}))${bang};`,
        );
      } else {
        this.code.line(
          `get => GetInstanceProperty<${propTypeFQN}${isOptional}>()${bang};`,
        );
      }
    }

    // Emit setters
    const reflectCls = this.reflectAssembly.findType(cls.fqn) as
      | reflect.ClassType
      | reflect.InterfaceType;
    const syntheticParam = new reflect.Parameter(
      reflectCls.system,
      reflectCls,
      new reflect.Method(
        reflectCls.system,
        reflectCls.assembly,
        reflectCls,
        reflectCls,
        { name: '<synthetic>' },
      ),
      {
        name: 'value',
        type: apparentType,
        optional: prop.optional,
      },
    );

    if (backingFieldName) {
      this.code.openBlock('set');
      this.emitUnionParameterValdation([syntheticParam], { noMangle: true });
      this.code.line(`${backingFieldName} = value;`);
      this.code.closeBlock();
    } else if (datatype || (!prop.immutable && prop.abstract)) {
      this.code.line('set;');
    } else {
      if (!prop.immutable) {
        const setCode = prop.static
          ? `SetStaticProperty(typeof(${className}), value);`
          : 'SetInstanceProperty(value);';
        if (containsUnionType(prop.type)) {
          this.code.openBlock('set');
          this.emitUnionParameterValdation([syntheticParam], {
            noMangle: true,
          });
          this.code.line(setCode);
          this.code.closeBlock();
        } else {
          this.code.line(`set => ${setCode}`);
        }
      }
    }

    this.code.closeBlock();

    this.flagFirstMemberWritten(true);
  }

  /**
   * Emits a (static) constant property
   */
  private emitConstProperty(cls: spec.ClassType, prop: spec.Property): void {
    this.emitNewLineIfNecessary();
    this.flagFirstMemberWritten(true);
    const propType = this.typeresolver.toDotNetType(prop.type);
    const isOptional = prop.optional ? '?' : '';
    this.dotnetDocGenerator.emitDocs(prop, {
      api: 'member',
      fqn: cls.fqn,
      memberName: prop.name,
    });
    this.dotnetRuntimeGenerator.emitAttributesForProperty(prop);
    const access = this.renderAccessLevel(prop);
    const propName = this.nameutils.convertPropertyName(prop.name);
    const staticKeyword = prop.static ? 'static ' : '';

    const { overrideKeyword } = this.memberKeywords(
      cls,
      prop,
      // Static properties are never on proxies or datatypes (because those come from TS interfaces)
      false,
    );

    this.code.openBlock(
      `${access} ${staticKeyword}${overrideKeyword}${propType}${isOptional} ${propName}`,
    );
    this.code.line('get;');
    this.code.closeBlock();
    const className = this.typeresolver.toNativeFqn(cls.fqn);
    // If the property is non-optional, add a bang to silence the compiler warning
    const bang = prop.optional ? '' : '!';
    const initializer = prop.static
      ? `= GetStaticProperty<${propType}>(typeof(${className}))${bang};`
      : `= GetInstanceProperty<${propType}>(typeof(${className}))${bang};`;
    this.code.line(initializer);
  }

  private renderAccessLevel(method: spec.Method | spec.Property): string {
    return method.protected ? 'protected' : 'public';
  }

  private isNested(type: spec.Type): boolean {
    if (!this.assembly.types || !type.namespace) {
      return false;
    }
    const parent = `${type.assembly}.${type.namespace}`;
    return parent in this.assembly.types;
  }

  private toCSharpFilePath(type: string): string {
    return `${type}.cs`;
  }

  private openFileIfNeeded(
    typeName: string,
    namespace: string,
    isNested: boolean,
    usingDeputy = true,
  ): void {
    // If Nested type, we shouldn't open/close a file
    if (isNested) {
      return;
    }

    const dotnetPackageId = this.assembly.targets?.dotnet?.packageId;
    if (!dotnetPackageId) {
      throw new Error(
        `The module ${this.assembly.name} does not have a dotnet.packageId setting`,
      );
    }
    const filePath = namespace.replace(/[.]/g, '/');
    this.code.openFile(
      path.join(dotnetPackageId, filePath, this.toCSharpFilePath(typeName)),
    );
    if (usingDeputy) {
      this.code.line('using Amazon.JSII.Runtime.Deputy;');
      this.code.line();
    }

    // Suppress warnings about missing XMLDoc, Obsolete inconsistencies
    this.code.line('#pragma warning disable CS0672,CS0809,CS1591');
    this.code.line();

    this.code.openBlock(`namespace ${namespace}`);
  }

  private closeFileIfNeeded(
    typeName: string,
    namespace: string,
    isNested: boolean,
  ): void {
    if (isNested) {
      return;
    }
    this.code.closeBlock();

    const dotnetPackageId = this.assembly.targets?.dotnet?.packageId;
    if (!dotnetPackageId) {
      throw new Error(
        `The module ${this.assembly.name} does not have a dotnet.packageId setting`,
      );
    }
    const filePath = namespace.replace(/[.]/g, '/');
    this.code.closeFile(
      path.join(dotnetPackageId, filePath, this.toCSharpFilePath(typeName)),
    );
  }

  /**
   * Resets the firstMember boolean flag to keep track of the first member of a new file
   *
   * This avoids unnecessary white lines
   */
  private flagFirstMemberWritten(first: boolean): void {
    this.firstMemberWritten = first;
  }

  /**
   * Emits a new line prior to writing a new property, method, if the property is not the first one in the class
   *
   * This avoids unnecessary white lines.
   */
  private emitNewLineIfNecessary(): void {
    // If the first member has already been written, it is safe to write a new line
    if (this.firstMemberWritten) {
      this.code.line();
    } else {
      this.firstMemberWritten = false;
    }
  }

  private emitAssemblyDocs() {
    this.emitNamespaceDocs(
      this.assembly.targets!.dotnet!.namespace,
      this.assembly.name,
      this.assembly,
    );
  }

  /**
   * Emit an unused, empty class called `NamespaceDoc` to attach the module README to
   *
   * There is no way to attach doc comments to a namespace in C#, and this trick has been
   * semi-standardized by NDoc and Sandcastle Help File Builder.
   *
   * DocFX doesn't support it out of the box, but we should be able to get there with a
   * bit of hackery.
   *
   * In any case, we need a place to attach the docs where they can be transported around,
   * might as well be this method.
   */
  private emitNamespaceDocs(
    namespace: string,
    jsiiFqn: string,
    docSource: spec.Targetable & spec.ReadMeContainer,
  ) {
    if (!docSource.readme) {
      return;
    }

    const className = 'NamespaceDoc';
    this.openFileIfNeeded(className, namespace, false, false);

    this.dotnetDocGenerator.emitMarkdownAsRemarks(docSource.readme.markdown, {
      api: 'moduleReadme',
      moduleFqn: jsiiFqn,
    });
    this.emitHideAttribute();
    // Traditionally this class is made 'internal', but that interacts poorly with DocFX's default filters
    // which aren't overridable. So we make it public, but use attributes to hide it from users' IntelliSense,
    // so that we can access the class in DocFX.
    this.code.openBlock(`public class ${className}`);
    this.code.closeBlock();
    this.closeFileIfNeeded(className, namespace, false);
  }

  /**
   * Emit an attribute that will hide the subsequent API element from users
   */
  private emitHideAttribute() {
    this.code.line(
      '[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]',
    );
  }
}

async function tryDownloadResource(
  urlText: string,
  into: string,
): Promise<string | undefined> {
  const url = new URL(urlText);

  let request: typeof http.get | typeof https.get;
  switch (url.protocol) {
    case 'http:':
      request = http.get;
      break;
    case 'https:':
      request = https.get;
      break;
    default:
      // Unhandled protocol... ignoring
      debug(
        `Unsupported URL protocol for resource download: ${url.protocol} (full URL: ${urlText})`,
      );
      return undefined;
  }

  return new Promise((ok, ko) =>
    request(url, (res) => {
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (res.statusCode) {
        case 200:
          let fileName = path.basename(url.pathname);
          // Ensure there is a content-appropriate extension on the result...
          // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
          switch (res.headers['content-type']) {
            case 'image/gif':
              if (!fileName.endsWith('.gif')) {
                fileName = `${fileName}.gif`;
              }
              break;
            case 'image/jpeg':
              if (!fileName.endsWith('.jpg')) {
                fileName = `${fileName}.jpg`;
              }
              break;
            case 'image/png':
              if (!fileName.endsWith('.png')) {
                fileName = `${fileName}.png`;
              }
              break;
            default:
            // Nothing to do...
          }
          const filePath = path.join('resources', fileName);
          try {
            fs.mkdirpSync(path.join(into, 'resources'));
          } catch (err) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            return ko(err);
          }
          try {
            const fd = fs.openSync(
              path.join(into, filePath),
              fs.constants.O_CREAT |
                fs.constants.O_TRUNC |
                fs.constants.O_WRONLY,
            );
            res
              .once('error', (cause) => {
                try {
                  fs.closeSync(fd);
                } catch {
                  // IGNORE
                }
                ko(cause);
              })
              .on('data', (chunk) => {
                const buff = Buffer.from(chunk);
                let offset = 0;
                while (offset < buff.length) {
                  try {
                    offset += fs.writeSync(fd, buff, offset);
                  } catch (err) {
                    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                    return ko(err);
                  }
                }
              })
              .once('close', () => {
                try {
                  fs.closeSync(fd);
                  ok(filePath);
                } catch (err) {
                  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                  ko(err);
                }
              });
          } catch (err) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            return ko(err);
          }
          break;
        default:
          ko(
            new Error(
              `GET ${urlText} -- HTTP ${res.statusCode ?? 0} (${
                res.statusMessage ?? 'Unknown Error'
              })`,
            ),
          );
      }
    }).once('error', ko),
  );
}

function containsUnionType(
  typeRef: spec.TypeReference,
): typeRef is spec.UnionTypeReference | spec.CollectionTypeReference {
  return (
    spec.isUnionTypeReference(typeRef) ||
    (spec.isCollectionTypeReference(typeRef) &&
      containsUnionType(typeRef.collection.elementtype))
  );
}
