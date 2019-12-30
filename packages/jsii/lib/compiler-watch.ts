import { EventEmitter } from 'events';
import {
  createSemanticDiagnosticsBuilderProgram,
  createWatchCompilerHost,
  createWatchProgram,
  CompilerOptions,
  Program,
  Watch,
  WatchStatusReporter,
  sys,
} from 'typescript';
import { EmitResult } from './emitter';
import { ProjectInfo } from './project-info';

/**
 * A handle to a watch-mode operation.
 */
export class CompilerWatch {
  /**
   * The name of the event generated when a compilation cycle completes.
   */
  public static readonly EVENT_COMPILATION_COMPLETE = 'compilationComplete';

  private readonly eventEmitter = new EventEmitter();
  private readonly watch: Watch<any>;

  /**
   * A promise to the last compilation result achieved when the `.close()` method is called.
   */
  private readonly watchComplete: Promise<EmitResult>;
  /**
   * This is the "resolve" handler of `this.watchComplete`, and it's actually guaranteed to be set,
   * and shouldn't be re-written to.
   */
  private onWatchEnd!: (lastResult: EmitResult) => void;
  /**
   * This is the "reject" handler of `this.watchComplete`, and it's actually guaranteed to be set,
   * and hsouldn't be re-written to.
   */
  private onWatchFailed!: (error: Error) => void;
  /**
   * The result of the last completed compilation cycle.
   */
  private lastResult?: EmitResult;

  /**
   * @internal
   */
  public constructor(
    projectInfo: ProjectInfo,
    configPath: string,
    compilerOptions: CompilerOptions,
    onCompilationComplete: TypeScriptProgramHandler,
    onStatusChanged?: WatchStatusReporter,
  ) {
    const host = createWatchCompilerHost(
      configPath,
      {
        ...projectInfo.tsc,
        ...compilerOptions,
        noEmitOnError: false,
      },
      { ...sys, getCurrentDirectory() { return projectInfo.projectRoot; } },
      createSemanticDiagnosticsBuilderProgram,
      undefined, // reportDiagnostics -> We don't pass this because we have our own reporting mechanism
      onStatusChanged,
    );

    if (!host.getDefaultLibLocation) {
      throw new Error('No default library location was found on the TypeScript compiler host!');
    }
    const orig = host.afterProgramCreate?.bind(host);
    host.afterProgramCreate = async builderProgram => {
      this.lastResult = await onCompilationComplete(builderProgram.getProgram(), host.getDefaultLibLocation!());
      if (orig != null) { orig(builderProgram); }
      this.eventEmitter.emit(CompilerWatch.EVENT_COMPILATION_COMPLETE, this.lastResult, this);
    };

    this.watch = createWatchProgram(host);
    this.watchComplete = new Promise((resolve, reject) => {
      this.onWatchEnd = resolve;
      this.onWatchFailed = reject;
    });
  }

  /**
   * Adds a listener for the 'result' event that is called with EmitResult.
   *
   * @param event    the 'result' event
   * @param listener the listener to be called with the EmitResult.
   */
  public on(event: typeof CompilerWatch.EVENT_COMPILATION_COMPLETE, listener: CompilationCompleteHandler): this {
    this.eventEmitter.on(event, listener);
    return this;
  }

  /**
   * @param timeoutMillis the maximum amount of time to wait for the watch to complete. When
   *                      provided, the returned promise will reject if it is not resolved by the
   *                      end of this amount of time.
   *
   * @returns a `Promise` that only resolves once the `.close()` method was invoked.
   */
  public async block(timeoutMillis?: number): Promise<EmitResult> {
    const promises = [this.watchComplete];

    if (timeoutMillis != null) {
      // This Promise will reject after timeoutMillis
      promises.push(new Promise<never>((_, reject) => {
        const id = setTimeout(
          () => {
            clearTimeout(id);
            reject(new Error(`Watch did not terminate within ${timeoutMillis} ms!`));
          },
          timeoutMillis,
        );
      }));
    }

    // Wait for one of the `promises` to resolve or reject (whichever comes first)!
    return Promise.race(promises);
  }

  /**
   * Terminates the watch process.
   */
  public close(): void {
    // Calling `this.watch.close()` will "synchronize" the watch, and emit once last time
    this.eventEmitter.once(CompilerWatch.EVENT_COMPILATION_COMPLETE, this.onWatchEnd);
    this.watch.close();
    if (this.lastResult) {
      this.onWatchEnd(this.lastResult);
    } else {
      this.onWatchFailed(new Error('Watch aborted before the first compilation completed!'));
    }
  }
}

/**
 * Consumes a TypeScript Program, and it's default "lib" location, and produces an EmitResult.
 *
 * @param program the TypeScript program that just finished compiling.
 * @param stdlib  the location of the TypeScript standard library for this program.
 *
 * @returns the emit result for processing the program.
 */
export type TypeScriptProgramHandler = (program: Program, stdlib: string) => Promise<EmitResult>;

/**
 * Handler for the CompilerWatch.EVENT_COMPILATION_COMPLETE event.
 *
 * @param result the result of the compilation that triggered this event.
 * @param watch  the watch that emitted the event.
 */
export type CompilationCompleteHandler = (result: EmitResult, watch: CompilerWatch) => void;
