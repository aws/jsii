import * as cp from 'child_process';
import * as fs from 'fs-extra';
import { Compiler } from 'jsii/lib/compiler';
import { loadProjectInfo } from 'jsii/lib/project-info';
import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript-3.9';

import { Benchmark } from './benchmark';
import { cdkv2_21_1, cdkTagv2_21_1 } from './constants';
import { inDirectory, streamUntar } from './util';

// Using the local `npm` package (from dependencies)
const npm = path.resolve(__dirname, '..', 'node_modules', '.bin', 'npm');

export const benchmarks = [
  // Reference comparison using the TypeScript compiler
  new Benchmark(`Compile aws-cdk-lib@${cdkTagv2_21_1} (tsc)`)
    .setup(async () => {
      const sourceDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'jsii-cdk-bench-snapshot'),
      );
      await streamUntar(cdkv2_21_1, { cwd: sourceDir });
      cp.execSync(`${npm} ci`, { cwd: sourceDir });

      // Working directory for benchmark
      const workingDir = fs.mkdtempSync(
        path.join(os.tmpdir(), `tsc-cdk-bench@${cdkTagv2_21_1}`),
      );

      return {
        workingDir,
        sourceDir,
      } as const;
    })
    .beforeEach(({ workingDir, sourceDir }) => {
      fs.removeSync(workingDir);
      fs.copySync(sourceDir, workingDir);
    })
    .subject(({ workingDir }) =>
      inDirectory(workingDir, () => {
        const { host, options, rootNames } = (function () {
          const parsed = ts.parseJsonConfigFileContent(
            fs.readJsonSync(path.join(workingDir, 'tsconfig.json')),
            ts.sys,
            workingDir,
            {
              module: ts.ModuleKind.CommonJS,
              moduleResolution: ts.ModuleResolutionKind.NodeJs,
              newLine: ts.NewLineKind.LineFeed,
              tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            },
            'tsconfig.json',
          );

          const host = ts.createIncrementalCompilerHost(parsed.options, ts.sys);

          return {
            host,
            options: parsed.options,
            rootNames: [
              ...parsed.fileNames,
              ...(parsed.options.lib && host.getDefaultLibLocation != null
                ? parsed.options.lib.map((lib) =>
                    path.join(host.getDefaultLibLocation!(), lib),
                  )
                : []),
            ],
          };
        })();

        const program = ts
          .createIncrementalProgram({
            createProgram: ts.createEmitAndSemanticDiagnosticsBuilderProgram,
            host,
            options,
            rootNames,
          })
          .getProgram();

        const preEmitDiagnostics = ts.getPreEmitDiagnostics(program);
        if (
          preEmitDiagnostics.some(
            (diag) => diag.category === ts.DiagnosticCategory.Error,
          )
        ) {
          console.error(
            ts.formatDiagnosticsWithColorAndContext(
              preEmitDiagnostics
                .filter((diag) => diag.category === ts.DiagnosticCategory.Error)
                .slice(0, 10),
              host,
            ),
          );
          throw new Error(`TypeScript compiler emitted pre-emit errors!`);
        }

        const emitResult = program.emit();
        if (
          emitResult.diagnostics.some(
            (diag) => diag.category === ts.DiagnosticCategory.Error,
          )
        ) {
          console.error(
            ts.formatDiagnosticsWithColorAndContext(
              emitResult.diagnostics.filter(
                (diag) => diag.category === ts.DiagnosticCategory.Error,
              ),
              host,
            ),
          );
          throw new Error(`TypeScript compiler emitted errors!`);
        }
      }),
    )
    .teardown(({ workingDir, sourceDir }) => {
      fs.removeSync(workingDir);
      fs.removeSync(sourceDir);
    }),

  // Always run against the same version of CDK source
  new Benchmark(`Compile aws-cdk-lib@${cdkTagv2_21_1}`)
    .setup(async () => {
      const sourceDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'jsii-cdk-bench-snapshot'),
      );
      await streamUntar(cdkv2_21_1, { cwd: sourceDir });
      cp.execSync(`${npm} ci`, { cwd: sourceDir });

      // Working directory for benchmark
      const workingDir = fs.mkdtempSync(
        path.join(os.tmpdir(), `jsii-cdk-bench@${cdkTagv2_21_1}`),
      );

      return {
        workingDir,
        sourceDir,
      } as const;
    })
    .beforeEach(({ workingDir, sourceDir }) => {
      fs.removeSync(workingDir);
      fs.copySync(sourceDir, workingDir);
    })
    .subject(({ workingDir }) =>
      inDirectory(workingDir, () => {
        const { projectInfo } = loadProjectInfo(workingDir);
        const compiler = new Compiler({ projectInfo });

        const result = compiler.emit();
        if (
          result.diagnostics.some(
            (diag) => diag.category === ts.DiagnosticCategory.Error,
          )
        ) {
          console.error(
            ts.formatDiagnosticsWithColorAndContext(
              result.diagnostics.filter(
                (diag) => diag.category === ts.DiagnosticCategory.Error,
              ),
              {
                getCurrentDirectory: () => workingDir,
                getCanonicalFileName: path.resolve,
                getNewLine: () => ts.sys.newLine,
              },
            ),
          );
          throw new Error(`jsii compiler emitted errors!`);
        }
      }),
    )
    .teardown(({ workingDir, sourceDir }) => {
      fs.removeSync(workingDir);
      fs.removeSync(sourceDir);
    }),
];
