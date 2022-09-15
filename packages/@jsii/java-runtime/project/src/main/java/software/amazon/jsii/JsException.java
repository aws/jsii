package software.amazon.jsii;

/*
 * Represents an error thrown from the user JS library.
 */
public final class JSException extends JsiiBaseException {

  /**
   * Creates an exception.
   * @param message The error message
   */
  JSException(final String message) {
      super(message);
  }

  /**
   * Creates an exception.
   * @param e The error that caused this exception
   */
  JSException(final Throwable e) {
      super(e);
  }

  /**
   * Creates an exception.
   * @param message The error message
   * @param e The error that caused this exception
   */
  JSException(final String message, final Throwable e) {
      super(message, e);
  }
}
