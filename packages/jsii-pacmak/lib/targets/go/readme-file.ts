import { join } from 'path';

import { EmitContext } from './emit-context';
// import { Translation } from 'jsii-rosetta';
// import { INCOMPLETE_DISCLAIMER_COMPILING, INCOMPLETE_DISCLAIMER_NONCOMPILING } from '..';

export class ReadmeFile {
  public constructor(
    private readonly packageName: string,
    private readonly document: string,
  ) {}

  public emit({ code /*, rosetta */ }: EmitContext) {
    const nameParts = this.packageName.split('.');
    const file = join(
      ...nameParts.slice(0, nameParts.length - 11),
      'README.md',
    );

    code.openFile(file);
    const translated = this.document; // rosetta.translateSnippetsInMarkdown(this.document, 'go', prependDisclaimer);
    for (const line of translated.split('\n')) {
      code.line(line);
    }
    code.closeFile(file);
  }

  /*
  function prependDisclaimer(translation: Translation) {
    const source = addDisclaimerIfNeeded();
    return { language: translation.language, source };

    function addDisclaimerIfNeeded(): string {
      if (translation.didCompile && INCOMPLETE_DISCLAIMER_COMPILING) {
        return `// ${INCOMPLETE_DISCLAIMER_COMPILING}\n\n${translation.source}`;
      }
      if (!translation.didCompile && INCOMPLETE_DISCLAIMER_NONCOMPILING) {
        return `// ${INCOMPLETE_DISCLAIMER_NONCOMPILING}\n\n${translation.source}`;
      }
      return translation.source;
    }
  }
  */
}
