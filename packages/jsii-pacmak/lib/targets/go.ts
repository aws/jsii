import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import * as path from 'path';

import { IGenerator } from '../generator';
import { Target, TargetOptions } from '../target';
import { Documentation } from './go/documentation';
import { RootPackage } from './go/package';
import { JSII_INIT_PACKAGE } from './go/runtime';
import { goPackageName } from './go/util';

export class Golang extends Target {
  public readonly generator: IGenerator;

  public constructor(options: TargetOptions) {
    super(options);

    this.generator = new GoGenerator(options.rosetta);
  }

  /**
   * Generates a publishable artifact in `outDir`.
   *
   * @param sourceDir the directory where the generated source is located.
   * @param outDir    the directory where the publishable artifact should be placed.
   */
  public async build(sourceDir: string, outDir: string): Promise<void> {
    return this.copyFiles(sourceDir, outDir);
  }
}

class GoGenerator implements IGenerator {
  private assembly!: Assembly;
  private readonly code = new CodeMaker({
    indentCharacter: '\t',
    indentationLevel: 1,
  });
  private readonly documenter: Documentation;

  public constructor(private readonly rosetta: Rosetta) {
    this.documenter = new Documentation(this.code, this.rosetta);
  }

  public async load(_: string, assembly: Assembly): Promise<void> {
    this.assembly = assembly;
    return Promise.resolve();
  }

  public async upToDate(_outDir: string) {
    return Promise.resolve(false);
  }

  public generate(): void {
    new RootPackage(this.assembly).emit({
      code: this.code,
      documenter: this.documenter,
    });
  }

  public async save(outDir: string, tarball: string): Promise<any> {
    await this.embedTarball(tarball);

    const output = path.join(outDir, goPackageName(this.assembly.name));
    await this.code.save(output);
  }

  private async embedTarball(source: string) {
    const data = await fs.readFile(source);
    const bytesPerLine = 16;

    const file = path.join(JSII_INIT_PACKAGE, 'tarball.embedded.go');
    this.code.openFile(file);
    this.code.line(`package ${JSII_INIT_PACKAGE}`);
    this.code.line();
    this.code.open('var tarball = []byte{');
    for (let i = 0; i < data.byteLength; i += bytesPerLine) {
      const encoded = Array.from(data.slice(i, i + bytesPerLine))
        .map((byte) => `0x${byte.toString(16).padStart(2, '0')}`)
        .join(', ');
      this.code.line(`${encoded},`);
    }
    this.code.close('}');
    this.code.line();
    // Check the byte slice has the expect size
    this.code.open('func init() {');
    this.code.open(`if len(tarball) != ${data.byteLength} {`);
    this.code.line(
      `panic("Tarball data does not have expected length (${data.byteLength} bytes)")`,
    );
    this.code.close('}');
    this.code.close('}');
    this.code.closeFile(file);
  }
}
