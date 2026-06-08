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
