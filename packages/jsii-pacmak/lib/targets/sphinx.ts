import fs = require('fs-extra');
import reflect = require('jsii-reflect');
import spec = require('jsii-spec');
import path = require('path');
import { Generator } from '../generator';
import { Target, TargetConstructor } from '../target';

export default class Sphinx extends Target {
  protected readonly generator = new SphinxDocsGenerator();

  public async build(sourceDir: string, outDir: string) {
    return this.copyFiles(sourceDir, outDir);
  }
}

// ##################
// # CODE GENERATOR #
// ##################

type NamespaceStackEntry = { name: string, underClass: boolean };

// Those MUST match what M2R uses (which is hard-coded in M2R), otherwise
// .. mdinclude: markdown files will produce inconsistent rendering.
const HMARKS = ['=', '-', '^', '~', '"', '#'];

class SphinxDocsGenerator extends Generator {
  private assemblyName?: string;
  private readonly namespaceStack = new Array<NamespaceStackEntry>();
  private tocPath = new Array<string>();
  private targets: { [name: string]: TargetConstructor } = {};

  private get topNamespace(): NamespaceStackEntry {
    return this.namespaceStack.length > 0
      ? this.namespaceStack[this.namespaceStack.length - 1]
      : { name: '', underClass: false };
  }

  public constructor() {
    super({ expandUnionProperties: false });

    this.code.openBlockFormatter = s => s || '';
    this.code.closeBlockFormatter = _ => '';
    this.code.indentation = 3;
  }

  public async load(packageRoot: string, assembly: reflect.Assembly) {
    await super.load(packageRoot, assembly);
    this.targets = await Target.findAll();
  }

  public async upToDate(outDir: string): Promise<boolean> {
    const mainFile = path.join(outDir, `${fsSafeName(this.assembly.name)}.rst`);
    try {
      if (!await fs.pathExists(mainFile)) { return false; }
      const data = await fs.readFile(mainFile, { encoding: 'utf-8' });
      const matches = /^\.\. @jsii-pacmak:meta@ (.+)$/m.exec(data);
      if (!matches) { return false; }
      const meta = JSON.parse(matches[1]);
      return meta.fingerprint === this.metadata.fingerprint;
    } catch {
      return false;
    }
  }

  //
  // Assembly

  protected getAssemblyOutputPath(_mod: spec.Assembly): string | undefined {
    return undefined;
  }

  protected onBeginAssembly(assm: spec.Assembly, fingerprint: boolean) {
    this.tocPath = new Array<string>(); // As a safety measure, in case previous assembly somehow didn't get it back to 0.

    const { readmeFile, readmeHeader } = this.emitReadme(assm);

    this.code.openFile(`${fsSafeName(assm.name)}.rst`);

    if (fingerprint) {
      this.code.line(`.. @jsii-pacmak:meta@ ${JSON.stringify(this.metadata)}`);
      this.code.line();
    }

    // use the readme header if defined or the assembly name otherwise
    this.openSection(readmeHeader || assm.name);
    this.code.line();

    if (readmeFile) {
      this.code.line(`.. mdinclude:: ./${readmeFile}`);
      this.code.line();
    }
    this.openSection('Reference');
    this.code.line();

    if (assm.targets) {
      this.code.openBlock('.. tabs::');
      this.code.line();
      for (const targetName of Object.keys(assm.targets).sort()) {
        const target = this.targets[targetName];
        if (!target || !target.toPackageInfos) { continue; }
        const packageInfos = target.toPackageInfos(assm);
        for (const language of Object.keys(packageInfos).sort()) {
          const packageInfo = packageInfos[language];
          this.code.openBlock(`.. group-tab:: ${formatLanguage(language)}`);
          this.code.line();

          this.code.line(`View in \`${packageInfo.repository} <${packageInfo.url}>\`_`);
          this.code.line();

          for (const mgrName of Object.keys(packageInfo.usage).sort()) {
            const mgr = packageInfo.usage[mgrName];
            this.code.line(`**${mgrName}**:`);
            this.code.line();
            if (typeof mgr === 'string') {
              this.code.openBlock('.. code-block:: none');
              this.code.line();
              mgr.split('\n').forEach(s => this.code.line(s));
              this.code.closeBlock();
            } else {
              this.code.openBlock(`.. code-block:: ${mgr.language}`);
              this.code.line();
              mgr.code.split('\n').forEach(s => this.code.line(s));
              this.code.closeBlock();
            }
          }

          this.code.closeBlock();
        }
      }
      this.code.closeBlock();
    }

    this.assemblyName = assm.name;
  }

