import { EmitContext } from './emit-context';

export class ReadmeFile {
  public constructor(
    private readonly packageName: string,
    private readonly document: string,
    private readonly directory: string,
  ) {}

  public emit({ documenter }: EmitContext) {
    if (!this.document) {
      return;
    }
    documenter.emitReadme(this.packageName, this.document, this.directory);
  }
}
