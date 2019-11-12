import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';
import * as logging from '../logging';
import { PackageInfo, Target } from '../target';
import { shell, Scratch } from '../util';
import { DotNetGenerator } from './dotnet/dotnetgenerator';
import { TargetBuilder, BuildOptions } from '../builder';
import { JsiiModule } from '../packaging';

/**
 * Build .NET packages all together, by generating an aggregate solution file
 */
export class DotnetBuilder implements TargetBuilder {
  private readonly targetName = 'dotnet';

  public async buildModules(modules: JsiiModule[], options: BuildOptions): Promise<void> {
    if (modules.length === 0) { return; }

    if (options.codeOnly) {
      // Simple, just generate code to respective output dirs
      for (const module of modules) {
        await this.generateModuleCode(module, options, module.outputDirectory);
      }
      return;
    }

    // Otherwise make a single tempdir to hold all sources, build them together and copy them back out
    const scratchDirs: Array<Scratch<any>> = [];
    try {
      const tempSourceDir = await this.generateAggregateSourceDir(modules, options);
      scratchDirs.push(tempSourceDir);

      // Build solution
      logging.debug(`Building .NET`);
      await shell('dotnet', ['build', '-c', 'Release'], { cwd: tempSourceDir.directory });

      await this.copyOutArtifacts(tempSourceDir.object, options);
    } finally {
      if (options.clean) {
        Scratch.cleanupAll(scratchDirs);
      }
    }
  }

  private async generateAggregateSourceDir(modules: JsiiModule[], options: BuildOptions): Promise<Scratch<Array<TemporaryDotnetPackage>>> {
    return Scratch.make(async (tmpDir: string) => {
      logging.debug(`Generating aggregate .NET source dir at ${tmpDir}`);

      const csProjs = [];
      const ret: TemporaryDotnetPackage[] = [];

      for (const module of modules) {
        // Code generator will make its own subdirectory
        await this.generateModuleCode(module, options, tmpDir);
        const loc = projectLocation(module);
        csProjs.push(loc.projectFile);
        ret.push({
          outputTargetDirectory: module.outputDirectory,
          artifactsDir: path.join(tmpDir, loc.projectDir, 'bin', 'Release')
        });
      }

      // Use 'dotnet' command line tool to build a solution file from these csprojs
      await shell('dotnet', ['new', 'sln', '-n', 'JsiiBuild'], { cwd: tmpDir });
      await shell('dotnet', ['sln', 'add', ...csProjs], { cwd: tmpDir });

      return ret;
    });
  }

  private async copyOutArtifacts(packages: TemporaryDotnetPackage[], options: BuildOptions) {
    logging.debug(`Copying out .NET artifacts`);
    for (const pkg of packages) {
      const targetDirectory = path.join(pkg.outputTargetDirectory, options.languageSubdirectory ? this.targetName : '');

      await fs.mkdirp(targetDirectory);
      await fs.copy(pkg.artifactsDir, targetDirectory, { recursive: true });

      // This copies more than we need, remove the directory with the bare assembly again
      await fs.remove(path.join(targetDirectory, 'netcoreapp3.0'));
    }
  }

  private async generateModuleCode(module: JsiiModule, options: BuildOptions, where: string): Promise<void> {
    const target = this.makeTarget(module, options);
    logging.debug(`Generating ${this.targetName} code into ${where}`);
    await target.generateCode(where, module.tarball);
  }

  private makeTarget(module: JsiiModule, options: BuildOptions): Dotnet {
    return new Dotnet({
      targetName: this.targetName,
      packageDir: module.moduleDirectory,
      assembly: module.assembly,
      fingerprint: options.fingerprint,
      force: options.force,
      arguments: options.arguments,
      rosetta: options.rosetta,
    });
  }
}

interface TemporaryDotnetPackage {
  /**
   * Where the artifacts will be stored after build (relative to build dir)
   */
  artifactsDir: string;

  /**
   * Where the artifacts ought to go for this particular module
   */
  outputTargetDirectory: string;
}

function projectLocation(module: JsiiModule) {
  const packageId: string = module.assembly.targets!.dotnet!.packageId;
  return {
    projectDir: packageId,
    projectFile: path.join(packageId, `${packageId}.csproj`)
  };
}

export default class Dotnet extends Target {
  public static toPackageInfos(assm: spec.Assembly): { [language: string]: PackageInfo } {
    const packageId = assm.targets!.dotnet!.packageId;
    const version = assm.version;
    const packageInfo: PackageInfo = {
      repository: 'Nuget',
      url: `https://www.nuget.org/packages/${packageId}/${version}`,
      usage: {
        'csproj': {
          language: 'xml',
          code: `<PackageReference Include="${packageId}" Version="${version}" />`
        },
        'dotnet': {
          language: 'console',
          code: `dotnet add package ${packageId} --version ${version}`
        },
        'packages.config': {
          language: 'xml',
          code: `<package id="${packageId}" version="${version}" />`
        }
      }
    };
    return { 'C#': packageInfo };
  }

  public static toNativeReference(_type: spec.Type, options: any) {
    return {
      'c#': `using ${options.namespace};`
    };
  }

  protected readonly generator = new DotNetGenerator();

  public async build(_sourceDir: string, _outDir: string): Promise<void> {
    throw new Error('Should not be called; use builder instead');
  }
}
