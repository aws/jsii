import * as util from 'util';

import * as caseutils from './case-utils';
import FileBuffer from './filebuff';

/**
 * Multi-file text writer with some code-generation features.
 */
export class CodeMaker {
  /**
   * The indentation level of the file.
   */
  public indentation: number;

  /**
   * The character to use for indentation. When setting this to `\t`, consider
   * also setting `indentation` to `1`.
   */
  public indentCharacter: ' ' | '\t';

  private currIndent = 0;
  private currentFile?: FileBuffer;
  private readonly files = new Array<FileBuffer>();
  private readonly excludes = new Array<string>();

  public constructor({
    indentationLevel = 4,
    indentCharacter = ' ',
  }: {
    indentationLevel?: CodeMaker['indentation'];
    indentCharacter?: CodeMaker['indentCharacter'];
  } = {}) {
    this.indentation = indentationLevel;
    this.indentCharacter = indentCharacter;
  }

  public get currentIndentLength(): number {
    return this.currIndent * this.indentation;
  }

  /**
   * Formats an block open statement.
   */
  public openBlockFormatter: (s?: string) => string = (s) => `${s} {`;

  /**
   * Formats a block close statement.
   */
  public closeBlockFormatter: (s?: string) => string | false = () => '}';

  /**
   * Saves all the files created in this code maker.
   * @param rootDir The root directory for all saved files.
   * @returns A sorted list of all the files saved (absolute paths).
   */
  public async save(rootDir: string) {
    const paths = this.files
      .filter((file) => !this.excludes.includes(file.filePath))
      .map((file) => file.save(rootDir));
    return (await Promise.all(paths)).sort();
  }

  /**
   * Sets the name of the current file we are working with.
   * Note that this doesn't really create a new file (files are only created when save() is called.
   * Use `closeFile` to close this file.
   * @param filePath The relative path of the new file.
   */
  public openFile(filePath: string) {
    if (this.currentFile) {
      throw new Error(
        `Cannot open file ${filePath} without closing the previous file ${this.currentFile.filePath}`,
      );
    }

    this.currentFile = new FileBuffer(filePath);
  }

  /**
   * Indicates that we finished generating the current file.
   * @param filePath The relative file path (must be the same as one passed to openFile)
   */
  public closeFile(filePath: string) {
    if (!this.currentFile) {
      throw new Error(`Cannot close file ${filePath}. It was never opened`);
    }
    if (this.currentFile.filePath !== filePath) {
      throw new Error(
        `Cannot close file ${filePath}. The currently opened file is ${this.currentFile.filePath}`,
      );
    }

    this.files.push(this.currentFile);
    this.currentFile = undefined;
  }

  /**
   * Emits a line into the currently opened file.
   * Line is emitted with the current level of indentation.
   * If no arguments are provided, an empty new line is emitted.
   * @param fmt String format arguments (passed to `util.format`)
   * @param args String arguments
   */
  public line(fmt?: string, ...args: string[]) {
    if (!this.currentFile) {
      throw new Error('Cannot emit source lines without opening a file');
    }

    if (fmt) {
      fmt = this.makeIndent() + fmt;
      this.currentFile.write(util.format(fmt, ...args));
    }

    this.currentFile.write('\n');
  }

  /**
   * Same as `open`.
   */
  public indent(textBefore?: string) {
    this.open(textBefore);
  }

  /**
   * Same as `close`.
   */
  public unindent(textAfter?: string | false) {
    this.close(textAfter);
  }

  /**
   * Increases the indentation level by `indentation` spaces for the next line.
   * @param textBefore Text to emit before the newline (i.e. block open).
   */
  public open(textBefore?: string) {
    this.line(textBefore);
    this.currIndent++;
  }

  /**
   * Decreases the indentation level by `indentation` for the next line.
   * @param textAfter Text to emit in the line after indentation was decreased.
   *                  If `false` no line will be emitted at all, but the indent
   *                  counter will be decremented.
   */
  public close(textAfter?: string | false) {
    this.currIndent--;
    if (textAfter !== false) {
      this.line(textAfter);
    }
  }

  /**
   * Opens a code block. The formatting of the block is determined by `openBlockFormatter`.
   * @param text The text to pass to the formatter.
   */
  public openBlock(text: string) {
    this.open(this.openBlockFormatter(text));
  }

  /**
   * Closes a code block. The formatting of the block is determined by `closeBlockFormatter`.
   * @param text The text to pass to the formatter.
   */
  public closeBlock(text?: string) {
    this.close(this.closeBlockFormatter(text));
  }

  /**
   * Adds a file to the exclude list. This means this file will not be saved during save().
   * @param filePath The relative path of the file.
   */
  public exclude(filePath: string) {
    this.excludes.push(filePath);
  }

  /**
   * convertsStringToCamelCase
   */
  public toCamelCase(...args: string[]) {
    return caseutils.toCamelCase(...args);
  }

  /**
   * ConvertsStringToPascalCase
   */
  public toPascalCase(...args: string[]) {
    return caseutils.toPascalCase(...args);
  }

  /**
   * convert_string_to_snake_case
   * @param sep Separator (defaults to '_')
   */
  public toSnakeCase(s: string, sep = '_') {
    return caseutils.toSnakeCase(s, sep);
  }

  /**
   * Gets currently opened file path
   * @returns Currently opened file path.
   */
  public getCurrentFilePath(): string | undefined {
    return this.currentFile?.filePath;
  }

  private makeIndent(): string {
    const length = this.currentIndentLength;
    if (length <= 0) {
      return '';
    }
    return this.indentCharacter.repeat(length);
  }
}
