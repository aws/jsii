import * as spec from 'jsii-spec';
import { Generator } from '../generator';
import { Target } from '../target';

export default class Ruby extends Target {
  protected readonly generator = new PackOnly();

  public async build(sourceDir: string, outDir: string) {
    // TODO: "gem build"
    return this.copyFiles(sourceDir, outDir);
  }
}

// ##################
// # CODE GENERATOR #
// ##################

class PackOnly extends Generator {

  protected getAssemblyOutputDir(_mod: spec.Assembly) {
    return '.';
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
}
