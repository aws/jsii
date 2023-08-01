import { CodeMaker } from 'codemaker';
import { Type } from 'jsii-reflect';
import { ApiLocation } from 'jsii-rosetta';

import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import {
  ParameterValidator,
  StructValidator,
} from '../runtime/runtime-type-checking';
import { GoClass } from './class';
import { GoInterface } from './interface';

export abstract class GoType<T extends Type = Type> {
  public readonly name: string;
  public readonly fqn: string;
  public readonly proxyName: string;
  protected readonly apiLocation: ApiLocation;

  public constructor(
    public readonly pkg: Package,
    public readonly type: T,
  ) {
    this.name = type.name;

    // Prefix with the nesting parent name(s), using an _ delimiter.
    for (
      let parent = type.nestingParent;
      parent != null;
      parent = parent.nestingParent
    ) {
      this.name = `${parent.name}_${this.name}`;
    }

    // Add "jsiiProxy_" prefix to private struct name to avoid keyword conflicts
    // such as "default". See https://github.com/aws/jsii/issues/2637
    this.proxyName = `jsiiProxy_${this.name}`;

    this.fqn = type.fqn;

    this.apiLocation = { api: 'type', fqn: this.fqn };
  }

  public get structValidator(): StructValidator | undefined {
    return undefined;
  }

  public abstract get parameterValidators(): readonly ParameterValidator[];

  public abstract emit(context: EmitContext): void;

  public abstract emitRegistration(context: EmitContext): void;

  public abstract get dependencies(): Package[];
  public abstract get specialDependencies(): SpecialDependencies;

  public get namespace() {
    return this.pkg.packageName;
  }

  public emitDocs(context: EmitContext): void {
    context.documenter.emit(this.type.docs, this.apiLocation);
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
        const baseEmbed = this.pkg.resolveEmbeddedType(base);
        code.line(
          `${JSII_RT_ALIAS}.InitJsiiProxy(&${instanceVar}.${baseEmbed.fieldName})`,
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
