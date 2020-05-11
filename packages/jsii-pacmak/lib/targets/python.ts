import { CodeMaker, toSnakeCase } from 'codemaker';
import * as escapeStringRegexp from 'escape-string-regexp';
import * as reflect from 'jsii-reflect';
import * as path from 'path';
import * as spec from '@jsii/spec';
import { Stability } from '@jsii/spec';
import { Generator, GeneratorOptions } from '../generator';
import { warn } from '../logging';
import { md2rst } from '../markdown';
import { Target, TargetOptions } from '../target';
import { shell } from '../util';
import { Translation, Rosetta, typeScriptSnippetFromSource } from 'jsii-rosetta';
import { toPythonVersionRange } from './version-utils';
import { INCOMPLETE_DISCLAIMER_COMPILING, INCOMPLETE_DISCLAIMER_NONCOMPILING } from '.';



// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const spdxLicenseList = require('spdx-license-list');

export default class Python extends Target {
  protected readonly generator: PythonGenerator;

  public constructor(options: TargetOptions) {
    super(options);

    this.generator = new PythonGenerator(options.rosetta);
  }

  public async build(sourceDir: string, outDir: string): Promise<void> {
    // Format our code to make it easier to read, we do this here instead of trying
    // to do it in the code generation phase, because attempting to mix style and
    // function makes the code generation harder to maintain and read, while doing
    // this here is easy.
    // await shell("black", ["--py36", sourceDir], {});

    // Actually package up our code, both as a sdist and a wheel for publishing.
    await shell('python3', ['setup.py', 'sdist', '--dist-dir', outDir], { cwd: sourceDir });
    await shell('python3', ['setup.py', 'bdist_wheel', '--dist-dir', outDir], { cwd: sourceDir });
    if (await twineIsPresent()) {
      await shell('twine', ['check', path.join(outDir, '*')], { cwd: sourceDir });
    } else {
      warn('Unable to validate distribution packages because `twine` is not present. '
                + 'Run `pip3 install twine` to enable distribution package validation.');
    }

    // Approximating existence check using `which`, falling back on `pip3 show`. If that fails, assume twine is not there.
    async function twineIsPresent(): Promise<boolean> {
      try {
        await shell('which', ['twine'], { cwd: sourceDir });
        return true;
      } catch {
        try {
          const output = await shell('pip3', ['show', 'twine'], { cwd: sourceDir });
          return output.trim() !== '';
        } catch {
          return false;
        }
      }
    }
  }

}

// ##################
// # CODE GENERATOR #
// ##################

const PYTHON_BUILTIN_TYPES = ['bool', 'str', 'None'];

const PYTHON_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class',
  'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield'
];

const pythonModuleNameToFilename = (name: string): string => {
  return path.join(...name.split('.'));
};

const toPythonIdentifier = (name: string): string => {
  if (PYTHON_KEYWORDS.includes(name)) {
    return `${name}_`;
  }

  return name;
};

const toPythonMethodName = (name: string, protectedItem = false): string => {
  let value = toPythonIdentifier(toSnakeCase(name));
  if (protectedItem) {
    value = `_${value}`;
  }
  return value;
};

const toPythonPropertyName = (name: string, constant = false, protectedItem = false): string => {
  let value = toPythonIdentifier(toSnakeCase(name));

  if (constant) {
    value = value.toUpperCase();
  }

  if (protectedItem) {
    value = `_${value}`;
  }

  return value;
};

/**
 * Converts a given signature's parameter name to what should be emitted in Python. It slugifies the
 * positional parameter names that collide with a lifted prop by appending trailing `_`. There is no
 * risk of conflicting with an other positional parameter that ends with a `_` character because
 * this is prohibited by the `jsii` compiler (parameter names MUST be camelCase, and only a single
 * `_` is permitted when it is on **leading** position)
 *
 * @param name              the name of the parameter that needs conversion.
 * @param liftedParamNames  the list of "lifted" keyword parameters in this signature. This must be
 *                          omitted when generating a name for a parameter that **is** lifted.
 */
function toPythonParameterName(name: string, liftedParamNames = new Set<string>()): string {
  let result = toPythonIdentifier(toSnakeCase(name));

  while (liftedParamNames.has(result)) {
    result += '_';
  }

  return result;
}

const setDifference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const result = new Set<T>();
  for (const item of setA) {
    if (!setB.has(item)) {
      result.add(item);
    }
  }
  return result;
};

const sortMembers = (members: PythonBase[], resolver: TypeResolver): PythonBase[] => {
  let sortable = new Array <{ member: PythonBase & ISortableType, dependsOn: Set<PythonType> }>();
  const sorted = new Array<PythonBase>();
  const seen = new Set<PythonBase>();

  // The first thing we want to do, is push any item which is not sortable to the very
  // front of the list. This will be things like methods, properties, etc.
  for (const member of members) {
    if (!isSortableType(member)) {
      sorted.push(member);
      seen.add(member);
    } else {
      sortable.push({ member, dependsOn: new Set(member.dependsOn(resolver)) });
    }
  }

  // Now that we've pulled out everything that couldn't possibly have dependencies,
  // we will go through the remaining items, and pull off any items which have no
  // dependencies that we haven't already sorted.
  while (sortable.length > 0) {
    for (const { member, dependsOn } of sortable) {
      const diff = setDifference(dependsOn, seen);
      if ([...diff].find(dep => !(dep instanceof PythonModule)) == null) {
        sorted.push(member);
        seen.add(member);
      }
    }

    const leftover = sortable.filter(({ member }) => !seen.has(member));
    if (leftover.length === sortable.length) {
      throw new Error(`Could not sort members (circular dependency?). Leftover: ${leftover.map(lo => lo.member.pythonName).join(', ')}`);
    } else {
      sortable = leftover;
    }
  }

  return sorted;
};

interface PythonBase {
  readonly pythonName: string;

  emit(code: CodeMaker, resolver: TypeResolver, opts?: any): void;

  /**
   * Determines what modules a particular sortable entity depends on.
   *
   * @param resolver a TypeResolver.
   *
   * @returns the pythonNames of modules this entity depends on.
   */
  dependsOnModules(resolver: TypeResolver): Set<string>;
}

interface PythonType extends PythonBase {
  // The JSII FQN for this item, if this item doesn't exist as a JSII type, then it
  // doesn't have a FQN and it should be null;
  readonly fqn: string | null;

  addMember(member: PythonBase): void;
}

interface ISortableType {
  dependsOn(resolver: TypeResolver): PythonType[];
}

function isSortableType(arg: unknown): arg is ISortableType {
  return (arg as Partial<ISortableType>).dependsOn !== undefined;
}

interface PythonTypeOpts {
  bases?: spec.TypeReference[];
}

abstract class BasePythonClassType implements PythonType, ISortableType {
  protected bases: spec.TypeReference[];
  protected members: PythonBase[];

  public constructor(
    protected readonly generator: PythonGenerator,
    public readonly pythonName: string,
    public readonly fqn: string | null,
    opts: PythonTypeOpts,
    protected readonly docs: spec.Docs | undefined) {
    const {
      bases = [],
    } = opts;

    this.bases = bases;
    this.members = [];
  }

  public dependsOn(resolver: TypeResolver): PythonType[] {
    const dependencies = new Array<PythonType>();
    const parent = resolver.getParent(this.fqn!);

    // We need to return any bases that are in the same module at the same level of
    // nesting.
    const seen = new Set<string>();
    for (const base of this.bases) {
      if (spec.isNamedTypeReference(base)) {
        if (resolver.isInModule(base)) {
          // Given a base, we need to locate the base's parent that is the same as
          // our parent, because we only care about dependencies that are at the
          // same level of our own.
          // TODO: We might need to recurse into our members to also find their
          //       dependencies.
          let baseItem = resolver.getType(base);
          let baseParent = resolver.getParent(base);
          while (baseParent !== parent) {
            baseItem = baseParent;
            baseParent = resolver.getParent(baseItem.fqn!);
          }

          if (!seen.has(baseItem.fqn!)) {
            dependencies.push(baseItem);
            seen.add(baseItem.fqn!);
          }
        }
      }
    }

    return dependencies;
  }

  public dependsOnModules(resolver: TypeResolver): Set<string> {
    const result = new Set<string>();
    const thisModule = resolver.getDefiningPythonModule(this.fqn!);
    for (const base of this.bases) {
      if (!spec.isNamedTypeReference(base)) { continue; }
      const definingModule = resolver.getDefiningPythonModule(base);
      if (thisModule !== definingModule) {
        result.add(definingModule);
      }
    }
    return result;
  }

  public addMember(member: PythonBase) {
    this.members.push(member);
  }

