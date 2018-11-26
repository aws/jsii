import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');
import { Generator, GeneratorOptions } from '../generator';
import { Target, TargetOptions } from '../target';
import { shell } from '../util';

// tslint:disable:max-line-length

export default class Ruby extends Target {
  protected readonly generator = new RubyGenerator();

  constructor(options: TargetOptions) {
    super(options);
  }

  public async build(sourceDir: string, outdir: string) {
    const files = await fs.readdir(sourceDir);
    const gemSpecs = files.filter(x => x.endsWith('.gemspec'));
    if (gemSpecs.length !== 1) {
      throw new Error(`Expecting a single .gemspec file in generated source: ${sourceDir}. Found ${gemSpecs.length} .gemspec file(s)`);
    }

    await shell('gem', [ 'build', gemSpecs[0] ], { cwd: sourceDir });

    const gems = (await fs.readdir(sourceDir)).filter(x => x.endsWith('.gem'));
    if (gems.length !== 1) {
      throw new Error(`Expecting a single .gem file after "gem build". Found: ${gems}`);
    }

    const outputFileName = gems[0];

    await fs.mkdirp(outdir);
    await fs.move(path.join(sourceDir, outputFileName), path.join(outdir, outputFileName), {
      overwrite: true
    });
  }
}

// ##################
// # CODE GENERATOR #
// ##################

class RubyGenerator extends Generator {
  private files = new Array<string>();

  private rubyGem: string;
  private rubyModule: string;

  private currentClassRelativeRequires?: Set<string>;
  private currentClassRequires?: Set<string>;

  constructor(options?: GeneratorOptions) {
    super(options);

    this.code.openBlockFormatter = s => s || '';
    this.code.closeBlockFormatter = _ => 'end';
    this.code.indentation = 2;
  }

  protected getAssemblyOutputDir(_mod: spec.Assembly) {
    return '.';
  }

  protected onBeginAssembly(assm: spec.Assembly, _fingerprint: boolean) {
    const { rubyGem, rubyModule } = this.parseRubyTarget(assm.targets);
    this.rubyGem = rubyGem;
    this.rubyModule = rubyModule;
  }

  protected onEndAssembly(assm: spec.Assembly, _fingerprint: boolean) {
    const rootFile = path.join('lib', `${this.rubyGem}.rb`);
    this.code.openFile(rootFile);

    this.code.line(`require 'jsii_runtime'`);

    this.code.line();
    this.code.line(`# dependent modules`);

    // require all dependencies
    for (const name of Object.keys(assm.dependencies || {})) {
      const dep = assm.dependencies![name];
      if (!dep.targets || !dep.targets.ruby) {
        throw new Error(`No ruby target for dependency ${name}`);
      }

      const gem = dep.targets.ruby.gem;
      if (!gem) {
        throw new Error(`No ruby "gem" for dependency ${gem}`);
      }

      this.code.line(`require '${gem}'`);
    }

    this.code.line();
    this.code.line(`# define module`);

    const moduleComponents = this.rubyModule.split('::');
    for (const m of moduleComponents) {
      this.code.openBlock(`module ${m}`);
    }

    this.code.openBlock('def self.name');
    this.code.line(`'${assm.name}'`);
    this.code.closeBlock();

    this.code.openBlock('def self.version');
    this.code.line(`'${assm.version}'`);
    this.code.closeBlock();

    this.code.openBlock('def self.tarball');
    this.code.line(`File.join(File.dirname(__FILE__), '..', '${this.getAssemblyFileName()}')`);
    this.code.closeBlock();

    for (const _ of moduleComponents) {
      this.code.closeBlock();
    }

    // load module to runtime
    this.code.line();
    this.code.line(`# load jsii module to jsii runtime`);
    // tslint:disable-next-line:max-line-length
    this.code.line(`Aws::Jsii::Runtime::instance::load(name: ${this.rubyModule}::name, version: ${this.rubyModule}::version, tarball: ${this.rubyModule}::tarball)`);

    this.code.line();
    this.code.line(`# export all types from this module`);
    for (const file of this.files) {
      this.code.line(`require_relative '${file}'`);
    }

    this.code.closeFile(rootFile);

    const gemSpec = `${this.rubyGem}.gemspec`;
    this.code.openFile(gemSpec);

    this.code.openBlock('Gem::Specification.new do |s|');
    this.code.line(`s.name = '${this.rubyGem}'`);
    this.code.line(`s.summary = '${assm.description}'`);
    this.code.line(`s.homepage = '${assm.homepage}'`);
    this.code.line(`s.version = '${assm.version}'`);
    this.code.line(`s.license = '${assm.license}'`);
    this.code.line(`s.author = '${assm.author.name}'`);
    this.code.line(`s.files = Dir['lib/**/**']`);
    this.code.line(`s.files << '${this.getAssemblyFileName()}'`);
    this.code.line(`s.require_paths = [ 'lib' ]`);
    this.code.line(`s.required_ruby_version = '>= 2.2'`);

    const runtimeVersion = require('jsii-ruby-runtime/package.json').version;
    this.code.line(`s.add_dependency 'jsii_runtime', '${runtimeVersion}'`);
    this.code.closeBlock();

    this.code.closeFile(gemSpec);
  }

