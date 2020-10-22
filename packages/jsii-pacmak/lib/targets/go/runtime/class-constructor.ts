import { CodeMaker } from 'codemaker';

import { GoClassConstructor } from '../types';
import { JSII_CREATE_FUNC, JSII_OVERRIDE, JSII_FQN } from './constants';
import { slugify, emitInitialization } from './util';

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
    return `[]${JSII_FQN}{${iFaceList}}`;
  }

  public get argsString(): string {
    const argsList = this.parent.parameters
      .map((param) => param.name)
      .join(', ');
    return `[]interface{}{${argsList}}`;
  }
}
