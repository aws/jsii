import { CodeMaker } from 'codemaker';

import { GoClassConstructor } from '../types';
import { emitArgumentObject } from './arguments';
import { JSII_CREATE_FUNC, JSII_FQN } from './constants';
import { slugify, emitInitialization } from './util';

export class ClassConstructor {
  public constructor(public readonly parent: GoClassConstructor) {}

  public emit(code: CodeMaker) {
    emitInitialization(code);
    code.line();

    const resultVar = slugify(
      this.parent.parent.proxyName[0],
      this.parent.parameters.map((p) => p.name),
    );

    code.line(`${resultVar} := ${this.parent.parent.proxyName}{}`);
    code.line();

    code.open(`${JSII_CREATE_FUNC}(`);

    code.line(`"${this.parent.parent.fqn}",`);
    emitArgumentObject(code, this.parent);
    code.line(`${this.interfacesString},`);
    code.line('nil, // no overrides');
    code.line(`&${resultVar},`);

    code.close(`)`);

    code.line();
    code.line(`return &${resultVar}`);
  }

  public get interfacesString(): string {
    const iFaceList = this.parent.parent.interfaces
      .map((iFace) => `"${iFace}"`)
      .join(', ');
    return `[]${JSII_FQN}{${iFaceList}}`;
  }
}
