package software.amazon.jsii.tests.calculator;

/**
 * The negation operation ("-value").
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Negate")
public class Negate extends software.amazon.jsii.tests.calculator.UnaryOperation implements software.amazon.jsii.tests.calculator.IFriendlier {

    protected Negate(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Negate(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param operand This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public Negate(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(operand, "operand is required") });
    }

    /**
     * Say farewell.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String farewell() {
        return this.jsiiCall("farewell", java.lang.String.class);
    }

    /**
     * Say goodbye.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String goodbye() {
        return this.jsiiCall("goodbye", java.lang.String.class);
    }

    /**
     * Say hello!
     * <p>
     * (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }

    /**
     * String representation of the value.
     * <p>
     * (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The value.
     * <p>
     * (deprecated)
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
