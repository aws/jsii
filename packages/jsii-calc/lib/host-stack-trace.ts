const HOST_STACK_TRACE_SYMBOL = Symbol.for('jsii.context.hostStackTrace');

/**
 * A class that exposes the host stack trace provided by the jsii runtime.
 *
 * This is used for integration testing to verify that stack traces captured
 * in the host language (Python, Java, Go, .NET) are correctly transmitted
 * to the kernel.
 */
export class HostStackTraceReader {
  /**
   * Returns the current host stack trace, if one was provided by the runtime.
   *
   * Each frame is a tuple of [file, line, column, function].
   * Returns undefined if no host stack trace is available.
   */
  public static capturedTrace(): any {
    return (globalThis as any)[HOST_STACK_TRACE_SYMBOL];
  }
}

/**
 * Abstract class that exercises the callback flow for stack trace propagation.
 *
 * The test pattern is:
 * 1. Host overrides `callbackProvider()` to call `HostStackTraceReader.capturedTrace()`
 *    and return the result.
 * 2. Host calls `invokeCallback()`, which calls back into the host.
 * 3. The host's override makes a new request to the kernel to read the trace.
 * 4. The trace captured during that nested request should reflect the host's
 *    callback call site, not the original `invokeCallback()` call site.
 */
export abstract class CallbackStackTraceTest {
  private _traceFromCallback: any;

  /**
   * Override this method. In the implementation, call
   * `HostStackTraceReader.capturedTrace()` and return the result.
   */
  protected abstract callbackProvider(): any;

  /**
   * Call this from the host to trigger the callback flow.
   */
  public invokeCallback(): void {
    this._traceFromCallback = this.callbackProvider();
  }

  /**
   * Returns the trace that was captured during the callback.
   */
  public get traceFromCallback(): any {
    return this._traceFromCallback;
  }
}