  public emit(code: CodeMaker, resolver: TypeResolver) {
    const classParams = this.getClassParams(resolver);
    const bases = classParams.length > 0 ? `(${classParams.join(', ')})` : '';

    code.openBlock(`class ${this.pythonName}${bases}`);
    this.generator.emitDocString(code, this.docs, { documentableItem: `class-${this.pythonName}` });

    this.emitPreamble(code, resolver);

    if (this.members.length > 0) {
      resolver = this.boundResolver(resolver);
      for (const member of sortMembers(this.members, resolver)) {
        member.emit(code, resolver);
      }
    } else {
      code.line('pass');
    }

    code.closeBlock();
  }

  protected boundResolver(resolver: TypeResolver): TypeResolver {
    if (this.fqn == null) {
      return resolver;
    }
    return resolver.bind(this.fqn);
  }

  protected abstract getClassParams(resolver: TypeResolver): string[];

  protected emitPreamble(_code: CodeMaker, _resolver: TypeResolver) { return; }
}

interface BaseMethodOpts {
  abstract?: boolean;
  liftedProp?: spec.InterfaceType;
  parent: spec.NamedTypeReference;
}

interface BaseMethodEmitOpts {
  renderAbstract?: boolean;
  forceEmitBody?: boolean;
}

abstract class BaseMethod implements PythonBase {
  public readonly abstract: boolean;

  protected readonly abstract implicitParameter: string;
  protected readonly jsiiMethod!: string;
  protected readonly decorator?: string;
  protected readonly classAsFirstParameter: boolean = false;
  protected readonly returnFromJSIIMethod: boolean = true;
  protected readonly shouldEmitBody: boolean = true;

  private readonly liftedProp?: spec.InterfaceType;
  private readonly parent: spec.NamedTypeReference;

  public constructor(protected readonly generator: PythonGenerator,
    public readonly pythonName: string,
    private readonly jsName: string | undefined,
    private readonly parameters: spec.Parameter[],
    private readonly returns: spec.OptionalValue | undefined,
    private readonly docs: spec.Docs | undefined,
    opts: BaseMethodOpts) {
    this.abstract = !!opts.abstract;
    this.liftedProp = opts.liftedProp;
    this.parent = opts.parent;
  }

  public dependsOnModules(resolver: TypeResolver) {
    const result = new Set<string>();
    const thisModule = resolver.getDefiningPythonModule(this.parent);
    if (this.returns && spec.isNamedTypeReference(this.returns.type)) {
      const definingModule = resolver.getDefiningPythonModule(this.returns.type);
      if (thisModule !== definingModule) {
        result.add(definingModule);
      }
    }
    for (const param of this.parameters) {
      if (spec.isNamedTypeReference(param.type)) {
        const definingModule = resolver.getDefiningPythonModule(param.type);
        if (thisModule !== definingModule) {
          result.add(definingModule);
        }
      }
    }
    return result;
  }

  public emit(code: CodeMaker, resolver: TypeResolver, opts?: BaseMethodEmitOpts) {
    const { renderAbstract = true, forceEmitBody = false } = opts ?? {};

    let returnType: string;
    if (this.returns !== undefined) {
      returnType = resolver.resolve(this.returns, { forwardReferences: false });
    } else {
      returnType = 'None';
    }

    // We cannot (currently?) blindly use the names given to us by the JSII for
    // initializers, because our keyword lifting will allow two names to clash.
    // This can hopefully be removed once we get https://github.com/aws/jsii/issues/288
    // resolved, so build up a list of all of the prop names so we can check against
    // them later.
    const liftedPropNames = new Set<string>();
    if (this.liftedProp?.properties?.length ?? 0 >= 1) {
      for (const prop of this.liftedProp!.properties!) {
        liftedPropNames.add(toPythonParameterName(prop.name));
      }
    }

    // We need to turn a list of JSII parameters, into Python style arguments with
    // gradual typing, so we'll have to iterate over the list of parameters, and
    // build the list, converting as we go.
    const pythonParams: string[] = [this.implicitParameter];
    for (const param of this.parameters) {
      // We cannot (currently?) blindly use the names given to us by the JSII for
      // initializers, because our keyword lifting will allow two names to clash.
      // This can hopefully be removed once we get https://github.com/aws/jsii/issues/288
      // resolved.
      const paramName: string = toPythonParameterName(param.name, liftedPropNames);

      const paramType = resolver.resolve(param, { forwardReferences: false });
      const paramDefault = param.optional ? '=None' : '';

      pythonParams.push(`${paramName}: ${paramType}${paramDefault}`);
    }

    const documentableArgs = this.parameters
      // If there's liftedProps, the last argument is the struct and it won't be _actually_ emitted.
      .filter((_, index) => this.liftedProp != null ? index < this.parameters.length - 1 : true)
      .map(param => ({ ...param, name: toPythonParameterName(param.name, liftedPropNames) }));

    // If we have a lifted parameter, then we'll drop the last argument to our params
    // and then we'll lift all of the params of the lifted type as keyword arguments
    // to the function.
    if (this.liftedProp !== undefined) {
      // Remove our last item.
      pythonParams.pop();
      const liftedProperties = this.getLiftedProperties(resolver);

      if (liftedProperties.length >= 1) {
        // All of these parameters are keyword only arguments, so we'll mark them
        // as such.
        pythonParams.push('*');

        // Iterate over all of our props, and reflect them into our params.
        for (const prop of liftedProperties) {
          const paramName = toPythonParameterName(prop.name);
          const paramType = resolver.resolve(prop, { forwardReferences: false });
          const paramDefault = prop.optional ? '=None' : '';

          pythonParams.push(`${paramName}: ${paramType}${paramDefault}`);
        }
      }

      // Document them as keyword arguments
      documentableArgs.push(...liftedProperties);
    } else if (this.parameters.length >= 1 && this.parameters[this.parameters.length - 1].variadic) {
      // Another situation we could be in, is that instead of having a plain parameter
      // we have a variadic parameter where we need to expand the last parameter as a
      // *args.
      pythonParams.pop();

      const lastParameter = this.parameters.slice(-1)[0];
      const paramName = toPythonParameterName(lastParameter.name);
      const paramType = resolver.resolve(
        lastParameter,
        { forwardReferences: false, ignoreOptional: true },
      );

      pythonParams.push(`*${paramName}: ${paramType}`);
    }

    if (this.jsName !== undefined) {
      code.line(`@jsii.member(jsii_name="${this.jsName}")`);
    }

    if (this.decorator !== undefined) {
      code.line(`@${this.decorator}`);
    }

    if (renderAbstract && this.abstract) {
      code.line('@abc.abstractmethod');
    }

    code.openBlock(`def ${this.pythonName}(${pythonParams.join(', ')}) -> ${returnType}`);
    this.generator.emitDocString(code, this.docs, { arguments: documentableArgs, documentableItem: `method-${this.pythonName}` });
    this.emitBody(code, resolver, renderAbstract, forceEmitBody, liftedPropNames);
    code.closeBlock();
  }

  private emitBody(
    code: CodeMaker,
    resolver: TypeResolver,
    renderAbstract: boolean,
    forceEmitBody: boolean,
    liftedPropNames: Set<string>
  ) {
    if ((!this.shouldEmitBody && !forceEmitBody) || (renderAbstract && this.abstract)) {
      code.line('...');
    } else {
      if (this.liftedProp !== undefined) {
        this.emitAutoProps(code, resolver, liftedPropNames);
      }

      this.emitJsiiMethodCall(code, resolver, liftedPropNames);
    }
  }

  private emitAutoProps(code: CodeMaker, resolver: TypeResolver, liftedPropNames: Set<string>) {
    const lastParameter = this.parameters.slice(-1)[0];
    const argName = toPythonParameterName(lastParameter.name, liftedPropNames);
    const typeName = resolver.resolve(lastParameter, { ignoreOptional: true });

    // We need to build up a list of properties, which are mandatory, these are the
    // ones we will specifiy to start with in our dictionary literal.
    const liftedProps = this.getLiftedProperties(resolver).map(p => new StructField(this.generator, p, this.parent));
    const assignments = liftedProps
      .map(p => p.pythonName)
      .map(v => `${v}=${v}`);

    code.line(`${argName} = ${typeName}(${assignments.join(', ')})`);
    code.line();
  }

