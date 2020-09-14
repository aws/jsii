import { CodeMaker } from 'codemaker';
import { Documentation } from './golang/documentation';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import { join } from 'path';
import { RootPackage } from './golang/package';
import { IGenerator } from '../generator';
import { Target, TargetOptions } from '../target';
import { goPackageName } from './golang/util';

export class Golang extends Target {
  public readonly generator: IGenerator;

  public constructor(options: TargetOptions) {
    super(options);

    this.generator = new GolangGenerator(options.rosetta);
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

class GolangGenerator implements IGenerator {
  private assembly!: Assembly;
  private readonly code = new CodeMaker();
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

  public async save(outDir: string, _tarball: string): Promise<any> {
    // TODO: Replace with [go-embed](https://github.com/pyros2097/go-embed)
    // const bundledRuntimeDotGo = path.join('_jsii', 'bundled-runtime.go');
    // this.code.openFile(bundledRuntimeDotGo);

    // this.code.line(
    //   `// Embedded data for the tarball containing the runtime of ${this.assembly.name}@${this.assembly.version}`,
    // );
    // this.code.openBlock('const tarball = []byte');
    // for await (const line of encodedSlices(tarball)) {
    //   this.code.line(`${line},`);
    // }
    // this.code.closeBlock();

    // this.code.closeFile(bundledRuntimeDotGo);

    await this.code.save(join(outDir, goPackageName(this.assembly.name)));
  }
}

// TODO: Replace with
// async function* encodedSlices(path: string, sliceSize = 16) {
//   const slice = Buffer.alloc(sliceSize);

//   const fd = await fs.open(path, fs.constants.O_RDONLY);

//   while (true) {
//     // eslint-disable-next-line no-await-in-loop
//     const { bytesRead } = await fs.read(fd, slice, 0, slice.length, null);
//     if (bytesRead === 0) {
//       return fs.close(fd);
//     }
//     yield inGroupsOf(slice.toString('hex', 0, bytesRead - 1), 2)
//       .map((byte) => `0x${byte}`)
//       .join(', ');
//   }

//   function inGroupsOf(str: string, count: number) {
//     if (str.length % count !== 0) {
//       throw new Error(
//         `Expected a string with a multiple of ${count} characters, but it has ${str.length}`,
//       );
//     }
//     const result = new Array<string>();
//     for (let i = 0; i < str.length; i += count) {
//       result.push(str.slice(i, i + count));
//     }
//     return result;
//   }
// }
