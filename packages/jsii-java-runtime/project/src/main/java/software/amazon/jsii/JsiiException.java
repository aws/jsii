package software.amazon.jsii;

/**
 * An error raised by the jsii runtime.
 */
public final class JsiiException extends RuntimeException {
    public static final long serialVersionUID = 1L;

    /**
     * Creates an exception.
     * @param message The error message
     */
    public JsiiException(final String message) {
        super(message);
    }

    /**
     * Creates an exception.
     * @param e The error that caused this exception
     */
    public JsiiException(final Throwable e) {
        super(e);
    }

    /**
     * Creates an exception.
     * @param message The error message
     * @param e The error that caused this exception
     */
    public JsiiException(final String message, final Throwable e) {
        super(message, e);
    }
}