  private emitJsiiMethodCall(code: CodeMaker, resolver: TypeResolver, liftedPropNames: Set<string>) {
    const methodPrefix: string = this.returnFromJSIIMethod ? 'return ' : '';

    const jsiiMethodParams: string[] = [];
    if (this.classAsFirstParameter) {
      if (this.parent === undefined) {
        throw new Error('Parent not known.');
      }
      jsiiMethodParams.push(resolver.resolve({ type: this.parent }));
    }
    jsiiMethodParams.push(this.implicitParameter);
    if (this.jsName !== undefined) {
      jsiiMethodParams.push(`"${this.jsName}"`);
    }

    // If the last arg is variadic, expand the tuple
    const params: string[] = [];
    for (const param of this.parameters) {
      let expr = toPythonParameterName(param.name, liftedPropNames);
      if (param.variadic) { expr = `*${expr}`; }
      params.push(expr);
    }

    code.line(`${methodPrefix}jsii.${this.jsiiMethod}(${jsiiMethodParams.join(', ')}, [${params.join(', ')}])`);
  }

  private getLiftedProperties(resolver: TypeResolver): spec.Property[] {
    const liftedProperties: spec.Property[] = [];

    const stack = [this.liftedProp];
    let current = stack.shift();
    while (current !== undefined) {
      // Add any interfaces that this interface depends on, to the list.
      if (current.interfaces !== undefined) {
        stack.push(...current.interfaces.map(ifc => resolver.dereference(ifc) as spec.InterfaceType));
      }

      // Add all of the properties of this interface to our list of properties.
      if (current.properties !== undefined) {
        liftedProperties.push(...current.properties);
      }

      // Finally, grab our next item.
      current = stack.shift();
    }

    return liftedProperties;
  }
}

interface BasePropertyOpts {
  abstract?: boolean;
  immutable?: boolean;
  parent: spec.NamedTypeReference;
}

interface BasePropertyEmitOpts {
  renderAbstract?: boolean;
  forceEmitBody?: boolean;
}

abstract class BaseProperty implements PythonBase {
  public readonly abstract: boolean;

  protected readonly abstract decorator: string;
  protected readonly abstract implicitParameter: string;
  protected readonly jsiiGetMethod!: string;
  protected readonly jsiiSetMethod!: string;
  protected readonly shouldEmitBody: boolean = true;

  private readonly immutable: boolean;
  private readonly parent: spec.NamedTypeReference;

  public constructor(
    private readonly generator: PythonGenerator,
    public readonly pythonName: string,
    private readonly jsName: string,
    private readonly type: spec.OptionalValue,
    private readonly docs: spec.Docs | undefined,
    opts: BasePropertyOpts) {
    const {
      abstract = false,
      immutable = false,
    } = opts;

    this.abstract = abstract;
    this.immutable = immutable;
    this.parent = opts.parent;
  }

  public dependsOnModules(resolver: TypeResolver) {
    const result = new Set<string>();
    const thisModule = resolver.getDefiningPythonModule(this.parent);
    if (spec.isNamedTypeReference(this.type.type)) {
      const definingModule = resolver.getDefiningPythonModule(this.type.type);
      if (definingModule !== thisModule) {
        result.add(definingModule);
      }
    }
    return result;
  }

  public emit(code: CodeMaker, resolver: TypeResolver, opts?: BasePropertyEmitOpts) {
    const { renderAbstract = true, forceEmitBody = false } = opts ?? {};
    const pythonType = resolver.resolve(this.type, { forwardReferences: false });

    code.line(`@${this.decorator}`);
    code.line(`@jsii.member(jsii_name="${this.jsName}")`);
    if (renderAbstract && this.abstract) {
      code.line('@abc.abstractmethod');
    }
    code.openBlock(`def ${this.pythonName}(${this.implicitParameter}) -> ${pythonType}`);
    this.generator.emitDocString(code, this.docs, { documentableItem: `prop-${this.pythonName}` });
    if ((this.shouldEmitBody || forceEmitBody) && (!renderAbstract || !this.abstract)) {
      code.line(`return jsii.${this.jsiiGetMethod}(${this.implicitParameter}, "${this.jsName}")`);
    } else {
      code.line('...');
    }
    code.closeBlock();

    if (!this.immutable) {
      code.line(`@${this.pythonName}.setter`);
      if (renderAbstract && this.abstract) {
        code.line('@abc.abstractmethod');
      }
      code.openBlock(`def ${this.pythonName}(${this.implicitParameter}, value: ${pythonType})`);
      if ((this.shouldEmitBody || forceEmitBody) && (!renderAbstract || !this.abstract)) {
        code.line(`jsii.${this.jsiiSetMethod}(${this.implicitParameter}, "${this.jsName}", value)`);
      } else {
        code.line('...');
      }
      code.closeBlock();
    }
  }
}

class Interface extends BasePythonClassType {

  public emit(code: CodeMaker, resolver: TypeResolver) {
    code.line(`@jsii.interface(jsii_type="${this.fqn}")`);

    // First we do our normal class logic for emitting our members.
    super.emit(code, resolver);

    // Then, we have to emit a Proxy class which implements our proxy interface.
    resolver = this.fqn ? resolver.bind(this.fqn) : resolver;
    const proxyBases: string[] = this.bases.map(b => `jsii.proxy_for(${resolver.resolve({ type: b })})`);
    code.openBlock(`class ${this.getProxyClassName()}(${proxyBases.join(', ')})`);
    this.generator.emitDocString(code, this.docs, { documentableItem: `class-${this.pythonName}` });
    code.line(`__jsii_type__ = "${this.fqn}"`);

    if (this.members.length > 0) {
      for (const member of this.members) {
        member.emit(code, resolver, { forceEmitBody: true });
      }
    } else {
      code.line('pass');
    }

    code.closeBlock();
  }

  protected getClassParams(resolver: TypeResolver): string[] {
    const params: string[] = this.bases.map(b => resolver.resolve({ type: b }));

    params.push('jsii.compat.Protocol');

    return params;
  }

  protected emitPreamble(code: CodeMaker, _resolver: TypeResolver) {
    code.line('@builtins.staticmethod');
    code.openBlock('def __jsii_proxy_class__()');
    code.line(`return ${this.getProxyClassName()}`);
    code.closeBlock();
  }

  private getProxyClassName(): string {
    return `_${this.pythonName}Proxy`;
  }

}

class InterfaceMethod extends BaseMethod {
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiMethod: string = 'invoke';
  protected readonly shouldEmitBody: boolean = false;
}

class InterfaceProperty extends BaseProperty {
  protected readonly decorator: string = 'builtins.property';
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiGetMethod: string = 'get';
  protected readonly jsiiSetMethod: string = 'set';
  protected readonly shouldEmitBody: boolean = false;
}

class Struct extends BasePythonClassType {
  protected directMembers = new Array<StructField>();

  public addMember(member: PythonBase): void {
    if (!(member instanceof StructField)) {
      throw new Error('Must add StructField to Struct');
    }
    this.directMembers.push(member);
  }

  public emit(code: CodeMaker, resolver: TypeResolver) {
    resolver = this.fqn ? resolver.bind(this.fqn) : resolver;

    const baseInterfaces = this.getClassParams(resolver);

    code.line(`@jsii.data_type(jsii_type="${this.fqn}", jsii_struct_bases=[${baseInterfaces.join(', ')}], name_mapping=${this.propertyMap()})`);
    code.openBlock(`class ${this.pythonName}(${baseInterfaces.join(', ')})`);
    this.emitConstructor(code, resolver);

    for (const member of this.allMembers) {
      this.emitGetter(member, code, resolver);
    }

    this.emitMagicMethods(code);

    code.closeBlock();
  }

  protected getClassParams(resolver: TypeResolver): string[] {
    return this.bases.map(b => resolver.resolve({ type: b }));
  }

  /**
     * Find all fields (inherited as well)
     */
  private get allMembers(): StructField[] {
    return this.thisInterface.allProperties.map(x => new StructField(this.generator, x.spec, this.thisInterface));
  }

  private get thisInterface() {
    if (this.fqn === null) { throw new Error('FQN not set'); }
    return this.generator.reflectAssembly.system.findInterface(this.fqn);
  }

  private emitConstructor(code: CodeMaker, resolver: TypeResolver) {
    const members = this.allMembers;

    const kwargs = members.map(m => m.constructorDecl(resolver));

    const constructorArguments = kwargs.length > 0 ? ['self', '*', ...kwargs] : ['self'];

    code.openBlock(`def __init__(${constructorArguments.join(', ')}) -> None`);
    this.emitConstructorDocstring(code);

    // Re-type struct arguments that were passed as "dict"
    for (const member of members.filter(m => m.isStruct(this.generator))) {
      // Note that "None" is NOT an instance of dict (that's convenient!)
      const typeName = resolver.resolve(member.type, { ignoreOptional: true });
      code.line(`if isinstance(${member.pythonName}, dict): ${member.pythonName} = ${typeName}(**${member.pythonName})`);
    }

    // Required properties, those will always be put into the dict
    code.line('self._values = {');
    for (const member of members.filter(m => !m.optional)) {
      code.line(`    '${member.pythonName}': ${member.pythonName},`);
    }
    code.line('}');

    // Optional properties, will only be put into the dict if they're not None
    for (const member of members.filter(m => m.optional)) {
      code.line(`if ${member.pythonName} is not None: self._values["${member.pythonName}"] = ${member.pythonName}`);
    }

    code.closeBlock();
  }

