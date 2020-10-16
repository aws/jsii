import { CodeMaker } from 'codemaker';
import { ClassMethod, Struct } from '../types';
import { emitInitialization } from './util';
import { JSII_INVOKE_FUNC, JSII_SINVOKE_FUNC } from './constants';

// NOOP type returns
const NOOP_RETURN_MAP: { [type: string]: string } = {
  float64: '0.0',
  string: '"NOOP_RETURN_STRING"',
  bool: 'true',
};

export class MethodCall {
  public constructor(public readonly parent: ClassMethod) {}

  public emit(code: CodeMaker) {
    if (this.inStatic) {
      this.emitStatic(code);
    } else {
      this.emitDynamic(code);
    }
  }

  private emitDynamic(code: CodeMaker) {
    code.line(`returns := ""`);
    code.open(`${JSII_INVOKE_FUNC}(`);

    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`&returns,`);

    code.close(`)`);

    this.emitReturnStatement(code);
  }

  private emitStatic(code: CodeMaker) {
    emitInitialization(code);
    code.line(`returns := ""`);
    code.open(`${JSII_SINVOKE_FUNC}(`);

    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.method.name}",`);
    code.line(`${this.argsString},`);
    code.line(`&returns,`);

    code.close(`)`);

    this.emitReturnStatement(code);
  }

  private getDummyReturn(type: string): string {
    return NOOP_RETURN_MAP[type] || 'nil';
  }

  protected emitReturnStatement(code: CodeMaker) {
    const ret = this.parent.reference;
    if (ret?.void) {
      // don't emit a return statement if function doesn't return a value
      return;
    } else if (ret?.type?.type.isClassType() || ret?.type instanceof Struct) {
      code.line(`return ${this.parent.returnType}{}`);
    } else if (ret?.type?.type.isEnumType()) {
      code.line(`return "ENUM_DUMMY"`);
    } else {
      code.line(`return ${this.getDummyReturn(this.parent.returnType)}`);
    }
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