  protected onBeginClass(cls: spec.ClassType, _abstract: boolean | undefined) {
    this.currentClassRequires = new Set<string>();
    this.currentClassRelativeRequires = new Set<string>();

    this.openFileForType(cls);

    this.code.line(`require_relative '${this.toRubyDepsFileName(cls)}'`);

    const baseClass = cls.base ? this.toRubyReference(cls.base) : 'Aws::Jsii::JsiiObject';
    const className = this.toRubyTypeName(cls.name);

    this.code.openBlock(`class ${className} < ${baseClass}`);

    if (cls.initializer) {
      this.code.openBlock(`def ${this.renderMethodSignature(cls.initializer, 'initialize')}`);
      const args = this.renderMethodInvokeArgs(cls.initializer);
      this.code.line(`objref = _jsii_create(fqn: '${cls.fqn}', args: ${args})`);
      this.code.closeBlock();
    }

    // annotate this class as a generated class so we can determine overrides
    this.code.openBlock(`def self._jsii_generated`);
    this.code.line(`true`);
    this.code.closeBlock();

    //
    // this.code.openBlock(`def _jsii_overrides`);
    // this.code.line(`overrides = super`);
    //
    // for (const method of cls.methods || []) {
    //   const methodName = this.toRubyMemberName(method.name!);
    //   this.code.openBlock(`if ${className}.respond_to?('${methodName}')`);
    //   this.code.line(`overrides << { 'method' => '${method.name}' }`);
    //   this.code.closeBlock();
    // }
    //
    // this.code.line(`return overrides`);
    // this.code.closeBlock();
  }

  protected onEndClass(cls: spec.ClassType) {
    this.code.closeBlock(); // class

    const className = this.toRubyTypeName(cls.name);
    this.code.line(`Aws::Jsii::Runtime::instance.map_fqn('${cls.fqn}', ${className})`);

    for (const method of cls.methods || []) {
      const methodName = this.toRubyMemberName(method.name!);
      this.code.line(`${className}::_jsii_map_method('${methodName}', '${method.name}')`);
    }

    for (const prop of cls.properties || []) {
      const propName = this.toRubyMemberName(prop.name);
      this.code.line(`${className}::_jsii_map_property('${propName}', '${prop.name}')`);
    }

    this.closeFileForType(cls);

    const depsFile = path.join('lib', path.join(this.rubyGem, this.toRubyDepsFileName(cls)));
    this.code.openFile(depsFile);
    this.code.line(`# dependencies for ${this.toRubyFileName(cls)}`);

    if (!this.currentClassRequires || !this.currentClassRelativeRequires) {
      throw new Error(`Unexpected: not in class context?`);
    }

    for (const rr of this.currentClassRelativeRequires) {
      this.code.line(`require_relative '${rr}'`);
    }

    for (const r of this.currentClassRequires) {
      this.code.line(`require '${r}'`);
    }

    this.code.closeFile(depsFile);
    this.currentClassRequires = undefined;
    this.currentClassRelativeRequires = undefined;
  }

  protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
    const propName = this.toRubyMemberName(prop.name);

    // getter
    this.code.openBlock(`def ${propName}`);
    this.code.line(`return _jsii_get(property: '${prop.name}')`)
    this.code.closeBlock();

    // setter
    if (!prop.immutable) {
        this.code.openBlock(`def ${propName}=(val)`);
        this.code.line(`_jsii_set(property: '${prop.name}', value: val)`);
        this.code.closeBlock();
    }
  }

  protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
    this.onProperty(cls, prop);
  }

  protected onMethod(_cls: spec.ClassType, method: spec.Method) {
    this.code.openBlock(`def ${this.renderMethodSignature(method)}`);
    const args = this.renderMethodInvokeArgs(method);

    if (method.returns && method.returns.promise) {
      this.code.line(`_jsii_async_invoke(method: '${method.name}', args: ${args})`);
    } else {
      this.code.line(`_jsii_invoke(method: '${method.name}', args: ${args})`);
    }

    this.code.closeBlock();
  }

  protected onBeginEnum(enm: spec.EnumType) {
    this.openFileForType(enm);

    const fqnMap: { [fqn: string]: string } = { };

    const enumName = this.toRubyTypeName(enm.name);
    this.code.openBlock(`class ${enumName} < Aws::Jsii::JsiiEnum`);

    for (const member of enm.members) {
      const memberName = this.code.toSnakeCase(member.name).toLocaleUpperCase();
      const fqn = `${enm.fqn}/${member.name}`;
      const friendlyName = `${enumName}::${memberName}`;
      this.code.line(`${memberName} = ${enumName}.new('${fqn}', '${friendlyName}')`);

      fqnMap[fqn] = `${enumName}::${memberName}`;
    }

    this.code.closeBlock(); // enum

    // now add to map
    for (const fqn of Object.keys(fqnMap)) {
      const member = fqnMap[fqn];
      this.code.line(`Aws::Jsii::Runtime::instance.map_fqn('${fqn}', ${member})`);
    }

    this.closeFileForType(enm);
  }

  protected onEnumMember(_enm: spec.EnumType, _member: spec.EnumMember) {
    return; // covered in onBeginEnum
  }

  protected onEndEnum(enm: spec.EnumType) {
    return; // covered in onBeginEnum
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {

    if (ifc.datatype) {
      this.emitDataType(ifc);
    }
  }

  protected onEndInterface(ifc: spec.InterfaceType) {
    return;
  }

  protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) { return; }
  protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onInterfaceProperty(_ifc: spec.InterfaceType, _prop: spec.Property) { return; }

  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) { return; }
  protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) { return; }
  protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }

  private emitDataType(type: spec.InterfaceType) {
    this.openFileForType(type);

    const className = this.toRubyTypeName(type.name);

    this.code.openBlock(`module ${className}`);
    this.code.openBlock(`def self.to_jsii(hash)`);
    this.code.line(`return nil if hash.nil?`);
    this.code.line(`hash_copy = hash.clone`);
    this.code.line(`ret = {}`);

    for (const prop of type.properties || []) {
      const propName = this.toRubyMemberName(prop.name);
      this.code.openBlock(`if not hash_copy['${propName}'.to_sym].nil?`);
      this.code.line(`ret['${prop.name}'] = hash_copy['${propName}'.to_sym]`);
      this.code.line(`hash_copy.delete('${propName}'.to_sym)`);
      this.code.closeBlock();
    }

    this.code.openBlock(`if not hash_copy.empty?`);
    this.code.line(`raise "Unrecognized properties #{hash_copy.keys} for data interface ${className}"`);
    this.code.closeBlock();

    this.code.line(`return ret`);
    this.code.closeBlock();
    this.code.closeBlock();

    this.closeFileForType(type);
  }

  private renderMethodSignature(method: spec.Method, name?: string) {
    const params = method.parameters || [];
    const methodName = this.toRubyMemberName(name || method.name || '');
    if (!methodName) {
      throw new Error(`unexpected empty method name for method: ${JSON.stringify(method)}`);
    }
    let signature = methodName + '(';
    for (let i = 0 ; i < params.length; ++i) {
      const p = params[i];
      const paramName = this.toRubyMemberName(p.name);
      if (p.variadic) {
        signature += `*`;
      }
      signature += paramName;
      if (p.type.optional) {
        signature += ` = nil`;
      }
      if (i < params.length - 1) {
        signature += ', ';
      }
    }
    signature += ')';
    return signature;
  }

  private renderMethodInvokeArgs(method: spec.Method) {
    const params = method.parameters || [];
    let args = '[';
    for (let i = 0; i < params.length; ++i) {
      const p = params[i];
      let paramName = this.toRubyMemberName(p.name);

      if (spec.isNamedTypeReference(p.type)) {
        const targetType = this.findType(p.type.fqn);
        if (spec.isInterfaceType(targetType)) {
          if (targetType.datatype) {
            const dataTypeName = this.toRubyReference(targetType);
            paramName = `${dataTypeName}::to_jsii(${paramName})`;
          }
        }
      }

      args += paramName;
      if (i < params.length - 1) {
        args += ', ';
      }
    }
    args += ']';
    return args;
  }

  private openFileForType(type: spec.Type) {
    if (this.isNested(type)) {
        return;
    }

    const relativePath = path.join(this.rubyGem, this.toRubyFileName(type));
    const filePath = path.join('lib', relativePath);
    this.code.openFile(filePath);
    this.files.push(relativePath);

    // open root module
    this.code.openBlock(`module ${this.rubyModule}`);
  }

  private closeFileForType(type: spec.Type) {
    if (this.isNested(type)) {
        return;
    }

    // close root module
    this.code.closeBlock();

    const relativePath = path.join(this.rubyGem, this.toRubyFileName(type));
    const filePath = path.join('lib', relativePath);
    this.code.closeFile(filePath);
  }

  private toRubyFileName(type: spec.Type) {
    return this.code.toSnakeCase(type.name) + '.rb';
  }

  private toRubyDepsFileName(type: spec.Type) {
    return this.code.toSnakeCase(type.name) + '.deps.rb';
  }

  private toRubyMemberName(name: string) {
    return this.code.toSnakeCase(name);
  }

  private toRubyTypeName(name: string) {
    return name;
  }

  private toRubyReference(ref: spec.NamedTypeReference) {
    const type = this.findType(ref.fqn);
    const mod = this.findModule(type.assembly);
    const { rubyGem, rubyModule } = this.parseRubyTarget(mod.targets);

    if (!this.currentClassRelativeRequires || !this.currentClassRequires) {
      throw  new Error(`Unexpected: trying to reference outside of a class context`);
    }

    if (rubyModule === this.rubyModule) {
      this.currentClassRelativeRequires.add(this.toRubyFileName(type));
    } else {
      this.currentClassRequires.add(rubyGem);
    }

    return `${rubyModule}::${this.toRubyTypeName(type.name)}`;
  }

  private parseRubyTarget(targets?: { [key: string]: any }) {
    if (!targets || !targets.ruby) {
      throw new Error(`No "ruby" target`);
    }

    const rubyGem = targets.ruby.gem;
    const rubyModule = targets.ruby.module;

    if (!rubyGem) {
      throw new Error(`"ruby" jsii configuration is missing "gem"`);
    }

    if (!rubyModule) {
      throw new Error(`"ruby" jsii configuration is missing "module"`);
    }

    return { rubyGem, rubyModule };
  }

}
