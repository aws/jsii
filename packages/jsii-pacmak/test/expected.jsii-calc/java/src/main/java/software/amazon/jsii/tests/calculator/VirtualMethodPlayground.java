package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VirtualMethodPlayground")
public class VirtualMethodPlayground extends software.amazon.jsii.JsiiObject {

    protected VirtualMethodPlayground(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected VirtualMethodPlayground(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public VirtualMethodPlayground() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number overrideMeAsync(final java.lang.Number index) {
        return this.jsiiAsyncCall("overrideMeAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(index, "index is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number overrideMeSync(final java.lang.Number index) {
        return this.jsiiCall("overrideMeSync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(index, "index is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number parallelSumAsync(final java.lang.Number count) {
        return this.jsiiAsyncCall("parallelSumAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number serialSumAsync(final java.lang.Number count) {
        return this.jsiiAsyncCall("serialSumAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number sumSync(final java.lang.Number count) {
        return this.jsiiCall("sumSync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }
}
