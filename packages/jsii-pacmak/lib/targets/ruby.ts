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
  private gemName: string;
  private rubyModule: string;

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
    if (!assm.targets || !assm.targets.ruby) {
      throw new Error(`No "ruby" target in jsii manifest`);
    }

    this.gemName = assm.targets.ruby.gem;
    this.rubyModule = assm.targets.ruby.module;

    if (!this.gemName) {
      throw new Error(`"ruby" jsii configuration is missing "gem"`);
    }

    if (!this.rubyModule) {
      throw new Error(`"ruby" jsii configuration is missing "module"`);
    }
  }

  protected onEndAssembly(assm: spec.Assembly, _fingerprint: boolean) {
    const rootFile = path.join('lib', `${this.gemName}.rb`);
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

    const gemSpec = `${this.gemName}.gemspec`;
    this.code.openFile(gemSpec);

    this.code.openBlock('Gem::Specification.new do |s|');
    this.code.line(`s.name = '${this.gemName}'`);
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
    const relativePath = path.join(this.gemName, this.toRubyFileName(cls));
    const filePath = path.join('lib', relativePath);
    this.code.openFile(filePath);
    this.files.push(relativePath);

    this.code.openBlock(`module ${this.rubyModule}`);
    this.code.openBlock(`class ${cls.name}`);

    if (cls.initializer) {
      this.code.openBlock(`def ${this.renderMethodSignature(cls.initializer, 'initialize')}`);
      const args = this.renderMethodInvokeArgs(cls.initializer);
      this.code.line(`@objref = Aws::Jsii::Runtime::instance.create(fqn: '${cls.fqn}', args: ${args})`);
      this.code.closeBlock();
    }
  }

  protected onEndClass(cls: spec.ClassType) {
    this.code.closeBlock();
    this.code.closeBlock();
    this.code.closeFile(path.join('lib', this.toRubyFileName(cls)));
  }

  protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
    const propName = this.toRubyName(prop.name);

    // getter
    this.code.openBlock(`def ${propName}`);
    this.code.line(`return Aws::Jsii::Serialization::from_jsii(Aws::Jsii::Runtime::instance.get(objref: @objref, property: '${prop.name}')['value'])`);
    this.code.closeBlock();

    // setter
    if (!prop.immutable) {
        this.code.openBlock(`def ${propName}=(val)`);
        this.code.line(`Aws::Jsii::Runtime::instance.set(objref: @objref, property: '${prop.name}', value: Aws::Jsii::Serialization::to_jsii(val))`)
        this.code.closeBlock();
    }
  }

  protected onBeginInterface(_ifc: spec.InterfaceType) { return; }
  protected onEndInterface(_ifc: spec.InterfaceType) { return; }
  protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) { return; }
  protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onInterfaceProperty(_ifc: spec.InterfaceType, _prop: spec.Property) { return; }
  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) { return; }
  protected onUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _union: spec.UnionTypeReference) { return; }
  protected onMethod(_cls: spec.ClassType, _method: spec.Method) { return; }
  protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) { return; }
  protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }

  private renderMethodSignature(method: spec.Method, name?: string) {
    const params = method.parameters || [];
    const methodName = this.toRubyName(name || method.name || '');
    if (!methodName) {
      throw new Error(`unexpected empty method name for method: ${JSON.stringify(method)}`);
    }
    let signature = methodName + '(';
    for (let i = 0 ; i < params.length; ++i) {
      const p = params[i];
      const paramName = this.toRubyName(p.name);
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
    let args = 'Aws::Jsii::Serialization::to_jsii([';
    for (let i = 0; i < params.length; ++i) {
      const p = params[i];
      const paramName = this.toRubyName(p.name);
      args += paramName;
      if (i < params.length - 1) {
        args += ', ';
      }
    }
    args += '])';
    return args;
  }

  private toRubyFileName(type: spec.Type) {
    return this.code.toSnakeCase(type.name) + '.rb';
  }

  private toRubyName(name: string) {
    return this.code.toSnakeCase(name);
  }

}
