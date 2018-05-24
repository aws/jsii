package org.jsii.tests.calculator;
/**
 * The "+" binary operation.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Add")
public class Add extends org.jsii.tests.calculator.BinaryOperation {
    protected Add(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * @param rhs Right-hand side operand
     * Creates a BinaryOperation
     * @param lhs Left-hand side operand
     * @param rhs Right-hand side operand
     */
    public Add(final org.jsii.tests.calculator.lib.Value lhs, final org.jsii.tests.calculator.lib.Value rhs) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, lhs, rhs);
    }
    /**
     * String representation of the value.
     */
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }
    /**
     * The value.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
