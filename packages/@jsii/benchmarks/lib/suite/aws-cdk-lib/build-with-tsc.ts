import * as fs from 'fs-extra';
import * as path from 'node:path';
import * as process from 'node:process';
import * as ts from 'typescript-3.9';

import type { Context } from '.';

process.once('message', ({ workingDir }: Context) => {
  try {
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

    process.send!({ success: true });
  } catch (error) {
    process.send!({ error });
  }
});
