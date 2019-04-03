package software.amazon.jsii.tests.calculator;

/**
 * The "+" binary operation.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Add")
public class Add extends software.amazon.jsii.tests.calculator.BinaryOperation {
    protected Add(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a BinaryOperation.
     * 
     * @param lhs Left-hand side operand.
     * @param rhs Right-hand side operand.
     */
    public Add(final software.amazon.jsii.tests.calculator.lib.Value lhs, final software.amazon.jsii.tests.calculator.lib.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(lhs, "lhs is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(rhs, "rhs is required"))).toArray());
    }

    /**
     * String representation of the value.
     */
    @Override
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The value.
     */
    @Override
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
