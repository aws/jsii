import { Compiler } from 'jsii/lib/compiler';
import { loadProjectInfo } from 'jsii/lib/project-info';
import * as path from 'node:path';
import * as process from 'node:process';
import * as ts from 'typescript';

import type { Context } from '.';

process.once('message', ({ workingDir }: Context) => {
  try {
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
    process.send!({ success: true });
  } catch (error) {
    process.send!({ error });
  }
});