  protected onEndAssembly(assm: spec.Assembly) {
    this.closeSection();
    this.code.closeFile(`${fsSafeName(assm.name)}.rst`);

    delete this.assemblyName;
  }

  //
  // Namespaces

  protected onBeginNamespace(ns: string) {
    const nativeName = this.toNativeFqn(ns);

    this.namespaceStack.push({ name: nativeName, underClass: this.topNamespace.underClass });

    if (nativeName !== this.assemblyName) {
      const assemblyPrefix = `${this.assemblyName}.`;
      const conciseName = nativeName.startsWith(assemblyPrefix)
        ? nativeName.slice(assemblyPrefix.length)
        : nativeName;

      if (!conciseName.includes('.')) {
        this.code.line();
        this.openSection(conciseName);
      }
    }

    this.code.line(`.. py:module:: ${nativeName}`);
    this.code.line();
  }

  protected onEndNamespace(ns: string) {
    this.namespaceStack.pop();

    const nativeName = this.toNativeFqn(ns);
    if (nativeName !== this.assemblyName) {
      const assemblyPrefix = `${this.assemblyName}.`;
      const conciseName = nativeName.startsWith(assemblyPrefix)
        ? nativeName.slice(assemblyPrefix.length)
        : nativeName;

      if (!conciseName.includes('.')) {
        this.closeSection();
      }
    } else {
      this.closeSection();
    }

    // set current module to the one at the tip of the stack
    if (this.namespaceStack.length > 0) {
      const curr = this.namespaceStack[this.namespaceStack.length - 1];
      this.code.line();
      this.code.line(`.. py:currentmodule:: ${curr.name}`);
      this.code.line();
    }
  }

  //
  // Classes

  protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
    const className = cls.name;

    if (!this.topNamespace.underClass) {
      this.openSection(className);
      this.code.line();
    }

    let sig = '';
    if (cls.initializer) {
      sig = this.renderMethodSignature(cls.initializer);
    }

    this.code.openBlock(`.. py:class:: ${className}${sig}`);
    this.renderNames(cls);
    this.renderDocsLine(cls);
    this.code.line();

    if (cls.base) {
      this.code.line(`:extends: ${this.renderTypeRef(this.findType(cls.base)).ref}`);
    }

    for (const ifc of cls.interfaces || []) {
      this.code.line(`:implements: ${this.renderTypeRef(this.findType(ifc)).ref}`);
    }

    if (abstract) {
      this.code.line(':abstract: Yes');
    }

    if (cls.initializer) {
      this.renderMethodParameters(cls.initializer);
    }

