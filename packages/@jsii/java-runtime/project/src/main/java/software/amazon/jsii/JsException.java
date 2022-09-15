package software.amazon.jsii;

/*
 * Represents an error thrown from the user JS library.
 */
public final class JsException extends JsiiBaseException {

  /**
   * Creates an exception.
   * @param message The error message
   */
  JsException(final String message) {
      super(message);
  }

  /**
   * Creates an exception.
   * @param e The error that caused this exception
   */
  JsException(final Throwable e) {
      super(e);
  }

  /**
   * Creates an exception.
   * @param message The error message
   * @param e The error that caused this exception
   */
  JsException(final String message, final Throwable e) {
      super(message, e);
  }
}
