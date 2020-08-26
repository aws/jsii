package software.amazon.jsii.tests.calculator;

/**
 * The "*" binary operation.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Multiply")
public class Multiply extends software.amazon.jsii.tests.calculator.BinaryOperation implements software.amazon.jsii.tests.calculator.IFriendlier, software.amazon.jsii.tests.calculator.IRandomNumberGenerator {

    protected Multiply(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Multiply(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * <p>
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public Multiply(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value lhs, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") });
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
     * Returns another random number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.Number next() {
        return this.jsiiCall("next", java.lang.Number.class);
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
