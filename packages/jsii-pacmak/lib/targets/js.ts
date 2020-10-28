import * as spec from '@jsii/spec';

import { Generator } from '../generator';
import { PackageInfo, Target } from '../target';
import { toReleaseVersion } from './version-utils';

import { TargetName } from '.';

export default class JavaScript extends Target {
  public static toPackageInfos(
    assm: spec.Assembly,
  ): { [language: string]: PackageInfo } {
    const releaseVersion = toReleaseVersion(
      assm.version,
      TargetName.JAVASCRIPT,
    );

    const packageInfo: PackageInfo = {
      repository: 'NPM',
      url: `https://www.npmjs.com/package/${assm.name}/v/${releaseVersion}`,
      usage: {
        'package.json': {
          language: 'js',
          code: JSON.stringify({ [assm.name]: `^${releaseVersion}` }, null, 2),
        },
        npm: {
          language: 'console',
          code: `$ npm i ${assm.name}@${releaseVersion}`,
        },
        yarn: {
          language: 'console',
          code: `$ yarn add ${assm.name}@${releaseVersion}`,
        },
      },
    };
    return { typescript: packageInfo, javascript: packageInfo };
  }

  public static toNativeReference(type: spec.Type) {
    const [, ...name] = type.fqn.split('.');
    const resolvedName = name.join('.');
    const result: { typescript: string; javascript?: string } = {
      typescript: `import { ${resolvedName} } from '${type.assembly}';`,
    };
    if (!spec.isInterfaceType(type)) {
      result.javascript = `const { ${resolvedName} } = require('${type.assembly}');`;
    } else {
      result.javascript = `// ${resolvedName} is an interface`;
    }
    return result;
  }

  protected readonly generator = new PackOnly();

  public async build(sourceDir: string, outDir: string) {
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

  protected onBeginInterface(_ifc: spec.InterfaceType) {
    return;
  }
  protected onEndInterface(_ifc: spec.InterfaceType) {
    return;
  }
  protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) {
    return;
  }
  protected onInterfaceMethodOverload(
    _ifc: spec.InterfaceType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    return;
  }
  protected onInterfaceProperty(
    _ifc: spec.InterfaceType,
    _prop: spec.Property,
  ) {
    return;
  }
  protected onProperty(_cls: spec.ClassType, _prop: spec.Property) {
    return;
  }
  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) {
    return;
  }
  protected onUnionProperty(
    _cls: spec.ClassType,
    _prop: spec.Property,
    _union: spec.UnionTypeReference,
  ) {
    return;
  }
  protected onMethod(_cls: spec.ClassType, _method: spec.Method) {
    return;
  }
  protected onMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    return;
  }
  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) {
    return;
  }
  protected onStaticMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    return;
  }
}
