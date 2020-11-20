import { CodeMaker } from 'codemaker';

import { GoProperty } from '../types';
import {
  JSII_GET_FUNC,
  JSII_SET_FUNC,
  JSII_SGET_FUNC,
  JSII_SSET_FUNC,
} from './constants';
import { slugify, emitInitialization } from './util';
import {FunctionCall} from './function-call';

export class GetProperty extends FunctionCall {
  public constructor(public readonly parent: GoProperty) {
    super(parent);
  }

  public emit(code: CodeMaker) {
    const resultVar = slugify('returns', [this.parent.instanceArg]);
    code.line(`var ${resultVar} ${this.returnType}`);

    code.open(`${JSII_GET_FUNC}(`);
    code.line(`${this.parent.instanceArg},`);
    code.line(`"${this.parent.property.name}",`);
    code.line(`&${resultVar},`);
    this.emitImplMapVal(code);
    code.close(`)`);

    code.line(`return ${resultVar}`);
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

export class StaticGetProperty extends FunctionCall {
  public constructor(public readonly parent: GoProperty) {
    super(parent);
  }

  public emit(code: CodeMaker) {
    emitInitialization(code);
    const resultVar = slugify('returns', []);
    code.line(`var ${resultVar} ${this.returnType}`);

    code.open(`${JSII_SGET_FUNC}(`);
    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.property.name}",`);
    code.line(`&${resultVar},`);
    this.emitImplMapVal(code);
    code.close(`)`);

    code.line(`return ${resultVar}`);
  }
}

export class StaticSetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public emit(code: CodeMaker) {
    emitInitialization(code);

    code.open(`${JSII_SSET_FUNC}(`);
    code.line(`"${this.parent.parent.fqn}",`);
    code.line(`"${this.parent.property.name}",`);
    code.line(`val,`);
    code.close(`)`);
  }
}
