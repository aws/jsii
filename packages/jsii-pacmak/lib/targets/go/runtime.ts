import { CodeMaker } from 'codemaker';
import { GoClassConstructor, ClassMethod, Struct } from './types';
import { JSII_INIT_ALIAS, JSII_INIT_FUNC } from './package';

const NOOP_RETURN_MAP: { [type: string]: string } = {
  float64: '0.0',
  string: '"NOOP_RETURN_STRING"',
  bool: 'true',
};

function paramsString(params: string[]): string {
  return `[]string{${params.reduce((accum: string, p: string, i: number) => {
    const prefix = i === 0 ? '' : ' ';
    return `${accum}${prefix}"${p}",`;
  }, '')}}`;
}

export class MethodCall {
  public constructor(
    public readonly parent: ClassMethod,
    private readonly inStatic: boolean,
  ) {}

  public emit(code: CodeMaker) {
    if (this.inStatic) {
      emitInitialization(code);
    }

    const name = code.toPascalCase(this.parent.name);
    code.open(`jsii.NoOpRequest(jsii.NoOpApiRequest {`);
    code.line(`Class: "${this.parent.parent.name}",`);
    code.line(`Method: "${name}",`);
    code.line(
      `Args: ${paramsString(
        this.parent.method.parameters.map((p) => p.type.toString()),
      )},`,
    );
    code.close(`})`);

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

  private getDummyReturn(type: string): string {
    return NOOP_RETURN_MAP[type] || 'nil';
  }
}

export class ClassConstructor {
  public constructor(public readonly parent: GoClassConstructor) {}

  public emit(code: CodeMaker) {
    emitInitialization(code);
    code.open(`jsii.NoOpRequest(jsii.NoOpApiRequest {`);
    code.line(`Class: "${this.parent.parent.name}",`);
    code.line(`Method: "Constructor",`);
    code.line(
      `Args: ${paramsString(
        this.parent.parent.type.initializer!.parameters.map((p) =>
          p.type.toString(),
        ),
      )},`,
    );
    code.close(`})`);

    code.line(`return &${this.parent.parent.name}{}`);
  }
}

export function emitInitialization(code: CodeMaker) {
  code.line(`${JSII_INIT_ALIAS}.${JSII_INIT_FUNC}()`);
}
