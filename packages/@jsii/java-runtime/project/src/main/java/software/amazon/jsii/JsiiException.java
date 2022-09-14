package software.amazon.jsii;

/*
 * Represents an irrecoverable error, likely thrown from the kernel.
 */
public final class JsiiException extends JsiiBaseException {

  /**
   * Creates an exception.
   * @param message The error message
   */
  JsiiException(final String message) {
      super(message);
  }

  /**
   * Creates an exception.
   * @param e The error that caused this exception
   */
  JsiiException(final Throwable e) {
      super(e);
  }

  /**
   * Creates an exception.
   * @param message The error message
   * @param e The error that caused this exception
   */
  JsiiException(final String message, final Throwable e) {
      super(message, e);
  }
}
