package software.amazon.jsii.tests.calculator;

/**
 * Represents an operation with two operands.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.BinaryOperation")
public abstract class BinaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation implements software.amazon.jsii.tests.calculator.lib.IFriendly {
    protected BinaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Say hello!
     */
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }
    /**
     * Left-hand side operand
     */
    public software.amazon.jsii.tests.calculator.lib.Value getLhs() {
        return this.jsiiGet("lhs", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
    /**
     * Right-hand side operand
     */
    public software.amazon.jsii.tests.calculator.lib.Value getRhs() {
        return this.jsiiGet("rhs", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
}
