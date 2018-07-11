package org.jsii.tests.calculator;
/**
 * An operation on a single operand.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UnaryOperation")
public abstract class UnaryOperation extends org.jsii.tests.calculator.lib.Operation {
    protected UnaryOperation(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public org.jsii.tests.calculator.lib.Value getOperand() {
        return this.jsiiGet("operand", org.jsii.tests.calculator.lib.Value.class);
    }
}
