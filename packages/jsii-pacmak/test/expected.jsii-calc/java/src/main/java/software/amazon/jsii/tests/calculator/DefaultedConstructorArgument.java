package software.amazon.jsii.tests.calculator;

/**
 *  (experimental)
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DefaultedConstructorArgument")
public class DefaultedConstructorArgument extends software.amazon.jsii.JsiiObject {

    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param arg1
     * @param arg2
     * @param arg3
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1, final @org.jetbrains.annotations.Nullable java.lang.String arg2, final @org.jetbrains.annotations.Nullable java.time.Instant arg3) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1, arg2, arg3 });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param arg1
     * @param arg2
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1, final @org.jetbrains.annotations.Nullable java.lang.String arg2) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1, arg2 });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param arg1
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1 });
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public DefaultedConstructorArgument() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getArg1() {
        return this.jsiiGet("arg1", java.lang.Number.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.time.Instant getArg3() {
        return this.jsiiGet("arg3", java.time.Instant.class);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.String getArg2() {
        return this.jsiiGet("arg2", java.lang.String.class);
    }
}
