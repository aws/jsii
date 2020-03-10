package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.OptionalConstructorArgument")
public class OptionalConstructorArgument extends software.amazon.jsii.JsiiObject {

    protected OptionalConstructorArgument(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected OptionalConstructorArgument(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     * @param arg2 This parameter is required.
     * @param arg3
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public OptionalConstructorArgument(final @org.jetbrains.annotations.NotNull java.lang.Number arg1, final @org.jetbrains.annotations.NotNull java.lang.String arg2, final @org.jetbrains.annotations.Nullable java.time.Instant arg3) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), java.util.Objects.requireNonNull(arg2, "arg2 is required"), arg3 });
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     * @param arg2 This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public OptionalConstructorArgument(final @org.jetbrains.annotations.NotNull java.lang.Number arg1, final @org.jetbrains.annotations.NotNull java.lang.String arg2) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), java.util.Objects.requireNonNull(arg2, "arg2 is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getArg1() {
        return this.jsiiGet("arg1", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getArg2() {
        return this.jsiiGet("arg2", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.time.Instant getArg3() {
        return this.jsiiGet("arg3", java.time.Instant.class);
    }
}
