import { CodeMaker } from 'codemaker';

import { GoMethod } from '../types';
import { JSII_INVOKE_FUNC, JSII_SINVOKE_FUNC } from './constants';
import { slugify, emitInitialization } from './util';

export class MethodCall {
  public constructor(public readonly parent: GoMethod) {}

  public emit(code: CodeMaker) {
    if (this.inStatic) {
      this.emitStatic(code);
    } else {
      this.emitDynamic(code);
    }
  }

  private emitDynamic(code: CodeMaker) {
    code.line(`var ${this.returnVarName} ${this.concreteReturnType}`);
    code.open(`${JSII_INVOKE_FUNC}(`);

    const returnsArg = this.parent.returnsRef
      ? this.returnVarName
      : `&${this.returnVarName}`;

    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`${this.returnsVal ? 'true' : 'false'},`);
    code.line(`${returnsArg},`);

    code.close(`)`);

    if (this.returnsVal) {
      code.line(`return ${this.returnVarName}`);
    }
  }

  private emitStatic(code: CodeMaker) {
    emitInitialization(code);
    code.line(`var ${this.returnVarName} ${this.concreteReturnType}`);

    code.open(`${JSII_SINVOKE_FUNC}(`);

    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`${this.returnsVal ? 'true' : 'false'},`);
    code.line(`&${this.returnVarName},`);

    code.close(`)`);

    if (this.returnsVal) {
      code.line(`return ${this.returnVarName}`);
    }
  }

  private get returnVarName(): string {
    return slugify(
      'returns',
      this.parent.parameters.map((p) => p.name),
    );
  }

  private get returnsVal(): boolean {
    return Boolean(this.parent.reference && !this.parent.reference.void);
  }

  private get concreteReturnType(): string | undefined {
    if (this.returnsVal) {
      return this.parent.concreteReturnType;
    }

    return 'interface{}';
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
