import { CodeMaker } from 'codemaker';

import { GoMethod } from '../types';
import { JSII_INVOKE_FUNC, JSII_SINVOKE_FUNC } from './constants';
import { FunctionCall } from './function-call';
import { slugify, emitInitialization } from './util';

export class MethodCall extends FunctionCall {
  private _returnVarName = '';
  public constructor(public readonly parent: GoMethod) {
    super(parent);
  }

  public emit(code: CodeMaker) {
    if (this.inStatic) {
      this.emitStatic(code);
    } else {
      this.emitDynamic(code);
    }
  }

  private emitDynamic(code: CodeMaker) {
    code.line(`var ${this.returnVarName} ${this.returnType}`);
    code.open(`${JSII_INVOKE_FUNC}(`);

    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`${this.returnsVal ? 'true' : 'false'},`);
    code.line(`&${this.returnVarName},`);
    this.emitImplMapVal(code);

    code.close(`)`);

    if (this.returnsVal) {
      code.line(`return ${this.returnVarName}`);
    }
  }

  private emitStatic(code: CodeMaker) {
    emitInitialization(code);
    code.line(`var ${this.returnVarName} ${this.returnType}`);

    code.open(`${JSII_SINVOKE_FUNC}(`);

    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`${this.returnsVal ? 'true' : 'false'},`);
    code.line(`&${this.returnVarName},`);
    this.emitImplMapVal(code);

    code.close(`)`);

    if (this.returnsVal) {
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
    return this.parent.method.static;
  }

  private get argsString(): string {
    const argsList = this.parent.parameters
      .map((param) => param.name)
      .join(', ');
    return `[]interface{}{${argsList}}`;
  }
}
