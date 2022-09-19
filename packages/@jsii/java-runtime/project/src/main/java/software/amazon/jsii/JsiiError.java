package software.amazon.jsii;

/**
 * A nonrecoverable error from the jsii runtime,
 * usually the kernel.
 */
public class JsiiError extends JsiiException {
  /**
   * Creates an exception.
   * @param message The error message
   */
  JsiiError(final String message) {
      super(message);
  }

  /**
   * Creates an exception.
   * @param e The error that caused this exception
   */
  JsiiError(final Throwable e) {
      super(e);
  }

  /**
   * Creates an exception.
   * @param message The error message
   * @param e The error that caused this exception
   */
  JsiiError(final String message, final Throwable e) {
      super(message, e);
  }
}
