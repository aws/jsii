package software.amazon.jsii;

/**
 * An error raised by the jsii runtime.
 */
public abstract class JsiiE extends RuntimeException {
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
    JsiiE(final String message) {
        super(message);
    }

    /**
     * Creates an exception.
     * @param e The error that caused this exception
     */
    JsiiE(final Throwable e) {
        super(e);
    }

    /**
     * Creates an exception.
     * @param message The error message
     * @param e The error that caused this exception
     */
    JsiiE(final String message, final Throwable e) {
        super(message, e);
    }
}
