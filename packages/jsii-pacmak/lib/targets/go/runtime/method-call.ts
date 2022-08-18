import { Method } from 'jsii-reflect';
import { EmitContext } from '../emit-context';

import { GoMethod } from '../types';
import {
  JSII_INVOKE_FUNC,
  JSII_INVOKE_VOID_FUNC,
  JSII_SINVOKE_FUNC,
  JSII_SINVOKE_VOID_FUNC,
} from './constants';
import { emitArguments } from './emit-arguments';
import { FunctionCall } from './function-call';
import { slugify, emitInitialization } from './util';

export class MethodCall extends FunctionCall {
  private _returnVarName = '';
  public constructor(public readonly parent: GoMethod) {
    super(parent);
  }

  public emit(context: EmitContext) {
    if (this.inStatic) {
      this.emitStatic(context);
    } else {
      this.emitDynamic(context);
    }
  }

  private emitDynamic({ code, runtimeTypeChecking }: EmitContext) {
    if (runtimeTypeChecking) {
      this.parent.validator?.emitCall(code);
    }

    const args = emitArguments(
      code,
      this.parent.parameters,
      this.returnVarName,
    );
    if (this.returnsVal) {
      code.line(`var ${this.returnVarName} ${this.returnType}`);
      code.line();
      code.open(`${JSII_INVOKE_FUNC}(`);
    } else {
      code.open(`${JSII_INVOKE_VOID_FUNC}(`);
    }

    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.method.name}",`);
    code.line(args ? `${args},` : 'nil, // no parameters');
    if (this.returnsVal) {
      code.line(`&${this.returnVarName},`);
    }

    code.close(`)`);

    if (this.returnsVal) {
      code.line();
      code.line(`return ${this.returnVarName}`);
    }
  }

  private emitStatic({code, runtimeTypeChecking}: EmitContext) {
    emitInitialization(code);
    code.line();

    if (runtimeTypeChecking) {
      this.parent.validator?.emitCall(code);
    }

    const args = emitArguments(
      code,
      this.parent.parameters,
      this.returnVarName,
    );
    if (this.returnsVal) {
      code.line(`var ${this.returnVarName} ${this.returnType}`);
      code.line();
      code.open(`${JSII_SINVOKE_FUNC}(`);
    } else {
      code.open(`${JSII_SINVOKE_VOID_FUNC}(`);
    }

    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.method.name}",`);
    code.line(args ? `${args},` : 'nil, // no parameters');
    if (this.returnsVal) {
      code.line(`&${this.returnVarName},`);
    }

    code.close(`)`);

    if (this.returnsVal) {
      code.line();
      code.line(`return ${this.returnVarName}`);
    }
  }

  private get returnVarName(): string {
    if (this._returnVarName === '') {
      this._returnVarName = slugify(
        'returns',
        this.parent.parameters.map((p) => p.name),
      );
    }
    return this._returnVarName;
  }

  private get inStatic(): boolean {
    return Method.isMethod(this.parent.method) && this.parent.method.static;
  }
}
