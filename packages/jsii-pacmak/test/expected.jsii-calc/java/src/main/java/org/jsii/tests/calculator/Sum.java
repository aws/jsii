package org.jsii.tests.calculator;
/**
 * An operation that sums multiple values.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Sum")
public class Sum extends org.jsii.tests.calculator.composition.CompositeOperation {
    protected Sum(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Sum() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * The parts to sum.
     */
    public java.util.List<org.jsii.tests.calculator.lib.Value> getParts() {
        return this.jsiiGet("parts", java.util.List.class);
    }
    /**
     * The parts to sum.
     */
    public void setParts(final java.util.List<org.jsii.tests.calculator.lib.Value> value) {
        this.jsiiSet("parts", java.util.Objects.requireNonNull(value, "parts is required"));
    }
    /**
     * The expression that this operation consists of.
     * Must be implemented by derived classes.
     */
    public org.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", org.jsii.tests.calculator.lib.Value.class);
    }
}
