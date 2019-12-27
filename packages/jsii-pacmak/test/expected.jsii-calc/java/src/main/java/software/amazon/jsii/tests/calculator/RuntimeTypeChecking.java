package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.RuntimeTypeChecking")
public class RuntimeTypeChecking extends software.amazon.jsii.JsiiObject {

    protected RuntimeTypeChecking(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected RuntimeTypeChecking(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public RuntimeTypeChecking() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1
     * @param arg2
     * @param arg3
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithDefaultedArguments(final java.lang.Number arg1, final java.lang.String arg2, final java.time.Instant arg3) {
        this.jsiiCall("methodWithDefaultedArguments", Void.class, new Object[] { arg1, arg2, arg3 });
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1
     * @param arg2
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithDefaultedArguments(final java.lang.Number arg1, final java.lang.String arg2) {
        this.jsiiCall("methodWithDefaultedArguments", Void.class, new Object[] { arg1, arg2 });
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg1
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithDefaultedArguments(final java.lang.Number arg1) {
        this.jsiiCall("methodWithDefaultedArguments", Void.class, new Object[] { arg1 });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithDefaultedArguments() {
        this.jsiiCall("methodWithDefaultedArguments", Void.class);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param arg
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithOptionalAnyArgument(final java.lang.Object arg) {
        this.jsiiCall("methodWithOptionalAnyArgument", Void.class, new Object[] { arg });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithOptionalAnyArgument() {
        this.jsiiCall("methodWithOptionalAnyArgument", Void.class);
    }

    /**
     * Used to verify verification of number of method arguments.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     * @param arg2 This parameter is required.
     * @param arg3
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithOptionalArguments(final java.lang.Number arg1, final java.lang.String arg2, final java.time.Instant arg3) {
        this.jsiiCall("methodWithOptionalArguments", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), java.util.Objects.requireNonNull(arg2, "arg2 is required"), arg3 });
    }

    /**
     * Used to verify verification of number of method arguments.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param arg1 This parameter is required.
     * @param arg2 This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void methodWithOptionalArguments(final java.lang.Number arg1, final java.lang.String arg2) {
        this.jsiiCall("methodWithOptionalArguments", Void.class, new Object[] { java.util.Objects.requireNonNull(arg1, "arg1 is required"), java.util.Objects.requireNonNull(arg2, "arg2 is required") });
    }
}
