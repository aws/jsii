import { GoTypeMember } from '../types';

export abstract class FunctionCall {
  public constructor(public readonly parent: GoTypeMember) {}

  protected get returnsVal(): boolean {
    return Boolean(this.parent.reference && !this.parent.reference.void);
  }

  protected get returnType(): string {
    return this.parent.returnType || 'interface{}';
  }
}