  private emitConstructorDocstring(code: CodeMaker) {
    const args: DocumentableArgument[] = this.allMembers.map(m => ({
      name: m.pythonName,
      docs: m.docs,
    }));
    this.generator.emitDocString(code, this.docs, { arguments: args, documentableItem: `class-${this.pythonName}` });
  }

  private emitGetter(member: StructField, code: CodeMaker, resolver: TypeResolver) {
    code.line('@builtins.property');
    code.openBlock(`def ${member.pythonName}(self) -> ${member.typeAnnotation(resolver)}`);
    member.emitDocString(code);
    code.line(`return self._values.get('${member.pythonName}')`);
    code.closeBlock();
  }

  private emitMagicMethods(code: CodeMaker) {
    code.openBlock('def __eq__(self, rhs) -> bool');
    code.line('return isinstance(rhs, self.__class__) and rhs._values == self._values');
    code.closeBlock();

    code.openBlock('def __ne__(self, rhs) -> bool');
    code.line('return not (rhs == self)');
    code.closeBlock();

    code.openBlock('def __repr__(self) -> str');
    code.line(`return '${this.pythonName}(%s)' % ', '.join(k + '=' + repr(v) for k, v in self._values.items())`);
    code.closeBlock();
  }

  private propertyMap() {
    const ret = new Array<string>();
    for (const member of this.allMembers) {
      ret.push(`'${member.pythonName}': '${member.jsiiName}'`);
    }
    return `{${ret.join(', ')}}`;
  }
}

class StructField implements PythonBase {
  public readonly pythonName: string;
  public readonly jsiiName: string;
  public readonly docs?: spec.Docs;
  public readonly type: spec.OptionalValue;

  public constructor(
    private readonly generator: PythonGenerator,
    public readonly prop: spec.Property,
    private readonly parent: spec.NamedTypeReference,
  ) {
    this.pythonName = toPythonPropertyName(prop.name);
    this.jsiiName = prop.name;
    this.type = prop;
    this.docs = prop.docs;
  }

  public get optional(): boolean {
    return !!this.type.optional;
  }

  public dependsOnModules(resolver: TypeResolver) {
    const result = new Set<string>();
    const thisModule = resolver.getDefiningPythonModule(this.parent);
    if (spec.isNamedTypeReference(this.type.type)) {
      const definingModule = resolver.getDefiningPythonModule(this.type.type);
      if (thisModule !== definingModule) {
        result.add(definingModule);
      }
    }
    return result;
  }

  public isStruct(generator: PythonGenerator): boolean {
    return isStruct(generator.reflectAssembly.system, this.type.type);
  }

  public constructorDecl(resolver: TypeResolver) {
    const opt = this.optional ? '=None' : '';
    return `${this.pythonName}: ${this.typeAnnotation(resolver)}${opt}`;
  }

  /**
     * Return the Python type annotation for this type
     */
  public typeAnnotation(resolver: TypeResolver) {
    return resolver.resolve(
      this.type,
      { forwardReferences: false }
    );
  }

  public emitDocString(code: CodeMaker) {
    this.generator.emitDocString(code, this.docs, { documentableItem: `prop-${this.pythonName}` });
  }

  public emit(code: CodeMaker, resolver: TypeResolver) {
    const resolvedType = this.typeAnnotation(resolver);
    code.line(`${this.pythonName}: ${resolvedType}`);
    this.emitDocString(code);
  }
}

interface ClassOpts extends PythonTypeOpts {
  abstract?: boolean;
  interfaces?: spec.NamedTypeReference[];
  abstractBases?: spec.ClassType[];
}

class Class extends BasePythonClassType implements ISortableType {

  private readonly abstract: boolean;
  private readonly abstractBases: spec.ClassType[];
  private readonly interfaces: spec.NamedTypeReference[];

  public constructor(generator: PythonGenerator, name: string, fqn: string, opts: ClassOpts, docs: spec.Docs | undefined) {
    super(generator, name, fqn, opts, docs);

    const { abstract = false, interfaces = [], abstractBases = [] } = opts;

    this.abstract = abstract;
    this.interfaces = interfaces;
    this.abstractBases = abstractBases;
  }

  public dependsOn(resolver: TypeResolver): PythonType[] {
    const dependencies: PythonType[] = super.dependsOn(resolver);
    const parent = resolver.getParent(this.fqn!);

    // We need to return any ifaces that are in the same module at the same level of
    // nesting.
    const seen = new Set<string>();
    for (const iface of this.interfaces) {
      if (resolver.isInModule(iface)) {
        // Given a iface, we need to locate the ifaces's parent that is the same
        // as our parent, because we only care about dependencies that are at the
        // same level of our own.
        // TODO: We might need to recurse into our members to also find their
        //       dependencies.
        let ifaceItem = resolver.getType(iface);
        let ifaceParent = resolver.getParent(iface);
        while (ifaceParent !== parent) {
          ifaceItem = ifaceParent;
          ifaceParent = resolver.getParent(ifaceItem.fqn!);
        }

        if (!seen.has(ifaceItem.fqn!)) {
          dependencies.push(ifaceItem);
          seen.add(ifaceItem.fqn!);
        }
      }
    }

    return dependencies;
  }

  public dependsOnModules(resolver: TypeResolver): Set<string> {
    const result = super.dependsOnModules(resolver);

    for (const member of this.members) {
      for (const dep of member.dependsOnModules(resolver)) {
        result.add(dep);
      }
    }

    return result;
  }

  public emit(code: CodeMaker, resolver: TypeResolver) {
    // First we emit our implments decorator
    if (this.interfaces.length > 0) {
      const interfaces: string[] = this.interfaces.map(b => resolver.resolve({ type: b }));
      code.line(`@jsii.implements(${interfaces.join(', ')})`);
    }

    // Then we do our normal class logic for emitting our members.
    super.emit(code, resolver);

    // Then, if our class is Abstract, we have to go through and redo all of
    // this logic, except only emiting abstract methods and properties as non
    // abstract, and subclassing our initial class.
    if (this.abstract) {
      resolver = this.fqn ? resolver.bind(this.fqn) : resolver;

      const proxyBases = [this.pythonName];
      for (const base of this.abstractBases) {
        proxyBases.push(`jsii.proxy_for(${resolver.resolve({ type: base })})`);
      }

      code.openBlock(`class ${this.getProxyClassName()}(${proxyBases.join(', ')})`);

      // Filter our list of members to *only* be abstract members, and not any
      // other types.
      const abstractMembers = this.members.filter(
        m => (m instanceof BaseMethod || m instanceof BaseProperty) && m.abstract
      );
      if (abstractMembers.length > 0) {
        for (const member of abstractMembers) {
          member.emit(code, resolver, { renderAbstract: false });
        }
      } else {
        code.line('pass');
      }

      code.closeBlock();
    }
  }

  protected emitPreamble(code: CodeMaker, _resolver: TypeResolver) {
    if (this.abstract) {
      code.line('@builtins.staticmethod');
      code.openBlock('def __jsii_proxy_class__()');
      code.line(`return ${this.getProxyClassName()}`);
      code.closeBlock();
    }
  }

  protected getClassParams(resolver: TypeResolver): string[] {
    const params: string[] = this.bases.map(b => resolver.resolve({ type: b }));
    const metaclass: string = this.abstract ? 'JSIIAbstractClass' : 'JSIIMeta';

    params.push(`metaclass=jsii.${metaclass}`);
    params.push(`jsii_type="${this.fqn}"`);

    return params;
  }

  private getProxyClassName(): string {
    return `_${this.pythonName}Proxy`;
  }
}

class StaticMethod extends BaseMethod {
  protected readonly decorator?: string = 'builtins.classmethod';
  protected readonly implicitParameter: string = 'cls';
  protected readonly jsiiMethod: string = 'sinvoke';
}

class Initializer extends BaseMethod {
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiMethod: string = 'create';
  protected readonly classAsFirstParameter: boolean = true;
  protected readonly returnFromJSIIMethod: boolean = false;
}

class Method extends BaseMethod {
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiMethod: string = 'invoke';
}

class AsyncMethod extends BaseMethod {
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiMethod: string = 'ainvoke';
}

