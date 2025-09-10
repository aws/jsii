import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as xmlbuilder from 'xmlbuilder';

import { TargetBuilder, BuildOptions } from '../builder';
import * as logging from '../logging';
import { JsiiModule } from '../packaging';
import {
  PackageInfo,
  Target,
  TargetOptions,
  findLocalBuildDirs,
} from '../target';
import { subprocess, Scratch, setExtend, filterAsync } from '../util';
import { DotNetGenerator } from './dotnet/dotnetgenerator';
import { toReleaseVersion } from './version-utils';

import { TargetName } from '.';

export const TARGET_FRAMEWORK = 'net6.0';

/**
 * Build .NET packages all together, by generating an aggregate solution file
 */
export class DotnetBuilder implements TargetBuilder {
  private readonly targetName = 'dotnet';

  public constructor(
    private readonly modules: readonly JsiiModule[],
    private readonly options: BuildOptions,
  ) {}

  public async buildModules(): Promise<void> {
    if (this.modules.length === 0) {
      return;
    }

    if (this.options.codeOnly) {
      // Simple, just generate code to respective output dirs
      await Promise.all(
        this.modules.map((module) =>
          this.generateModuleCode(
            module,
            this.outputDir(module.outputDirectory),
          ),
        ),
      );
      return;
    }

    // Otherwise make a single tempdir to hold all sources, build them together and copy them back out
    const scratchDirs: Array<Scratch<any>> = [];
    try {
      const tempSourceDir = await this.generateAggregateSourceDir(this.modules);
      scratchDirs.push(tempSourceDir);

      // Build solution
      logging.debug('Building .NET');
      await subprocess(
        'dotnet',
        ['build', '--force', '--configuration', 'Release'],
        {
          cwd: tempSourceDir.directory,
          retry: { maxAttempts: 5 },
        },
      );

      await this.copyOutArtifacts(tempSourceDir.object);
      if (this.options.clean) {
        await Scratch.cleanupAll(scratchDirs);
      }
    } catch (e) {
      logging.warn(
        `Exception occurred, not cleaning up ${scratchDirs
          .map((s) => s.directory)
          .join(', ')}`,
      );
      throw e;
    }
  }

  private async generateAggregateSourceDir(
    modules: readonly JsiiModule[],
  ): Promise<Scratch<TemporaryDotnetPackage[]>> {
    return Scratch.make(async (tmpDir: string) => {
      logging.debug(`Generating aggregate .NET source dir at ${tmpDir}`);

      const csProjs = [];
      const ret: TemporaryDotnetPackage[] = [];

      // Code generator will make its own subdirectory
      const generatedModules = modules.map((mod) =>
        this.generateModuleCode(mod, tmpDir).then(() => mod),
      );

      for (const mod of await Promise.all(generatedModules)) {
        const loc = projectLocation(mod);
        csProjs.push(loc.projectFile);
        ret.push({
          outputTargetDirectory: mod.outputDirectory,
          artifactsDir: path.join(tmpDir, loc.projectDir, 'bin', 'Release'),
        });
      }

      // Use 'dotnet' command line tool to build a solution file from these csprojs
      await subprocess('dotnet', ['new', 'sln', '-n', 'JsiiBuild'], {
        cwd: tmpDir,
      });
      await subprocess('dotnet', ['sln', 'add', ...csProjs], { cwd: tmpDir });

      await this.generateNuGetConfigForLocalDeps(tmpDir);

      return ret;
    });
  }

  private async copyOutArtifacts(packages: TemporaryDotnetPackage[]) {
    logging.debug('Copying out .NET artifacts');

    await Promise.all(packages.map(copyOutIndividualArtifacts.bind(this)));

    async function copyOutIndividualArtifacts(
      this: DotnetBuilder,
      pkg: TemporaryDotnetPackage,
    ) {
      const targetDirectory = this.outputDir(pkg.outputTargetDirectory);

      await fs.mkdirp(targetDirectory);
      await fs.copy(pkg.artifactsDir, targetDirectory, {
        recursive: true,
        filter: (_, dst) => {
          return dst !== path.join(targetDirectory, TARGET_FRAMEWORK);
        },
      });
    }
  }

  private async generateModuleCode(
    module: JsiiModule,
    where: string,
  ): Promise<void> {
    const target = this.makeTarget(module);
    logging.debug(`Generating ${this.targetName} code into ${where}`);
    await target.generateCode(where, module.tarball);
  }

