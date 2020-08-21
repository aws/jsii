import { Docs } from 'jsii-reflect';
import { EmitContext } from './emit-context';

export class Documentation {
  public constructor(private readonly docs: Docs) {}

  public emit({ code }: EmitContext): void {
    // TODO: Translate code examples to Golang with Rosetta (not implemented there yet)
    code.line(`// ${this.docs.summary}`);
    code.line('//');
    for (const line of this.docs.remarks.split('\n')) {
      code.line(`// ${line}`);
    }
  }
}