class StaticProperty extends BaseProperty {
  protected readonly decorator: string = 'jsii.python.classproperty';
  protected readonly implicitParameter: string = 'cls';
  protected readonly jsiiGetMethod: string = 'sget';
  protected readonly jsiiSetMethod: string = 'sset';
}

class Property extends BaseProperty {
  protected readonly decorator: string = 'builtins.property';
  protected readonly implicitParameter: string = 'self';
  protected readonly jsiiGetMethod: string = 'get';
  protected readonly jsiiSetMethod: string = 'set';
}

class Enum extends BasePythonClassType {

  public emit(code: CodeMaker, resolver: TypeResolver) {
    code.line(`@jsii.enum(jsii_type="${this.fqn}")`);
    return super.emit(code, resolver);
  }

  protected getClassParams(_resolver: TypeResolver): string[] {
    return ['enum.Enum'];
  }

}

class EnumMember implements PythonBase {
  public constructor(
    private readonly generator: PythonGenerator,
    public readonly pythonName: string,
    private readonly value: string,
    private readonly docs: spec.Docs | undefined) {
    this.pythonName = pythonName;
    this.value = value;
  }

  public dependsOnModules() {
    return new Set<string>();
  }

  public emit(code: CodeMaker, _resolver: TypeResolver) {
    code.line(`${this.pythonName} = "${this.value}"`);
    this.generator.emitDocString(code, this.docs, { documentableItem: `enum-${this.pythonName}` });
  }
}

interface ModuleOpts {
  assembly: spec.Assembly;
  assemblyFilename: string;
  loadAssembly?: boolean;
  package?: Package;
}

class PythonModule implements PythonType {
  private readonly assembly: spec.Assembly;
  private readonly assemblyFilename: string;
  private readonly loadAssembly: boolean;
  private readonly members = new Array<PythonBase>();
  private readonly package?: Package;

  public constructor(
    public readonly pythonName: string,
    public readonly fqn: string | null,
    opts: ModuleOpts
  ) {
    this.assembly = opts.assembly;
    this.assemblyFilename = opts.assemblyFilename;
    this.loadAssembly = !!opts.loadAssembly;
    this.package = opts.package;
  }

  public addMember(member: PythonBase) {
    this.members.push(member);
  }

  public dependsOnModules(resolver: TypeResolver) {
    resolver = this.fqn ? resolver.bind(this.fqn, this.pythonName) : resolver;
    const result = new Set<string>();
    for (const mem of this.members) {
      for (const dep of mem.dependsOnModules(resolver)) {
        result.add(dep);
      }
    }
    return result;
  }

  public emit(code: CodeMaker, resolver: TypeResolver) {
    this.emitModuleDocumentation(code);

    resolver = this.fqn ? resolver.bind(this.fqn, this.pythonName) : resolver;

    // Before we write anything else, we need to write out our module headers, this
    // is where we handle stuff like imports, any required initialization, etc.
    code.line('import abc');
    code.line('import builtins');
    code.line('import datetime');
    code.line('import enum');
    code.line('import typing');
    code.line();
    code.line('import jsii');
    code.line('import jsii.compat');
    code.line('import publication');

    // Go over all of the modules that we need to import, and import them.
    this.emitDependencyImports(code, resolver);

    // Determine if we need to write out the kernel load line.
    if (this.loadAssembly) {
      code.line();
      const params = [
        `"${this.assembly.name}"`,
        `"${this.assembly.version}"`,
        '__name__[0:-6]', // Removing the "._jsii" from the tail!
        `"${this.assemblyFilename}"`,
      ];
      code.line(`__jsii_assembly__ = jsii.JSIIAssembly.load(${params.join(', ')})`);
    } else {
      // Then we must import the ._jsii subpackage.
      code.line();
      let distanceFromRoot = 0;
      for (let curr = this.fqn!; curr !== this.assembly.name; curr = curr.substring(0, curr.lastIndexOf('.'))) {
        distanceFromRoot++;
      }
      code.line(`from ${'.'.repeat(distanceFromRoot + 1)}_jsii import *`);
    }

    code.line();
    if (this.members.length > 0) {
      code.line();
    }

    // Emit all of our members.
    for (const member of sortMembers(this.members, resolver)) {
      member.emit(code, resolver);
    }

    // Whatever names we've exported, we'll write out our __all__ that lists them.
    const exportedMembers = this.members.map(m => `"${m.pythonName}"`);
    if (this.loadAssembly) {
      exportedMembers.push('"__jsii_assembly__"');
    }

    // Declare the list of "public" members this module exports
    code.indent('__all__ = [');
    for (const member of exportedMembers.sort()) {
      // Writing one by line might be _a lot_ of lines, but it'll make reviewing changes to the list easier. Trust me.
      code.line(`${member},`);
    }
    code.unindent(']');

    // Finally, we'll use publication to ensure that all of the non-public names
    // get hidden from dir(), tab-complete, etc.
    code.line();
    code.line('publication.publish()');
  }

  /**
   * Emit the README as module docstring if this is the entry point module (it loads the assembly)
   */
  private emitModuleDocumentation(code: CodeMaker) {
    if (this.package && this.fqn === this.assembly.name && this.package.convertedReadme.trim().length > 0) {
      code.line('"""');
      code.line(this.package.convertedReadme);
      code.line('"""');
    }
  }

  private emitDependencyImports(code: CodeMaker, resolver: TypeResolver) {
    const deps = this.dependsOnModules(resolver);

    // We need to make sure direct dependencies are always loaded...
    for (const dep of Object.keys(this.assembly.dependencies ?? {})) {
      const depConfig = this.assembly.dependencyClosure![dep];

      const packageName = depConfig.targets!.python!.module;
      deps.add(packageName);

      for (const [submoduleName] of Object.entries(depConfig.submodules ?? {})) {
        const [, ...parts] = submoduleName.split('.');
        deps.add([packageName, ...parts.map(part => toSnakeCase(part))].join('.'));
      }
    }

    // Now actually write the import statements...
    if (deps.size > 0) {
      code.line();
      for (const moduleName of Array.from(deps).sort()) {
        code.line(`import ${moduleName}`);
      }
    }
  }
}

interface PackageData {
  filename: string;
  data: string | null;
}

class Package {
  public convertedReadme = '';

  public readonly name: string;
  public readonly version: string;
  public readonly metadata: spec.Assembly;

  private readonly modules = new Map<string, PythonModule>();
  private readonly data = new Map<string, PackageData[]>();

  public constructor(private readonly generator: PythonGenerator, name: string, version: string, metadata: spec.Assembly) {
    this.name = name;
    this.version = version;
    this.metadata = metadata;
  }

  public addModule(module: PythonModule) {
    this.modules.set(module.pythonName, module);
  }

  public addData(module: PythonModule, filename: string, data: string | null) {
    if (!this.data.has(module.pythonName)) {
      this.data.set(module.pythonName, []);
    }

    this.data.get(module.pythonName)!.push({ filename, data });
  }

