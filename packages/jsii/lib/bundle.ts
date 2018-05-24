import * as path from 'path'
import * as fs from 'fs-extra'
import * as webpack from 'webpack'
import { compilePackage } from './compiler'
import { filterEmpty } from './util'
import { SPEC_FILE_NAME, BUNDLE_FILE_NAME, Assembly, TypeKind } from 'jsii-spec'
import readPackageMetadata from './package-metadata'
import { normalizeJsiiModuleName } from './naming';

export async function bundle(moduleRoot: string) {
    const metadata = await readPackageMetadata(moduleRoot);
    const outputDir = metadata.outdir;
    const entrypoint = metadata.main;

    // make sure output directory is created
    await fs.mkdirs(outputDir);

    // compile the jsii spec and write to .jsii file
    let spec = await compilePackage(moduleRoot);

    let moduleName = spec.name;

    if (spec.typecount === 0) {
        // no exported types - do not create a jsii spec
        return outputDir;
    }

    let outputFile = await createSourceBundle();

    // add code to assembly.
    spec.code = (await fs.readFile(outputFile)).toString();

    let formattedSpec = JSON.stringify(spec, filterEmpty, 2);

    let specOutputFilePath = path.join(outputDir, SPEC_FILE_NAME);
    await fs.writeFile(specOutputFilePath, formattedSpec);



    // TODO (SDK-3495): since js code is now part of the assembly (spec) and the jsii-kernel adds
    // type information in runtime, we can remove this runtime type info decoration.
    let typeinfoSource = generateCodeForTypeInfo(JSON.parse(formattedSpec) as Assembly);
    await new Promise((ok, fail) => fs.appendFile(outputFile, typeinfoSource, err => err ? fail(err) : ok()));

    return outputDir;

    function generateCodeForTypeInfo(spec: Assembly) {
        var sourceCode = "\n\n";

        appendSourceLine('// ================== jsii type info - BEGIN =========================');

        // generates code that adds a __jsii__ property to all constructors
        // with the fqn of the type. this is used to allow runtime code to unmarshall
        // native types given a javascript object.
        if (spec.typecount > 0) {
            Object.keys(spec.types).forEach(name => {
                let type = spec.types[name];
                if (type.kind != TypeKind.Interface) {
                    const jsiiInfo = {
                        fqn: type.fqn
                    }
                    appendSourceLine(`${name}.__jsii__ = ${JSON.stringify(jsiiInfo)};`);
                }
            });
        }

        // generates code that adds a __jsii__ property to the module itself
        // with the entire spec for runtime inspection.

        appendSourceLine(`${moduleName}.__jsii__ = ${JSON.stringify(spec)};`);

        appendSourceLine('// ================== jsii type info - END =========================');

        return sourceCode;

        function appendSourceLine(line: string) {
            sourceCode += line + '\n';
        }
    }

    function createSourceBundle(): Promise<string> {
        let bundleFileName = BUNDLE_FILE_NAME;
        var externals: { [name: string]: string } = { };
        let webpackConfig: webpack.Configuration = {
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
        }

        // add all jsii packages as 'externals', which means they will not be bundled.
        for (let dep in spec.dependencies) {
            if (dep in spec.bundled) {
                continue; // bundle me!
            }

            const originalName = spec.dependencies[dep].package;
            externals[originalName] = normalizeJsiiModuleName(originalName);
        }

        return new Promise<string>((resolve, reject) => {
            webpack(webpackConfig, (err, stats) => {
                if (err) reject(err);
                else {
                    if (stats.hasErrors()) {
                        console.error(stats.toString());
                        process.exit(1);
                    }
                    resolve(path.join(outputDir, bundleFileName));
                }
            });
        });
    }
}
