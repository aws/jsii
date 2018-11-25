import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');
import { Generator, GeneratorOptions } from '../generator';
import { Target, TargetOptions } from '../target';
import { shell } from '../util';

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

    //
    // create module/namespace tree
    //

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

    for (const file of this.files) {
      this.code.line(`require_relative '${file}'`);
    }

    this.code.line(`puts "loaded ${this.gemName}"`);
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
  }

  protected onEndClass(cls: spec.ClassType) {
    this.code.closeBlock();
    this.code.closeBlock();
    this.code.closeFile(path.join('lib', this.toRubyFileName(cls)));
  }

  protected onBeginInterface(_ifc: spec.InterfaceType) { return; }
  protected onEndInterface(_ifc: spec.InterfaceType) { return; }
  protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) { return; }
  protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onInterfaceProperty(_ifc: spec.InterfaceType, _prop: spec.Property) { return; }
  protected onProperty(_cls: spec.ClassType, _prop: spec.Property) { return; }
  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) { return; }
  protected onUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _union: spec.UnionTypeReference) { return; }
  protected onMethod(_cls: spec.ClassType, _method: spec.Method) { return; }
  protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }
  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) { return; }
  protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) { return; }

  private toRubyFileName(type: spec.Type) {
    return this.code.toSnakeCase(type.name) + '.rb';
  }
}
