import { CodeMaker, toCamelCase, toPascalCase } from 'codemaker';
import { Type } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import { GoClass } from './class';
import { GoInterface } from './interface';

export abstract class GoType {
  public readonly name: string;
  public readonly fqn: string;
  public readonly proxyName: string;

  public constructor(public pkg: Package, public type: Type) {
    this.name = toPascalCase(type.name);
    // add "_jsiiClass" postfix to private struct name to avoid keyword
    // conflicts such as "default". see https://github.com/aws/jsii/issues/2637
    this.proxyName = `${toCamelCase(type.name)}_jsiiClass`;
    this.fqn = type.fqn;
  }

  public abstract emit(context: EmitContext): void;

  public abstract emitRegistration(code: CodeMaker): void;

  public abstract get dependencies(): Package[];
  public abstract get usesInitPackage(): boolean;
  public abstract get usesRuntimePackage(): boolean;

  public get namespace() {
    return this.pkg.packageName;
  }

  public emitDocs(context: EmitContext): void {
    context.documenter.emit(this.type.docs);
  }

  protected emitStability(context: EmitContext): void {
    context.documenter.emitStability(this.type.docs);
  }

  protected emitProxyMakerFunction(
    code: CodeMaker,
    bases: ReadonlyArray<GoClass | GoInterface>,
  ): void {
    code.open('func() interface{} {');
    if (bases.length > 0) {
      const instanceVar = this.proxyName[0];
      code.line(`${instanceVar} := ${this.proxyName}{}`);
      for (const base of bases) {
        const baseEmbed = base.pkg === this.pkg ? base.proxyName : base.name;
        code.line(
          `${JSII_RT_ALIAS}.InitJsiiProxy(&${instanceVar}.${baseEmbed})`,
        );
      }
      code.line(`return &${instanceVar}`);
    } else {
      code.line(`return &${this.proxyName}{}`);
    }
    // This is always used as a function argument, so we add a trailing comma
    code.close('},');
  }
}
