import childProcess = require('child_process');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');
import xmlbuilder = require('xmlbuilder');
import { IGenerator } from '../generator';
import logging = require('../logging');
import { Target, TargetOptions } from '../target';
import { shell } from '../util';

export default class Dotnet extends Target {
    protected readonly generator = new DotNetGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(sourceDir: string, outDir: string): Promise<void> {
        await this.generateNuGetConfigForLocalDeps(sourceDir, outDir);

        const pkg = await fs.readJson(path.join(this.packageDir, 'package.json'));
        const packageId: string = pkg.jsii.targets.dotnet.packageId;
        const project: string = path.join(packageId, `${packageId}.csproj`);

        await shell(
            'dotnet',
            [ 'build', project, '-c', 'Release' ],
            { cwd: sourceDir }
        );

        await this.copyFiles(
            path.join(sourceDir, packageId, 'bin', 'Release'),
            path.join(outDir, this.targetName));
        await fs.remove(path.join(outDir, 'netstandard2.0'));
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
            localRepos.push(currentOutputDirectory);
        }

        // If dotnet-jsonmodel is checked-out and we can find a local repository, add it to the list.
        try {
            const jsiiDotNetJsonModel = require('jsii-dotnet-jsonmodel');
            const localDotNetJsonModel = jsiiDotNetJsonModel.repository;
            if (await fs.pathExists(localDotNetJsonModel)) {
                localRepos.push(localDotNetJsonModel);
            }
        } catch {
            // Couldn't locate jsii-dotnet-jsonmodel, which is owkay!
        }

        // If dotnet-runtime is checked-out and we can find a local repository, add it to the list.
        try {
            const jsiiDotNetRuntime = require('jsii-dotnet-runtime');
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

// ##################
// # CODE GENERATOR #
// ##################

class DotNetGenerator implements IGenerator {
    private jsiiFile: string;

    public generate(): void {
        // The DotNet generator does not currently support in-memory generation.
        // Support can be added relatively easily if necessary.
    }

    public async load(packageRoot: string) {
        this.jsiiFile = path.join(packageRoot, spec.SPEC_FILE_NAME);
    }

    public upToDate(_: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public save(outdir: string, tarball: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const cliPath = path.join(__dirname, 'dotnet-generator', 'Amazon.JSII.Generator.CLI.dll');
            const cli = childProcess.spawn(
                'dotnet',
                [cliPath, '--jsii', this.jsiiFile, '--tarball', tarball, '--output', outdir],
                { stdio: 'inherit' }
            );

            cli.once('exit', code => {
                if (code === 0) {
                    return resolve();
                } else {
                    return reject(new Error(`jsii-dotnet-generator exited with code ${code}`));
                }
            });

            cli.once('error', err => reject(err));
        });
    }
}
