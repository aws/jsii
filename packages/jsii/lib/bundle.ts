import * as fs from 'fs-extra';
import { SPEC_FILE_NAME } from 'jsii-spec';
import * as os from 'os';
import * as path from 'path';
import * as webpack from 'webpack';
import { compilePackage } from './compiler';
import { normalizeJsiiModuleName } from './naming';
import readPackageMetadata from './package-metadata';
import { filterEmpty } from './util';

export async function bundle(moduleRoot: string) {
    const metadata = await readPackageMetadata(moduleRoot);
    const outputDir = metadata.outdir;
    const entrypoint = metadata.main;

    // make sure output directory is created
    await fs.mkdirs(outputDir);

    // compile the jsii spec and write to .jsii file
    const spec = await compilePackage(moduleRoot);

    const moduleName = spec.name;

    if (spec.typecount === 0) {
        // no exported types - do not create a jsii spec
        return outputDir;
    }

    const outputFile = await createSourceBundle();
    try {
        // add code to assembly.
        spec.code = await fs.readFile(outputFile, { encoding: 'utf-8' });
    } finally {
        await fs.unlink(outputFile);
    }

    const specOutputFilePath = path.join(outputDir, SPEC_FILE_NAME);
    await fs.writeJson(specOutputFilePath, spec, { replacer: filterEmpty, spaces: 2 });

    return outputDir;

    async function createSourceBundle(): Promise<string> {
        const bundleFileName = 'bundle.js';
        const externals: { [name: string]: string } = { };
        const webpackConfig: webpack.Configuration = {
            devtool: 'inline-source-map',
            entry: entrypoint,
            externals,
            context: path.resolve(path.join(__dirname, '..')),
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: ['source-map-loader'],
                        enforce: 'pre'
                    }
                ]
            },
            node: {
                __dirname: true,
                __filename: true,
                Buffer: false,
                console: false,
                global: false,
                process: false,
                setImmediate: false,
            },
            output: {
                path: await fs.mkdtemp(os.tmpdir() + path.sep),
                filename: bundleFileName,
                library: moduleName,
                libraryTarget: 'var',
            },
            target: 'node'
        };

        // add all jsii packages as 'externals', which means they will not be bundled.
        for (const dep in spec.dependencies) {
            if (dep in spec.bundled) {
                continue; // bundle me!
            }

            const originalName = spec.dependencies[dep].package;
            externals[originalName] = normalizeJsiiModuleName(originalName);
        }

        return await new Promise<string>((resolve, reject) => {
            webpack(webpackConfig, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    if (stats.hasErrors()) {
                        // tslint:disable-next-line:no-console
                        console.error(stats.toString());
                        process.exit(1);
                    }
                    resolve(path.join(webpackConfig.output!.path!, bundleFileName));
                }
            });
        });
    }
}