    this.namespaceStack.push({ name: className, underClass: true });
  }

  protected onEndClass(cls: spec.ClassType) {
    this.renderInheritedMembers(cls);
    this.code.closeBlock();
    this.namespaceStack.pop();
    if (!this.topNamespace.underClass) { this.closeSection(); }
  }

  //
  // Initializers (constructos)

  protected onInitializer(_cls: spec.ClassType, _method: spec.Method) {
    return;
  }

  protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, _originalInitializer: spec.Method) {
    this.onInitializer(cls, overload);
  }

  //
  // Properties

  protected onProperty(cls: spec.ClassType, prop: spec.Property) {
    this.renderProperty(cls, prop);
  }

  protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
    this.renderProperty(cls, prop);
  }

  //
  // Union Properties
  // Those are properties that can accept more than a single type (i.e. String | Token). If the option `expandUnionProperties` is enabled
  // instead of onUnionProperty, the method onExpandedUnionProperty will be called for each of the types defined in the property.
  // `primaryName` indicates the original name of the union property (without the 'AsXxx' postfix).

  protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
    this.onProperty(cls, prop);
  }

  protected onExpandedUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _primaryName: string) {
    throw new Error('Unexpected');
  }

  //
  // Methods
  // onMethodOverload is triggered if the option `generateOverloadsForMethodWithOptionals` is enabled for each overload of the original method.
  // The original method will be emitted via onMethod.

  protected onMethod(_cls: spec.ClassType, method: spec.Method) {
    this.renderMethod(method);
  }

  protected onMethodOverload(_cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
    this.renderMethod(overload);
  }

  protected onStaticMethod(_cls: spec.ClassType, method: spec.Method) {
    this.renderMethod(method);
  }

  protected onStaticMethodOverload(_cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
    this.renderMethod(overload);
  }

  //
  // Enums

  protected onBeginEnum(enm: spec.EnumType) {
    const enumName = enm.name;

    if (!this.topNamespace.underClass) {
      this.openSection(`${enumName} (enum)`);
      this.code.line();
    }

    this.code.openBlock(`.. py:class:: ${enumName}`);
    this.renderNames(enm);
    this.renderDocsLine(enm);
    this.code.line();
  }

  protected onEndEnum(_enm: spec.EnumType) {
    this.code.closeBlock();
    if (!this.topNamespace.underClass) { this.closeSection(); }
  }

  protected onEnumMember(_enm: spec.EnumType, member: spec.EnumMember) {
    this.code.line(`.. py:data:: ${member.name}`);
    this.renderDocsLine(member);
    this.code.line();
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {
    if (!this.topNamespace.underClass) {
      this.openSection(`${ifc.name} (interface)`);
      this.code.line();
    }

    this.code.openBlock(`.. py:class:: ${ifc.name}`);
    this.renderNames(ifc);
    this.renderDocsLine(ifc);
    this.code.line();

    for (const base of ifc.interfaces || []) {
      this.code.line(`:extends: ${this.renderTypeRef(this.findType(base)).ref}`);
    }

    this.code.line();
  }

  protected onEndInterface(ifc: spec.InterfaceType) {
    this.renderInheritedMembers(ifc);
    this.code.closeBlock();
    if (!this.topNamespace.underClass) { this.closeSection(); }
  }

  protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
    this.renderMethod(method);
  }

  protected onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, _originalMethod: spec.Method) {
    this.onInterfaceMethod(ifc, overload);
  }

  protected onInterfaceProperty(ifc: spec.InterfaceType, property: spec.Property) {
    this.renderProperty(ifc, property);
  }

  private renderInheritedMembers(entity: spec.ClassType | spec.InterfaceType) {
    const inherited = this.getInheritedMembers(entity);
    if (Object.keys(inherited).length === 0) { return; }
    for (const source of Object.keys(inherited).sort()) {
      const entities = inherited[source];
      for (const method of entities.methods) {
        this.renderMethod(method, source);
        for (const overload of this.createOverloadsForOptionals(method)) {
          this.renderMethod(overload, source);
        }
      }
      for (const property of entities.properties) {
        this.renderProperty(entity, property, source);
      }
    }
  }

  private getInheritedMembers(entity: spec.ClassType | spec.InterfaceType): InheritedMembers {
    const parents = parentTypes.call(this, entity);
    const knownMembers = new Set<string>([
      ...(entity.methods || []).map(m => m.name),
      ...(entity.properties || []).map(p => p.name)
    ]);
    const result: InheritedMembers = {};
    for (const parent of parents) {
      const parentType = this.findType(parent.fqn) as spec.ClassType | spec.InterfaceType;
      for (const method of parentType.methods || []) {
        if (method.static || knownMembers.has(method.name)) { continue; }
        result[parentType.fqn] = result[parentType.fqn] || { methods: [], properties: [] };
        result[parentType.fqn].methods.push(method);
        knownMembers.add(method.name);
      }
      for (const property of parentType.properties || []) {
        if (property.static || knownMembers.has(property.name)) { continue; }
        result[parentType.fqn] = result[parentType.fqn] || { methods: [], properties: [] };
        result[parentType.fqn].properties.push(property);
        knownMembers.add(property.name);
      }
      for (const superType of parentTypes.call(this, parentType)) {
        parents.push(superType);
      }
    }
    return result;

    function parentTypes(this: SphinxDocsGenerator, type: spec.ClassType | spec.InterfaceType) {
      const types = new Array<spec.NamedTypeReference>();
      if (spec.isClassType(type) && type.base) {
        types.push(this.findType(type.base));
      }
      if (type.interfaces) {
        types.push(...type.interfaces.map(fqn => this.findType(fqn)));
      }
      return types;
    }
  }

  /**
     * Adds a title to the current code file, using the appropriate header
     * adornment given the current TOC depth. It will start using simple
     * underline adornment, and once all underline markers have been used,
     * over-and-underline adornments will be used. Increments the TOC depth
     * after having generated the title.
     *
     * @param title the text for the title line to be redenred.
     *
     * @throws if an attempt to render a title is made when all possible
     *         adornments have already been used once.
     */
  private openSection(title: string) {
    if (this.tocPath.length >= 2 * HMARKS.length) {
      throw new Error(`Unable to open a section ${this.tocPath.length + 1} levels deep. (${this.tocPath.join(' > ')})`);
    }
    const headerLine = dup(HMARKS[this.tocPath.length % HMARKS.length], title.length);
    if (this.tocPath.length >= HMARKS.length) {
      this.code.line(headerLine);
    }
    this.code.line(title);
    this.code.line(headerLine);

    this.tocPath.push(title);
  }

  /**
     * Closes a titled section, decrementing +this.tocDepth+.
     */
  private closeSection() {
    this.tocPath.pop();
  }

  private renderMethodSignature(method: spec.Method | spec.Initializer) {
    const params = method.parameters || [];
    let signature = '(';
    let signaturePosfix = '';

    params.forEach((p, idx) => {
      if (idx > 0) {
        signature += ', ';
      }

      // Mark parameter as "optional" if it's type is optional, and all subsequent parameters are optional/variadic
      if (p.optional) {
        signature += '[';
        signaturePosfix += ']';
      }
      if (p.variadic) {
        signature += '*';
      }

      signature += p.name;
    });

    signature += signaturePosfix;
    signature += ')';

    if (spec.isMethod(method) && method.returns) {
      const retType = this.renderOptionalValue(method.returns);
      const retSignature = method.returns ? ` -> ${retType.display}` : '';
      signature += retSignature;
    }

    return signature;
  }

  private renderMethodParameters(method: spec.Method | spec.Initializer) {
    const params = method.parameters || [];

    for (const p of params) {
      const ptype = this.renderTypeRef(p.type);
      const paramName = `${p.variadic ? '\\*' : ''}${p.name}`;
      this.code.line(`:param ${paramName}: ${this.renderDocs(p)}`);
      this.code.line(`:type ${paramName}: ${ptype.ref}`);
    }
  }

  private renderMethod(method: spec.Method, inheritedFrom?: string) {
    const signature = this.renderMethodSignature(method);

    const type = method.static ? 'py:staticmethod' : 'py:method';

    this.code.line();
    this.code.openBlock(`.. ${type}:: ${method.name}${signature}`);

    if (inheritedFrom) {
      this.code.line();
      this.code.line(`*Inherited from* :py:meth:\`${inheritedFrom} <${inheritedFrom}.${method.name}>\``);
    } else if (method.overrides) {
      this.code.line();
      const superType = this.findType(method.overrides) as spec.ClassType | spec.InterfaceType;
      if (spec.isInterfaceType(superType) || superType.methods!.some(m => m.name === method.name && !!m.abstract)) {
        this.code.line(`*Implements* :py:meth:\`${method.overrides}.${method.name}\``);
      } else {
        this.code.line(`*Overrides* :py:meth:\`${method.overrides}.${method.name}\``);
      }
    }
    this.renderDocsLine(method);
    this.code.line();
    if (method.protected) {
      this.code.line('*Protected method*');
      this.code.line();
    }

    this.renderMethodParameters(method);

    // @return doc
    if (method.docs && method.docs.returns) {
      const [firstLine, ...rest] = method.docs.returns.split('\n');
      this.code.line(`:return: ${firstLine}`);
      rest.forEach(line => this.code.line(`   ${line}`));
    }

    if (method.returns) {
      this.code.line(`:rtype: ${this.renderOptionalValue(method.returns).ref}`);
    }

    if (method.abstract) {
      this.code.line(':abstract: Yes');
    }

    this.code.closeBlock();
  }

  private renderDocsLine(element: spec.Documentable) {
    const doclines = this.renderDocs(element, true);
    if (doclines.length === 0) {
      return;
    }

    this.code.line();
    doclines.split('\n').forEach(line => this.code.line(`${line}\n`));

    if (element.docs && element.docs.see) {
      this.code.line(element.docs.see);
    }

    this.code.line();
  }

  private renderDocs(element: spec.Documentable, newlines = false): string {
    if (!element.docs) {
      return '';
    }

    const lines = new Array<string>();
    if (element.docs.summary) {
      lines.push(element.docs.summary);
    }
    if (element.docs.remarks) {
      lines.push('');
      lines.push(element.docs.remarks);
    }

    if (newlines) {
      return lines.join('\n');
    }
    return lines.join('. ').replace(/\n/g, ' ');

  }

  private renderOptionalValue(optionalValue: spec.OptionalValue): { display: string, ref: string } {
    const result = this.renderTypeRef(optionalValue.type);
    if (optionalValue.optional && !isAny(optionalValue.type)) {
      result.ref = `${result.ref} *(optional)*`;
    }
    return result;

    function isAny(type: spec.TypeReference): boolean {
      return spec.isPrimitiveTypeReference(type)
                && type.primitive === spec.PrimitiveType.Any;
    }
  }

  private renderTypeRef(type: spec.TypeReference): { display: string, ref: string } {
    let result: { display: string, ref: string };
    if (spec.isNamedTypeReference(type)) {
      const fqn = this.toNativeFqn(type.fqn);
      result = {
        ref: `:py:class:\`${type.fqn.startsWith(`${this.assembly.name}.`) ? '~' : ''}${fqn}\`\\ `,
        display: fqn
      };
    } else if (spec.isPrimitiveTypeReference(type)) {
      result = {
        ref: type.primitive,
        display: type.primitive
      };
    } else if (spec.isCollectionTypeReference(type)) {
      const elementType = this.renderTypeRef(type.collection.elementtype);
      const ref = wrap(elementType.ref);
      const display = wrap(elementType.display);

      switch (type.collection.kind) {
        case spec.CollectionKind.Array:
          result = {
            ref: `${ref}[]`,
            display: `${display}[]`
          };
          break;
        case spec.CollectionKind.Map:
          result = {
            ref: `string => ${ref}`,
            display: `string => ${display}`
          };
          break;
        default:
          throw new Error(`Unexpected collection kind: ${type.collection.kind}`);
      }
    } else if (spec.isUnionTypeReference(type)) {
      const mappedTypes = type.union.types.map(t => this.renderTypeRef(t));
      result = {
        display: mappedTypes.map(t => t.display).join(' or '),
        ref: mappedTypes.map(t => t.ref).join(' or '),
      };
    } else {
      throw new Error('Unexpected type ref');
    }
    return result;

    // Wrap a string between parenthesis if it contains " or "
    function wrap(str: string): string {
      if (!str.includes(' or ')) { return str; }
      return `(${str})`;
    }
  }

  private renderProperty(parent: spec.TypeBase, prop: spec.Property, inheritedFrom?: string) {
    this.code.line();
    const type = this.renderOptionalValue(prop);
    this.code.openBlock(`.. py:attribute:: ${prop.name}`);
    if (inheritedFrom) {
      this.code.line();
      this.code.line(`*Inherited from* :py:attr:\`${inheritedFrom} <${inheritedFrom}.${prop.name}>\``);
    } else if (prop.overrides) {
      this.code.line();
      const superType = this.findType(prop.overrides) as spec.ClassType | spec.InterfaceType;
      if (spec.isInterfaceType(superType) || superType.properties!.some(p => p.name === prop.name && !!p.abstract)) {
        this.code.line(`*Implements* :py:meth:\`${prop.overrides}.${prop.name}\``);
      } else {
        this.code.line(`*Overrides* :py:attr:\`${prop.overrides}.${prop.name}\``);
      }
    }
    this.renderDocsLine(prop);
    this.code.line();
    if (prop.protected) {
      this.code.line('*Protected property*');
      this.code.line();
    }
    const readonly = prop.immutable ? ' *(readonly)*' : '';
    const abs = parent.kind !== spec.TypeKind.Interface && prop.abstract ? ' *(abstract)*' : '';
    const stat = prop.static ? ' *(static)*' : '';
    this.code.line(`:type: ${type.ref}${readonly}${abs}${stat}`);

    if (prop.docs && prop.docs.default) {
      this.code.line(`:default: ${prop.docs.default}`);
    }

    this.code.closeBlock();
  }

  private toNativeFqn(name: string): string {
    return name;
  }

  private renderNames(type: spec.Type) {
    this.code.line();
    this.code.line('**Language-specific names:**');
    this.code.line();
    this.code.openBlock('.. tabs::');
    this.code.line();

    if (this.assembly.targets) {
      for (const targetName of Object.keys(this.assembly.targets).sort()) {
        if (targetName === 'sphinx') { continue; }
        const target = this.targets[targetName];
        if (!target || !target.toNativeReference) { continue; }
        const options = this.assembly.targets[targetName];

        const names = target.toNativeReference(type, options);
        for (const language of Object.keys(names).sort()) {
          this.code.openBlock(`.. code-tab:: ${language}`);
          this.code.line();
          this.code.line(names[language]);
          this.code.closeBlock();
        }
      }
    }
    this.code.closeBlock();
  }

  /**
     * Emits the README markdown file, while stripping off the first H1 header (if exists).
     * @returns readme: the name of the file (or undefined)
     * @returns header: the contents of the header (or undefined)
     */
  private emitReadme(assm: spec.Assembly): { readmeFile?: string, readmeHeader?: string } {
    if (!assm.readme) {
      return {
        readmeFile: undefined,
        readmeHeader: undefined
      };
    }

    let lines = assm.readme.markdown.split('\n');
    let readmeHeader;

    if (lines[0].startsWith('# ')) {
      readmeHeader = lines[0].substr(2);
      lines = lines.slice(1);
    }

    const readmeFile = `_${fsSafeName(assm.name)}.README.md`;
    this.code.openFile(readmeFile);
    this.code.line(lines.join('\n'));
    this.code.closeFile(readmeFile);

    return {
      readmeFile,
      readmeHeader
    };
  }
}

function dup(char: string, times: number) {
  let ret = '';
  for (let i = 0; i < times; ++i) {
    ret += char;
  }
  return ret;
}

/**
 * Make a name safe for the file system
 */
function fsSafeName(x: string) {
  // Strip unsafe characters
  return x.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

/**
 * Obtains a display-friendly string from a language name.
 *
 * @param language the language name code (e.g: javascript)
 *
 * @returns a display-friendly name if possible (e.g: JavaScript)
 */
function formatLanguage(language: string): string {
  switch (language) {
    case 'csharp':
      return 'C#';
    case 'java':
      return 'Java';
    case 'javascript':
      return 'JavaScript';
    case 'typescript':
      return 'TypeScript';
    default:
      return language;
  }
}

type InheritedMembers = { [typeFqn: string]: { methods: spec.Method[], properties: spec.Property[] } };
