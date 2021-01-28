import { CodeMaker } from "codemaker";


/**
 * Represents the version of the go module. This is needed because the version is not
 * available in standard go module files.
 */
export class VersionFile {

  private static readonly NAME = 'version';

  constructor(private readonly version: string) {}

  public emit(code: CodeMaker) {
    code.openFile(VersionFile.NAME);
    code.line(this.version);
    code.closeFile(VersionFile.NAME)
  }
}