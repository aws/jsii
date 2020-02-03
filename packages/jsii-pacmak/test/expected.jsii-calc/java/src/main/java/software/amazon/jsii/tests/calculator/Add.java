package software.amazon.jsii.tests.calculator;

/**
 * The "+" binary operation.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Add")
public class Add extends software.amazon.jsii.tests.calculator.BinaryOperation {

    protected Add(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Add(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Add(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value lhs, final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") });
    }

    /**
     * String representation of the value.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The value.
     * <p>
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
