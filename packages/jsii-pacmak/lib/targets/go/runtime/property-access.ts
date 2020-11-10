import { CodeMaker } from 'codemaker';

import { GoProperty, Struct } from '../types';
import {
  NOOP_RETURN_MAP,
  JSII_GET_FUNC,
  JSII_SET_FUNC,
  JSII_SGET_FUNC,
  JSII_SSET_FUNC,
} from './constants';
import { emitInitialization } from './util';

export class GetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public emit(code: CodeMaker) {
    code.open(`${JSII_GET_FUNC}(`);
    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.property.name}",`);
    code.close(`)`);
  }
}

export class SetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public emit(code: CodeMaker) {
    code.open(`${JSII_SET_FUNC}(`);
    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.property.name}",`);
    code.line(`val,`);
    code.close(`)`);
  }
}

// TODO placeholder - use StaticGet api
export class StaticGetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public emit(code: CodeMaker) {
    emitInitialization(code);

    code.open(`${JSII_SGET_FUNC}(`);
    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.property.name}",`);
    code.close(`)`);

    const ret = this.parent.property;
    if (ret?.type?.type?.isClassType() || ret?.type instanceof Struct) {
      code.line(`return ${this.parent.returnType}{}`);
    } else if (ret?.type?.type?.isEnumType()) {
      code.line(`return "ENUM_DUMMY"`);
    } else {
      code.line(`return ${this.getDummyReturn(this.parent.returnType)}`);
    }
  }

  private getDummyReturn(type: string): string {
    return NOOP_RETURN_MAP[type] || 'nil';
  }
}

// TODO placeholder - use StaticGet api
export class StaticSetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public emit(code: CodeMaker) {
    emitInitialization(code);

    code.open(`${JSII_SSET_FUNC}(`);
    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.property.name}",`);
    code.line(`val,`);
    code.close(`)`);
    code.line(`return`);
  }
}
