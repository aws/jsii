package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.VirtualMethodPlayground")
public class VirtualMethodPlayground extends software.amazon.jsii.JsiiObject {

    protected VirtualMethodPlayground(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected VirtualMethodPlayground(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public VirtualMethodPlayground() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param index This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number overrideMeAsync(final @org.jetbrains.annotations.NotNull java.lang.Number index) {
        return this.jsiiAsyncCall("overrideMeAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(index, "index is required") });
    }

    /**
     * @param index This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number overrideMeSync(final @org.jetbrains.annotations.NotNull java.lang.Number index) {
        return this.jsiiCall("overrideMeSync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(index, "index is required") });
    }

    /**
     * @param count This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number parallelSumAsync(final @org.jetbrains.annotations.NotNull java.lang.Number count) {
        return this.jsiiAsyncCall("parallelSumAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }

    /**
     * @param count This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number serialSumAsync(final @org.jetbrains.annotations.NotNull java.lang.Number count) {
        return this.jsiiAsyncCall("serialSumAsync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }

    /**
     * @param count This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number sumSync(final @org.jetbrains.annotations.NotNull java.lang.Number count) {
        return this.jsiiCall("sumSync", java.lang.Number.class, new Object[] { java.util.Objects.requireNonNull(count, "count is required") });
    }
}
