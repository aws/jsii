import * as fs from 'fs-extra';
import { Assembly, BUNDLE_FILE_NAME, SPEC_FILE_NAME, TypeKind } from 'jsii-spec';
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

    // add code to assembly.
    spec.code = (await fs.readFile(outputFile)).toString();

    const formattedSpec = JSON.stringify(spec, filterEmpty, 2);

    const specOutputFilePath = path.join(outputDir, SPEC_FILE_NAME);
    await fs.writeFile(specOutputFilePath, formattedSpec);

    // TODO (SDK-3495): since js code is now part of the assembly (spec) and the jsii-kernel adds
    // type information in runtime, we can remove this runtime type info decoration.
    const typeinfoSource = generateCodeForTypeInfo(JSON.parse(formattedSpec) as Assembly);
    await new Promise((ok, fail) => fs.appendFile(outputFile, typeinfoSource, err => err ? fail(err) : ok()));

    return outputDir;

    function generateCodeForTypeInfo(assm: Assembly) {
        let sourceCode = "\n\n";

        appendSourceLine('// ================== jsii type info - BEGIN =========================');

        // generates code that adds a __jsii__ property to all constructors
        // with the fqn of the type. this is used to allow runtime code to unmarshall
        // native types given a javascript object.
        if (assm.typecount > 0) {
            Object.keys(assm.types).forEach(name => {
                const type = assm.types[name];
                if (type.kind !== TypeKind.Interface) {
                    const jsiiInfo = { fqn: type.fqn };
                    appendSourceLine(`${name}.__jsii__ = ${JSON.stringify(jsiiInfo)};`);
                }
            });
        }

        // generates code that adds a __jsii__ property to the module itself
        // with the entire spec for runtime inspection.

        appendSourceLine(`${moduleName}.__jsii__ = ${JSON.stringify(assm)};`);

        appendSourceLine('// ================== jsii type info - END =========================');

        return sourceCode;

        function appendSourceLine(line: string) {
            sourceCode += line + '\n';
        }
    }

    function createSourceBundle(): Promise<string> {
        const bundleFileName = BUNDLE_FILE_NAME;
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
                path: outputDir, // TODO: SDK-3495 (emit into a temp directory)
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

        return new Promise<string>((resolve, reject) => {
            webpack(webpackConfig, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    if (stats.hasErrors()) {
                        // tslint:disable-next-line:no-console
                        console.error(stats.toString());
                        process.exit(1);
                    }
                    resolve(path.join(outputDir, bundleFileName));
                }
            });
        });
    }
}
