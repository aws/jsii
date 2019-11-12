import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';
import * as logging from '../logging';
import xmlbuilder = require('xmlbuilder');
import { PackageInfo, Target, TargetOptions, findLocalBuildDirs } from '../target';
import { shell, Scratch, setExtend } from '../util';
import { DotNetGenerator } from './dotnet/dotnetgenerator';
import { TargetBuilder, BuildOptions } from '../builder';
import { JsiiModule } from '../packaging';

/**
 * Build .NET packages all together, by generating an aggregate solution file
 */
export class DotnetBuilder implements TargetBuilder {
  private readonly targetName = 'dotnet';

  public constructor(private readonly modules: JsiiModule[], private readonly options: BuildOptions) {
  }

  public async buildModules(): Promise<void> {
    if (this.modules.length === 0) { return; }

    if (this.options.codeOnly) {
      // Simple, just generate code to respective output dirs
      for (const module of this.modules) {
        await this.generateModuleCode(module, module.outputDirectory);
      }
      return;
    }

    // Otherwise make a single tempdir to hold all sources, build them together and copy them back out
    const scratchDirs: Array<Scratch<any>> = [];
    try {
      const tempSourceDir = await this.generateAggregateSourceDir(this.modules);
      scratchDirs.push(tempSourceDir);

      // Build solution
      logging.debug('Building .NET');
      await shell('dotnet', ['build', '-c', 'Release'], { cwd: tempSourceDir.directory });

      await this.copyOutArtifacts(tempSourceDir.object);
      if (this.options.clean) {
        await Scratch.cleanupAll(scratchDirs);
      }
    } catch(e) {
      logging.warn(`Exception occurred, not cleaning up ${scratchDirs.map(s => s.directory)}`);
      throw e;
    }
  }

  private async generateAggregateSourceDir(modules: JsiiModule[]): Promise<Scratch<TemporaryDotnetPackage[]>> {
    return Scratch.make(async (tmpDir: string) => {
      logging.debug(`Generating aggregate .NET source dir at ${tmpDir}`);

      const csProjs = [];
      const ret: TemporaryDotnetPackage[] = [];

      for (const module of modules) {
        // Code generator will make its own subdirectory
        await this.generateModuleCode(module, tmpDir);
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

      await this.generateNuGetConfigForLocalDeps(tmpDir);

      return ret;
    });
  }

  private async copyOutArtifacts(packages: TemporaryDotnetPackage[]) {
    logging.debug('Copying out .NET artifacts');
    for (const pkg of packages) {
      const targetDirectory = path.join(pkg.outputTargetDirectory, this.options.languageSubdirectory ? this.targetName : '');

      await fs.mkdirp(targetDirectory);
      await fs.copy(pkg.artifactsDir, targetDirectory, { recursive: true });

      // This copies more than we need, remove the directory with the bare assembly again
      await fs.remove(path.join(targetDirectory, 'netcoreapp3.0'));
    }
  }

  private async generateModuleCode(module: JsiiModule, where: string): Promise<void> {
    const target = this.makeTarget(module);
    logging.debug(`Generating ${this.targetName} code into ${where}`);
    await target.generateCode(where, module.tarball);
  }

  /**
   * Write a NuGet.config that will include build directories for local packages not in the current build
   *
   */
  private async generateNuGetConfigForLocalDeps(where: string): Promise<void> {
    // Traverse the dependency graph of this module and find all modules that have
    // an <outdir>/dotnet directory. We will add those as local NuGet repositories.
    // This enables building against local modules.
    const allDepsOutputDirs = new Set<string>();
    for (const module of this.modules) {
      setExtend(allDepsOutputDirs, await findLocalBuildDirs(module.moduleDirectory, this.targetName));

      // Also include output directory where we're building to, in case we build multiple packages into
      // the same output directory.
      allDepsOutputDirs.add(path.join(module.outputDirectory, this.options.languageSubdirectory ? this.targetName : ''));
    }

    const localRepos = Array.from(allDepsOutputDirs);

    // If dotnet-jsonmodel is checked-out and we can find a local repository, add it to the list.
    try {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const jsiiDotNetJsonModel = require('jsii-dotnet-jsonmodel');
      /* eslint-enable @typescript-eslint/no-var-requires */
      const localDotNetJsonModel = jsiiDotNetJsonModel.repository;
      if (await fs.pathExists(localDotNetJsonModel)) {
        localRepos.push(localDotNetJsonModel);
      }
    } catch {
      // Couldn't locate jsii-dotnet-jsonmodel, which is owkay!
    }

    // If dotnet-runtime is checked-out and we can find a local repository, add it to the list.
    try {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const jsiiDotNetRuntime = require('jsii-dotnet-runtime');
      /* eslint-enable @typescript-eslint/no-var-requires */
      const localDotNetRuntime = jsiiDotNetRuntime.repository;
      if (await fs.pathExists(localDotNetRuntime)) {
        localRepos.push(localDotNetRuntime);
      }
    } catch {
      // Couldn't locate jsii-dotnet-runtime, which is owkay!
    }

    logging.debug('local NuGet repos:', localRepos);

    // Construct XML content.
    const configuration = xmlbuilder.create('configuration', { encoding: 'UTF-8' });
    const packageSources = configuration.ele('packageSources');

    const nugetOrgAdd = packageSources.ele('add');
    nugetOrgAdd.att('key', 'nuget.org');
    nugetOrgAdd.att('value', 'https://api.nuget.org/v3/index.json');
    nugetOrgAdd.att('protocolVersion', '3');

    localRepos.forEach((repo, index) => {
      const add = packageSources.ele('add');
      add.att('key', `local-${index}`);
      add.att('value', path.join(repo));
    });

    const xml = configuration.end({ pretty: true });

    // Write XML content to NuGet.config.
    const filePath = path.join(where, 'NuGet.config');
    logging.debug(`Generated ${filePath}`);
    await fs.writeFile(filePath, xml);
  }

  private makeTarget(module: JsiiModule): Dotnet {
    return new Dotnet({
      targetName: this.targetName,
      packageDir: module.moduleDirectory,
      assembly: module.assembly,
      fingerprint: this.options.fingerprint,
      force: this.options.force,
      arguments: this.options.arguments,
      rosetta: this.options.rosetta,
    }, this.modules.map(m => m.name));
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

  protected readonly generator: DotNetGenerator;

  public constructor(options: TargetOptions, assembliesCurrentlyBeingCompiled: string[]) {
    super(options);

    this.generator = new DotNetGenerator(assembliesCurrentlyBeingCompiled);
  }

  /* eslint-disable @typescript-eslint/require-await */
  public async build(_sourceDir: string, _outDir: string): Promise<void> {
    throw new Error('Should not be called; use builder instead');
  }
  /* eslint-enable @typescript-eslint/require-await */
}