  public write(code: CodeMaker, resolver: TypeResolver) {
    if (this.metadata.readme) {
      // Conversion is expensive, so cache the result in a variable (we need it twice)
      this.convertedReadme = this.generator.convertMarkdown(this.metadata.readme.markdown).trim();
    }

    const modules = [...this.modules.values()].sort((a, b) => a.pythonName.localeCompare(b.pythonName));

    // Iterate over all of our modules, and write them out to disk.
    for (const mod of modules) {
      const filename = path.join('src', pythonModuleNameToFilename(mod.pythonName), '__init__.py');

      code.openFile(filename);
      mod.emit(code, resolver);
      code.closeFile(filename);
    }

    // Handle our package data.
    const packageData: {[key: string]: string[]} = {};
    for (const [mod, pdata] of this.data) {
      for (const data of pdata) {
        if (data.data != null) {
          const filepath = path.join('src', pythonModuleNameToFilename(mod), data.filename);

          code.openFile(filepath);
          code.line(data.data);
          code.closeFile(filepath);
        }
      }

      packageData[mod] = pdata.map(pd => pd.filename);
    }

    // Compute our list of dependencies
    const dependencies: string[] = [];
    for (const [depName, version] of Object.entries(this.metadata.dependencies ?? {})) {
      const depInfo = this.metadata.dependencyClosure![depName];
      dependencies.push(`${depInfo.targets!.python!.distName}${toPythonVersionRange(version)}`);
    }

    code.openFile('README.md');
    code.line(this.convertedReadme);
    code.closeFile('README.md');

    // Strip " (build abcdef)" from the jsii version
    const jsiiVersionSimple = this.metadata.jsiiVersion.replace(/ .*$/, '');

    /* eslint-disable @typescript-eslint/camelcase */
    const setupKwargs = {
      name: this.name,
      version: this.version,
      description: this.metadata.description,
      license: this.metadata.license,
      url: this.metadata.homepage,
      long_description_content_type: 'text/markdown',
      author: this.metadata.author.name + (
        this.metadata.author.email !== undefined ? `<${this.metadata.author.email}>` : ''
      ),
      project_urls: {
        Source: this.metadata.repository.url,
      },
      package_dir: { '': 'src' },
      packages: modules.map(m => m.pythonName),
      package_data: packageData,
      python_requires: '>=3.6',
      install_requires: [`jsii${toPythonVersionRange(`^${jsiiVersionSimple}`)}`, 'publication>=0.0.3'].concat(dependencies),
      classifiers: [
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Typing :: Typed'
      ],
    };
    /* eslint-enable @typescript-eslint/camelcase */

    switch (this.metadata.docs?.stability) {
      case spec.Stability.Experimental:
        setupKwargs.classifiers.push('Development Status :: 4 - Beta');
        break;
      case spec.Stability.Stable:
        setupKwargs.classifiers.push('Development Status :: 5 - Production/Stable');
        break;
      case spec.Stability.Deprecated:
        setupKwargs.classifiers.push('Development Status :: 7 - Inactive');
        break;
      default:
        // No 'Development Status' trove classifier for you!
    }

    if (spdxLicenseList[this.metadata.license]?.osiApproved) {
      setupKwargs.classifiers.push('License :: OSI Approved');
    }

    // We Need a setup.py to make this Package, actually a Package.
    // TODO:
    //      - License
    //      - Classifiers
    code.openFile('setup.py');
    code.line('import json');
    code.line('import setuptools');
    code.line();
    code.line('kwargs = json.loads("""');
    code.line(JSON.stringify(setupKwargs, null, 4));
    code.line('""")');
    code.line();
    code.openBlock("with open('README.md') as fp");
    code.line("kwargs['long_description'] = fp.read()");
    code.closeBlock();
    code.line();
    code.line('setuptools.setup(**kwargs)');
    code.closeFile('setup.py');

    // Because we're good citizens, we're going to go ahead and support pyproject.toml
    // as well.
    // TODO: Might be easier to just use a TOML library to write this out.
    code.openFile('pyproject.toml');
    code.line('[build-system]');
    code.line('requires = ["setuptools >= 38.6.0", "wheel >= 0.31.0"]');
    code.line('build-backend = "setuptools.build_meta"');
    code.closeFile('pyproject.toml');

    // We also need to write out a MANIFEST.in to ensure that all of our required
    // files are included.
    code.openFile('MANIFEST.in');
    code.line('include pyproject.toml');
    code.closeFile('MANIFEST.in');
  }
}

type FindModuleCallback = (fqn: string) => spec.AssemblyConfiguration;
type FindTypeCallback = (fqn: string) => spec.Type;

interface TypeResolverOpts {
  forwardReferences?: boolean;
  ignoreOptional?: boolean;
}

class TypeResolver {
  private static readonly STD_TYPES_REGEX = /^(datetime\.datetime|typing\.[A-Z][a-z]+|jsii\.Number)$/;

  private readonly types: Map<string, PythonType>;
  private readonly boundTo?: string;
  private readonly boundRe!: RegExp;
  private readonly moduleName?: string;
  private readonly moduleRe!: RegExp;
  private readonly findModule: FindModuleCallback;
  private readonly findType: FindTypeCallback;

  public constructor(types: Map<string, PythonType>,
    findModule: FindModuleCallback,
    findType: FindTypeCallback,
    boundTo?: string,
    moduleName?: string) {
    this.types = types;
    this.findModule = findModule;
    this.findType = findType;
    this.moduleName = moduleName;
    this.boundTo = boundTo !== undefined ? this.toPythonFQN(boundTo) : boundTo;

    if (this.moduleName !== undefined) {
      this.moduleRe = new RegExp(`^(${escapeStringRegexp(this.moduleName)})\\.(.+)$`);
    }

    if (this.boundTo !== undefined) {
      this.boundRe = new RegExp(`^(${escapeStringRegexp(this.boundTo)})\\.(.+)$`);
    }
  }

  public bind(fqn: string, moduleName?: string): TypeResolver {
    return new TypeResolver(
      this.types,
      this.findModule,
      this.findType,
      fqn,
      moduleName !== undefined
        ? moduleName.startsWith('.') ? `${this.moduleName}${moduleName}` : moduleName
        : this.moduleName,
    );
  }

  public isInModule(typeRef: spec.NamedTypeReference | string): boolean {
    const pythonType = typeof typeRef !== 'string' ? this.toPythonFQN(typeRef.fqn) : typeRef;
    return this.moduleRe.test(pythonType);
  }

  public isInNamespace(typeRef: spec.NamedTypeReference | string): boolean {
    const pythonType = typeof typeRef !== 'string' ? this.toPythonFQN(typeRef.fqn) : typeRef;
    return this.boundRe.test(pythonType);
  }

  public getParent(typeRef: spec.NamedTypeReference | string): PythonType {
    const fqn = typeof typeRef !== 'string' ? typeRef.fqn : typeRef;
    const matches = /^(.+)\.[^.]+$/.exec(fqn);
    if (matches == null || !Array.isArray(matches)) {
      throw new Error(`Invalid FQN: ${fqn}`);
    }
    const [, parentFQN] = matches;
    const parent = this.types.get(parentFQN);

    if (parent === undefined) {
      throw new Error(`Could not find parent:  ${parentFQN}`);
    }

    return parent;
  }

  public getDefiningPythonModule(typeRef: spec.NamedTypeReference | string): string {
    const fqn = typeof typeRef !== 'string' ? typeRef.fqn : typeRef;
    const parent = this.types.get(fqn);

    if (parent) {
      let mod = parent;
      while (!(mod instanceof PythonModule)) {
        mod = this.getParent(mod.fqn!);
      }
      return mod.pythonName;
    }

    const matches = /^([^.]+)\./.exec(fqn);
    if (matches == null || !Array.isArray(matches)) {
      throw new Error(`Invalid FQN: ${fqn}`);
    }
    const [, assm] = matches;
    return this.findModule(assm).targets!.python!.module;
  }

  public getType(typeRef: spec.NamedTypeReference): PythonType {
    const type = this.types.get(typeRef.fqn);

    if (type === undefined) {
      throw new Error(`Could not locate type: "${typeRef.fqn}"`);
    }

    return type;
  }

  public dereference(typeRef: string | spec.NamedTypeReference): spec.Type {
    if (typeof typeRef !== 'string') {
      typeRef = typeRef.fqn;
    }
    return this.findType(typeRef);
  }

  public resolve(
    typeInstance: spec.OptionalValue,
    opts: TypeResolverOpts = { forwardReferences: true, ignoreOptional: false }): string {
    const {
      forwardReferences = true,
    } = opts;

    const optional = opts.ignoreOptional ? false : !!typeInstance.optional;
    // First, we need to resolve our given type reference into the Python type.
    let pythonType = this.toPythonType(typeInstance.type, { optional });

    // If we split our types by any of the "special" characters that can't appear in
    // identifiers (like "[],") then we will get a list of all of the identifiers,
    // no matter how nested they are. The downside is we might get trailing/leading
    // spaces or empty items so we'll need to trim and filter this list.
    const types = pythonType.split(/[[\],]/).map((s: string) => s.trim()).filter(s => s !== '');

    for (const innerType of types) {
      // Built in types do not need formatted in any particular way.
      if (PYTHON_BUILTIN_TYPES.includes(innerType)) {
        continue;
      }

      // These are not exactly built in types, but they're also not types that
      // this resolver has to worry about.
      if (TypeResolver.STD_TYPES_REGEX.test(innerType)) {
        continue;
      }

      // If our resolver is bound to the same module as the type we're trying to
      // resolve, then we'll implement the needed logic to use module relative naming
      // and to handle forward references (if needed).
      if (this.isInModule(innerType)) {
        // If our type is part of the same namespace, then we'll return a namespace
        // relative name, otherwise a module relative name.
        let typeName: string;
        if (this.isInNamespace(innerType)) {
          [, , typeName] = this.boundRe.exec(innerType) as string[];
        } else {
          [, , typeName] = this.moduleRe.exec(innerType) as string[];
        }

        // This re will look for the entire type, boxed by either the start/end of
        // a string, a comma, a space, a quote, or open/closing brackets. This will
        // ensure that we only match whole type names, and not partial ones.
        const re = new RegExp(`((?:^|[[,\\s])"?)${innerType}("?(?:$|[\\],\\s]))`);

        // We need to handle forward references, our caller knows if we're able to
        // use them in the current context or not, so if not, we'll wrap our forward
        // reference in quotes.
        // We have special logic here for checking if our thing is actually *in*
        // our module, behond what we've already done, because our other logic will
        // work for submodules, but this can't.
        if (!forwardReferences && this.isInModule(innerType)) {
          pythonType = pythonType.replace(re, `$1"${innerType}"$2`);
        }

        // Now that we've gotten forward references out of the way, we will want
        // to replace the entire type string, with just the type portion.
        pythonType = pythonType.replace(re, `$1${typeName}$2`);
      }
    }

    return pythonType;
  }

