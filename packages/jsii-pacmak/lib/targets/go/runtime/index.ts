import { CodeMaker } from 'codemaker';
import { GoClassConstructor, ClassMethod, Struct } from '../types';
import {
  JSII_CREATE_FUNC,
  JSII_INIT_ALIAS,
  JSII_INIT_FUNC,
  JSII_OVERRIDE,
} from './constants';
export * from './constants';

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
    code.open(`_jsii_.NoOpRequest(_jsii_.NoOpApiRequest {`);
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

    const resultVar = slugify(
      'self',
      this.parent.parameters.map((p) => p.name),
    );

    code.line(`${resultVar} := ${this.parent.parent.name}{}`);
    code.open(`${JSII_CREATE_FUNC}(`);

    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`${this.argsString},`);
    code.line(`${this.interfacesString},`);
    code.line(`[]${JSII_OVERRIDE}{},`);
    code.line(`&${resultVar},`);

    code.close(`)`);

    code.line(`return &${resultVar}`);
  }

  public get interfacesString(): string {
    const iFaceList = this.parent.parent.interfaces
      .map((iFace) => `"${iFace}"`)
      .join(', ');
    return `[]string{${iFaceList}}`;
  }

  public get argsString(): string {
    const argsList = this.parent.parameters
      .map((param) => param.name)
      .join(', ');
    return `[]interface{}{${argsList}}`;
  }
}

export function emitInitialization(code: CodeMaker) {
  code.line(`${JSII_INIT_ALIAS}.${JSII_INIT_FUNC}()`);
}

/**
 * Slugify a name by appending '_' at the end until the resulting name is not
 * present in the list of reserved names.
 *
 * @param name     the name to be slugified
 * @param reserved the list of names that are already sued in-scope
 *
 * @returns the slugified name
 */
function slugify(name: string, reserved: Iterable<string>): string {
  const used = new Set(reserved);
  while (used.has(name)) {
    name += '_';
  }
  return name;
}
