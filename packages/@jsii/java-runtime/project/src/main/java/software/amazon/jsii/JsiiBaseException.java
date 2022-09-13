package software.amazon.jsii;

/**
 * An error raised by the jsii runtime.
 */
public abstract class JsiiBaseException extends RuntimeException {
    public static enum Type {
        JSII_FAULT("jsii-fault"),
        JS_EXCEPTION("js-error");

        private final String errorType;

        Type(String str) {
            this.errorType = str;
        }

        public String toString() {
            return this.errorType;
        }
    }
    public static final long serialVersionUID = 1L;

    /**
     * Creates an exception.
     * @param message The error message
     */
    JsiiBaseException(final String message) {
        super(message);
    }

    /**
     * Creates an exception.
     * @param e The error that caused this exception
     */
    JsiiBaseException(final Throwable e) {
        super(e);
    }

    /**
     * Creates an exception.
     * @param message The error message
     * @param e The error that caused this exception
     */
    JsiiBaseException(final String message, final Throwable e) {
        super(message, e);
    }
}