  /**
   * Decide whether or not to append 'dotnet' to the given output directory
   */
  private outputDir(declaredDir: string) {
    return this.options.languageSubdirectory
      ? path.join(declaredDir, this.targetName)
      : declaredDir;
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

    const resolvedModules = this.modules.map(async (module) => ({
      module,
      localBuildDirs: await findLocalBuildDirs(
        module.moduleDirectory,
        this.targetName,
      ),
    }));
    for (const { module, localBuildDirs } of await Promise.all(
      resolvedModules,
    )) {
      setExtend(allDepsOutputDirs, localBuildDirs);

      // Also include output directory where we're building to, in case we build multiple packages into
      // the same output directory.
      allDepsOutputDirs.add(this.outputDir(module.outputDirectory));
    }

    const localRepos = Array.from(allDepsOutputDirs);

    // If dotnet-runtime is checked-out and we can find a local repository, add it to the list.
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports,import/no-extraneous-dependencies
      const jsiiDotNetRuntime = require('@jsii/dotnet-runtime');
      logging.info(
        `Using local version of the DotNet jsii runtime package at: ${jsiiDotNetRuntime.repository}`,
      );
      localRepos.push(jsiiDotNetRuntime.repository);
    } catch {
      // Couldn't locate @jsii/dotnet-runtime, which is owkay!
    }

    // Filter out nonexistant directories, .NET will be unhappy if paths don't exist
    const existingLocalRepos = await filterAsync(localRepos, fs.pathExists);

    logging.debug('local NuGet repos:', existingLocalRepos);

    // Construct XML content.
    const configuration = xmlbuilder.create('configuration', {
      encoding: 'UTF-8',
    });
    const packageSources = configuration.ele('packageSources');

    const nugetOrgAdd = packageSources.ele('add');
    nugetOrgAdd.att('key', 'nuget.org');
    nugetOrgAdd.att('value', 'https://api.nuget.org/v3/index.json');
    nugetOrgAdd.att('protocolVersion', '3');

    existingLocalRepos.forEach((repo, index) => {
      const add = packageSources.ele('add');
      add.att('key', `local-${index}`);
      add.att('value', path.join(repo));
    });

    if (this.options.arguments['dotnet-nuget-global-packages-folder']) {
      // Ensure we're not using the configured cache folder
      configuration
        .ele('config')
        .ele('add')
        .att('key', 'globalPackagesFolder')
        .att(
          'value',
          path.resolve(
            this.options.arguments['dotnet-nuget-global-packages-folder'],
            '.nuget',
            'packages',
          ),
        );
    }

    const xml = configuration.end({ pretty: true });

    // Write XML content to NuGet.config.
    const filePath = path.join(where, 'NuGet.config');
    logging.debug(`Generated ${filePath}`);
    await fs.writeFile(filePath, xml);
  }

  private makeTarget(module: JsiiModule): Dotnet {
    return new Dotnet(
      {
        arguments: this.options.arguments,
        assembly: module.assembly,
        fingerprint: this.options.fingerprint,
        force: this.options.force,
        packageDir: module.moduleDirectory,
        rosetta: this.options.rosetta,
        runtimeTypeChecking: this.options.runtimeTypeChecking,
        targetName: this.targetName,
      },
      this.modules.map((m) => m.name),
    );
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
    projectFile: path.join(packageId, `${packageId}.csproj`),
  };
}

export default class Dotnet extends Target {
  public static toPackageInfos(assm: spec.Assembly): {
    [language: string]: PackageInfo;
  } {
    const packageId = assm.targets!.dotnet!.packageId;
    const version = toReleaseVersion(assm.version, TargetName.DOTNET);
    const packageInfo: PackageInfo = {
      repository: 'Nuget',
      url: `https://www.nuget.org/packages/${packageId}/${version}`,
      usage: {
        csproj: {
          language: 'xml',
          code: `<PackageReference Include="${packageId}" Version="${version}" />`,
        },
        dotnet: {
          language: 'console',
          code: `dotnet add package ${packageId} --version ${version}`,
        },
        'packages.config': {
          language: 'xml',
          code: `<package id="${packageId}" version="${version}" />`,
        },
      },
    };
    return { 'C#': packageInfo };
  }

  public static toNativeReference(_type: spec.Type, options: any) {
    return {
      'c#': `using ${options.namespace};`,
    };
  }

  protected readonly generator: DotNetGenerator;

  public constructor(
    options: TargetOptions,
    assembliesCurrentlyBeingCompiled: string[],
  ) {
    super(options);

    this.generator = new DotNetGenerator(
      assembliesCurrentlyBeingCompiled,
      options,
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async build(_sourceDir: string, _outDir: string): Promise<void> {
    throw new Error('Should not be called; use builder instead');
  }
  /* eslint-enable @typescript-eslint/require-await */
}
