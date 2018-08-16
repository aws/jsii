package software.amazon.jsii.tests.calculator;

/**
 * An operation on a single operand.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UnaryOperation")
public abstract class UnaryOperation extends software.amazon.jsii.tests.calculator.lib.Operation {
    protected UnaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }

    public software.amazon.jsii.tests.calculator.lib.Value getOperand() {
        return this.jsiiGet("operand", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
}