  private toPythonType(typeRef: spec.TypeReference, opts: { optional: boolean }): string {
    let pythonType: string;

    // Get the underlying python type.
    if (spec.isPrimitiveTypeReference(typeRef)) {
      pythonType = this.toPythonPrimitive(typeRef.primitive);
    } else if (spec.isCollectionTypeReference(typeRef)) {
      pythonType = this.toPythonCollection(typeRef);
    } else if (spec.isNamedTypeReference(typeRef)) {
      pythonType = this.toPythonFQN(typeRef.fqn);
    } else if (typeRef.union) {
      const types = new Array<string>();
      for (const subtype of typeRef.union.types) {
        types.push(this.toPythonType(subtype, opts));
      }
      pythonType = `typing.Union[${types.join(', ')}]`;
    } else {
      throw new Error(`Invalid type reference: ${JSON.stringify(typeRef)}`);
    }

    // If our type is Optional, then we'll wrap our underlying type with typing.Optional
    // However, if we're not respecting optionals, then we'll just skip over this.
    // We explicitly don't emit this when our type is typing.Any, because typing.Any
    // already implied that None is an accepted type.
    // See: https://github.com/aws/jsii/issues/284
    if (opts.optional && pythonType !== 'typing.Any') {
      pythonType = `typing.Optional[${pythonType}]`;
    }

    return pythonType;
  }

  private toPythonPrimitive(primitive: spec.PrimitiveType): string {
    switch (primitive) {
      case spec.PrimitiveType.Boolean: return 'bool';
      case spec.PrimitiveType.Date: return 'datetime.datetime';
      case spec.PrimitiveType.Json: return 'typing.Mapping[typing.Any, typing.Any]';
      case spec.PrimitiveType.Number: return 'jsii.Number';
      case spec.PrimitiveType.String: return 'str';
      case spec.PrimitiveType.Any: return 'typing.Any';
      default:
        throw new Error(`Unknown primitive type: ${primitive}`);
    }
  }

  private toPythonCollection(ref: spec.CollectionTypeReference): string {
    const elementPythonType = this.toPythonType(ref.collection.elementtype, { optional: false });
    switch (ref.collection.kind) {
      case spec.CollectionKind.Array: return `typing.List[${elementPythonType}]`;
      case spec.CollectionKind.Map: return `typing.Mapping[str, ${elementPythonType}]`;
      default:
        throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
    }
  }

  private toPythonFQN(fqn: string): string {
    const [assemblyName, ...qualifiedIdentifiers] = fqn.split('.');
    const fqnParts: string[] = [this.findModule(assemblyName).targets!.python!.module];

    for (const part of qualifiedIdentifiers) {
      fqnParts.push(toPythonIdentifier(part));
    }

    return fqnParts.join('.');
  }
}

class PythonGenerator extends Generator {
  private package!: Package;
  private readonly types: Map<string, PythonType>;

  public constructor(private readonly rosetta: Rosetta, options: GeneratorOptions = {}) {
    super(options);

    this.code.openBlockFormatter = s => `${s}:`;
    this.code.closeBlockFormatter = _s => '';

    this.types = new Map();
  }

  // eslint-disable-next-line complexity
  public emitDocString(
    code: CodeMaker,
    docs: spec.Docs | undefined,
    options: {
      arguments?: DocumentableArgument[];
      documentableItem?: string;
    } = {}
  ) {
    if ((!docs || Object.keys(docs).length === 0) && !options.arguments) { return; }
    if (!docs) { docs = {}; }

    const lines = new Array<string>();

    if (docs.summary) {
      lines.push(md2rst(docs.summary));
      brk();
    } else {
      lines.push('');
    }

    function brk() {
      if (lines.length > 0 && lines[lines.length - 1].trim() !== '') { lines.push(''); }
    }

    function block(heading: string, content: string, doBrk = true) {
      if (doBrk) { brk(); }
      lines.push(heading);
      const contentLines = md2rst(content).split('\n');
      if (contentLines.length <= 1) {
        lines.push(`:${heading}: ${contentLines.join('')}`);
      } else {
        lines.push(`:${heading}:`);
        brk();
        for (const line of contentLines) {
          lines.push(`${line}`);
        }
      }
      if (doBrk) { brk(); }
    }

    if (docs.remarks) {
      brk();
      lines.push(...md2rst(this.convertMarkdown(docs.remarks ?? '')).split('\n'));
      brk();
    }

    if (options.arguments?.length ?? 0 > 0) {
      brk();
      for (const param of options.arguments!) {
        // Add a line for every argument. Even if there is no description, we need
        // the docstring so that the Sphinx extension can add the type annotations.
        lines.push(`:param ${toPythonParameterName(param.name)}: ${onelineDescription(param.docs)}`);
      }
      brk();
    }

    if (docs.default) { block('default', docs.default); }
    if (docs.returns) { block('return', docs.returns); }
    if (docs.deprecated) { block('deprecated', docs.deprecated); }
    if (docs.see) { block('see', docs.see, false); }
    if (docs.stability && shouldMentionStability(docs.stability)) { block('stability', docs.stability, false); }
    if (docs.subclassable) { block('subclassable', 'Yes'); }

    for (const [k, v] of Object.entries(docs.custom ?? {})) {
      block(`${k}:`, v, false);
    }

    if (docs.example) {
      brk();
      lines.push('Example::');
      lines.push('');
      const exampleText = this.convertExample(docs.example);

      for (const line of exampleText.split('\n')) {
        lines.push(`    ${line}`);
      }
      brk();
    }

    while (lines.length > 0 && lines[lines.length - 1] === '') { lines.pop(); }

    if (lines.length === 0) { return; }

    if (lines.length === 1) {
      code.line(`"""${lines[0]}"""`);
      return;
    }

    code.line(`"""${lines[0]}`);
    lines.splice(0, 1);

    for (const line of lines) {
      code.line(line);
    }

    code.line('"""');
  }

  public convertExample(example: string): string {
    const snippet = typeScriptSnippetFromSource(example, 'example');
    const translated = this.rosetta.translateSnippet(snippet, 'python');
    if (!translated) { return example; }
    return this.prefixDisclaimer(translated);
  }

  public convertMarkdown(markdown: string): string {
    return this.rosetta.translateSnippetsInMarkdown(markdown, 'python', trans => ({
      language: trans.language,
      source: this.prefixDisclaimer(trans)
    }));
  }

  private prefixDisclaimer(translated: Translation) {
    if (translated.didCompile && INCOMPLETE_DISCLAIMER_COMPILING) {
      return `# ${INCOMPLETE_DISCLAIMER_COMPILING}\n${translated.source}`;
    }
    if (!translated.didCompile && INCOMPLETE_DISCLAIMER_NONCOMPILING) {
      return `# ${INCOMPLETE_DISCLAIMER_NONCOMPILING}\n${translated.source}`;
    }
    return translated.source;
  }

  public getPythonType(fqn: string): PythonType {
    const type = this.types.get(fqn);

    if (type === undefined) {
      throw new Error(`Could not locate type: "${fqn}"`);
    }

    return type;
  }

  protected getAssemblyOutputDir(assm: spec.Assembly) {
    return path.join('src', pythonModuleNameToFilename(this.getAssemblyModuleName(assm)));
  }

  protected onBeginAssembly(assm: spec.Assembly, _fingerprint: boolean) {
    this.package = new Package(
      this,
      assm.targets!.python!.distName,
      assm.version,
      assm,
    );

    // This is the '<package>._jsii' module
    const assemblyModule = new PythonModule(
      this.getAssemblyModuleName(assm),
      null,
      {
        assembly: assm,
        assemblyFilename: this.getAssemblyFileName(),
        loadAssembly: true,
        package: this.package,
      },
    );

    this.package.addModule(assemblyModule);
    this.package.addData(assemblyModule, this.getAssemblyFileName(), null);
  }

