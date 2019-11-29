package software.amazon.jsii;

/**
 * Represents a promise to a result of an async method execution.
 */
public final class JsiiPromise {
    /**
     * The ID of the promise.
     */
    private String promiseId;

    /**
     * Creates a promise.
     * @param promiseId The ID of the promise.
     */
    public JsiiPromise(final String promiseId) {
        this.promiseId = promiseId;
    }

    /**
     * @return The ID of the promise.
     */
    public String getPromiseId() {
        return promiseId;
    }
}
