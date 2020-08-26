package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DefaultedConstructorArgument")
public class DefaultedConstructorArgument extends software.amazon.jsii.JsiiObject {

    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param arg1
     * @param arg2
     * @param arg3
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1, final @org.jetbrains.annotations.Nullable java.lang.String arg2, final @org.jetbrains.annotations.Nullable java.time.Instant arg3) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1, arg2, arg3 });
    }

    /**
     * @param arg1
     * @param arg2
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1, final @org.jetbrains.annotations.Nullable java.lang.String arg2) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1, arg2 });
    }

    /**
     * @param arg1
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DefaultedConstructorArgument(final @org.jetbrains.annotations.Nullable java.lang.Number arg1) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { arg1 });
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public DefaultedConstructorArgument() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number getArg1() {
        return this.jsiiGet("arg1", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.time.Instant getArg3() {
        return this.jsiiGet("arg3", java.time.Instant.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.Nullable java.lang.String getArg2() {
        return this.jsiiGet("arg2", java.lang.String.class);
    }
}