  protected onEndAssembly(_assm: spec.Assembly, _fingerprint: boolean) {
    const resolver = new TypeResolver(
      this.types,
      (fqn: string) => this.findModule(fqn),
      (fqn: string) => this.findType(fqn),
    );
    this.package.write(this.code, resolver);
  }

  protected onBeginNamespace(ns: string) {
    const module = new PythonModule(
      [
        this.assembly.targets!.python!.module,
        ...ns.split('.').slice(1)
          .map(toPythonIdentifier)
          .map(s => toSnakeCase(s))
      ].join('.'),
      ns,
      {
        assembly: this.assembly,
        assemblyFilename: this.getAssemblyFileName(),
        package: this.package,
      }
    );

    this.package.addModule(module);
    this.types.set(ns, module);
    if (ns === this.assembly.name) {
      // This applies recursively to submodules, so no need to duplicate!
      this.package.addData(module, 'py.typed', '');
    }
  }

  protected onBeginClass(cls: spec.ClassType, abstract: boolean | undefined) {
    const klass = new Class(
      this,
      toPythonIdentifier(cls.name),
      cls.fqn,
      {
        abstract,
        bases: cls.base ? [this.findType(cls.base)] : undefined,
        interfaces: cls.interfaces?.map(base => this.findType(base)),
        abstractBases: abstract ? this.getAbstractBases(cls) : [],
      },
      cls.docs,
    );

    if (cls.initializer !== undefined) {
      const { parameters = [] } = cls.initializer;

      klass.addMember(
        new Initializer(
          this,
          '__init__',
          undefined,
          parameters,
          undefined,
          cls.initializer.docs,
          { liftedProp: this.getliftedProp(cls.initializer), parent: cls },
        )
      );
    }

    this.addPythonType(klass);
  }

  protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
    const { parameters = [] } = method;

    this.getPythonType(cls.fqn).addMember(
      new StaticMethod(
        this,
        toPythonMethodName(method.name),
        method.name,
        parameters,
        method.returns,
        method.docs,
        { abstract: method.abstract, liftedProp: this.getliftedProp(method), parent: cls },
      )
    );
  }

  protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
    this.getPythonType(cls.fqn).addMember(
      new StaticProperty(
        this,
        toPythonPropertyName(prop.name, prop.const),
        prop.name,
        prop,
        prop.docs,
        { abstract: prop.abstract, immutable: prop.immutable, parent: cls },
      )
    );
  }

  protected onMethod(cls: spec.ClassType, method: spec.Method) {
    const { parameters = [] } = method;

    if (method.async) {
      this.getPythonType(cls.fqn).addMember(
        new AsyncMethod(
          this,
          toPythonMethodName(method.name, method.protected),
          method.name,
          parameters,
          method.returns,
          method.docs,
          { abstract: method.abstract, liftedProp: this.getliftedProp(method), parent: cls },
        )
      );
    } else {
      this.getPythonType(cls.fqn).addMember(
        new Method(
          this,
          toPythonMethodName(method.name, method.protected),
          method.name,
          parameters,
          method.returns,
          method.docs,
          { abstract: method.abstract, liftedProp: this.getliftedProp(method), parent: cls },
        )
      );
    }
  }

  protected onProperty(cls: spec.ClassType, prop: spec.Property) {
    this.getPythonType(cls.fqn).addMember(
      new Property(
        this,
        toPythonPropertyName(prop.name, prop.const, prop.protected),
        prop.name,
        prop,
        prop.docs,
        { abstract: prop.abstract, immutable: prop.immutable, parent: cls },
      )
    );
  }

  protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
    this.onProperty(cls, prop);
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {
    let iface: Interface | Struct;

    if (ifc.datatype) {
      iface = new Struct(
        this,
        toPythonIdentifier(ifc.name),
        ifc.fqn,
        { bases: ifc.interfaces?.map(base => this.findType(base)) },
        ifc.docs,
      );
    } else {
      iface = new Interface(
        this,
        toPythonIdentifier(ifc.name),
        ifc.fqn,
        { bases: ifc.interfaces?.map(base => this.findType(base)) },
        ifc.docs,
      );
    }

    this.addPythonType(iface);
  }

  protected onEndInterface(_ifc: spec.InterfaceType) { return; }

  protected onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method) {
    const { parameters = [] } = method;

    this.getPythonType(ifc.fqn).addMember(
      new InterfaceMethod(
        this,
        toPythonMethodName(method.name, method.protected),
        method.name,
        parameters,
        method.returns,
        method.docs,
        { liftedProp: this.getliftedProp(method), parent: ifc },
      )
    );
  }

  protected onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property) {
    let ifaceProperty: InterfaceProperty | StructField;

    if (ifc.datatype) {
      ifaceProperty = new StructField(this, prop, ifc);
    } else {
      ifaceProperty = new InterfaceProperty(
        this,
        toPythonPropertyName(prop.name, prop.const, prop.protected),
        prop.name,
        prop,
        prop.docs,
        { immutable: prop.immutable, parent: ifc },
      );
    }

    this.getPythonType(ifc.fqn).addMember(ifaceProperty);
  }

  protected onBeginEnum(enm: spec.EnumType) {
    this.addPythonType(new Enum(this, toPythonIdentifier(enm.name), enm.fqn, {}, enm.docs));
  }

  protected onEnumMember(enm: spec.EnumType, member: spec.EnumMember) {
    this.getPythonType(enm.fqn).addMember(
      new EnumMember(
        this,
        toPythonIdentifier(member.name),
        member.name,
        member.docs,
      )
    );
  }

  protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) {
    throw new Error('Unhandled Type: InterfaceMethodOverload');
  }

  protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
    throw new Error('Unhandled Type: MethodOverload');
  }

  protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
    throw new Error('Unhandled Type: StaticMethodOverload');
  }

  private getAssemblyModuleName(assm: spec.Assembly): string {
    return `${assm.targets!.python!.module}._jsii`;
  }

  private getParentFQN(fqn: string): string {
    const m = /^(.+)\.[^.]+$/.exec(fqn);

    if (m === null) {
      throw new Error(`Could not determine parent FQN of: ${fqn}`);
    }

    return m[1];
  }

  private getParent(fqn: string): PythonType {
    return this.getPythonType(this.getParentFQN(fqn));
  }

  private addPythonType(type: PythonType) {
    if (type.fqn === null) {
      throw new Error('Cannot add a Python type without a FQN.');
    }

    this.getParent(type.fqn).addMember(type);
    this.types.set(type.fqn, type);
  }

  private getliftedProp(method: spec.Method | spec.Initializer): spec.InterfaceType | undefined {
    // If there are parameters to this method, and if the last parameter's type is
    // a datatype interface, then we want to lift the members of that last paramter
    // as keyword arguments to this function.
    if (method.parameters?.length ?? 0 >= 1) {
      const lastParameter = method.parameters!.slice(-1)[0];
      if (!lastParameter.variadic && spec.isNamedTypeReference(lastParameter.type)) {
        const lastParameterType = this.findType(lastParameter.type.fqn);
        if (spec.isInterfaceType(lastParameterType) && lastParameterType.datatype) {
          return lastParameterType;
        }
      }
    }

    return undefined;
  }

  private getAbstractBases(cls: spec.ClassType): spec.ClassType[] {
    const abstractBases: spec.ClassType[] = [];

    if (cls.base !== undefined) {
      const base = this.findType(cls.base);

      if (!spec.isClassType(base)) {
        throw new Error("Class inheritence that isn't a class?");
      }

      if (base.abstract) {
        abstractBases.push(base);
      }
    }

    return abstractBases;
  }
}

/**
 * Positional argument or keyword parameter
 */
interface DocumentableArgument {
  name: string;
  docs?: spec.Docs;
}

/**
 * Render a one-line description of the given docs, used for method arguments and inlined properties
 */
function onelineDescription(docs: spec.Docs | undefined) {
  // Only consider a subset of fields here, we don't have a lot of formatting space
  if (!docs) { return '-'; }

  const parts = [];
  if (docs.summary) { parts.push(md2rst(docs.summary)); }
  if (docs.remarks) { parts.push(md2rst(docs.remarks)); }
  if (docs.default) { parts.push(`Default: ${md2rst(docs.default)}`); }
  return parts.join(' ').replace(/\s+/g, ' ');
}

function shouldMentionStability(s: Stability) {
  // Don't render "stable" or "external", those are both stable by implication.
  return s === Stability.Deprecated || s === Stability.Experimental;
}

function isStruct(typeSystem: reflect.TypeSystem, ref: spec.TypeReference): boolean {
  if (!spec.isNamedTypeReference(ref)) { return false; }
  const type = typeSystem.tryFindFqn(ref.fqn);
  return !!(type?.isInterfaceType() && type?.isDataType());
}
