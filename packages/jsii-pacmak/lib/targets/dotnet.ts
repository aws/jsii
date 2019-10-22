import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';
import * as xmlbuilder from 'xmlbuilder';
import * as logging from '../logging';
import { PackageInfo, Target } from '../target';
import { shell } from '../util';
import { DotNetGenerator } from './dotnet/dotnetgenerator';

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

  public async build(sourceDir: string, outDir: string): Promise<void> {
    await this.generateNuGetConfigForLocalDeps(sourceDir, outDir);
    const pkg = await fs.readJson(path.join(this.packageDir, 'package.json'));
    const packageId: string = pkg.jsii.targets.dotnet.packageId;
    const project: string = path.join(packageId, `${packageId}.csproj`);

    await shell(
      'dotnet',
      ['build', project, '-c', 'Release'],
      { cwd: sourceDir }
    );

    await this.copyFiles(
      path.join(sourceDir, packageId, 'bin', 'Release'),
      outDir);
    await fs.remove(path.join(outDir, 'netcoreapp2.1'));
  }

  private async generateNuGetConfigForLocalDeps(sourceDirectory: string, currentOutputDirectory: string): Promise<void> {
    // Traverse the dependency graph of this module and find all modules that have
    // an <outdir>/dotnet directory. We will add those as local NuGet repositories.
    // This enables building against local modules.
    const localRepos = await this.findLocalDepsOutput(this.packageDir);

    // Add the current output directory as a local repo for the case where we build multiple packages
    // into the same output. NuGet throws an error if a source directory doesn't exist, so we check
    // before adding it to the list.
    if (await fs.pathExists(currentOutputDirectory)) {
      localRepos.push(path.resolve(process.cwd(), currentOutputDirectory));
    }

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
    const filePath = path.join(sourceDirectory, 'NuGet.config');
    logging.debug(`Generated ${filePath}`);
    await fs.writeFile(filePath, xml);
  }
}
