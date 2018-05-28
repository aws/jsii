package org.jsii.tests.calculator;
/**
 * A calculator which maintains a current value and allows adding operations.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Calculator")
public class Calculator extends org.jsii.tests.calculator.composition.CompositeOperation {
    protected Calculator(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a Calculator object.
     * @param props Initialization properties.
     */
    public Calculator(final org.jsii.tests.calculator.CalculatorProps props) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, props);
    }
    /**
     * Creates a Calculator object.
     */
    public Calculator() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Adds a number to the current value.
     */
    public void add(final java.lang.Number value) {
        this.jsiiCall("add", Void.class, value);
    }
    /**
     * Multiplies the current value by a number.
     */
    public void mul(final java.lang.Number value) {
        this.jsiiCall("mul", Void.class, value);
    }
    /**
     * Raises the current value by a power.
     */
    public void pow(final java.lang.Number value) {
        this.jsiiCall("pow", Void.class, value);
    }
    /**
     * Negates the current value.
     */
    public void neg() {
        this.jsiiCall("neg", Void.class);
    }
    /**
     * Returns teh value of the union property (if defined).
     */
    public java.lang.Number readUnionValue() {
        return this.jsiiCall("readUnionValue", java.lang.Number.class);
    }
    /**
     * The current value.
     */
    public org.jsii.tests.calculator.lib.Value getCurr() {
        return this.jsiiGet("curr", org.jsii.tests.calculator.lib.Value.class);
    }
    /**
     * The current value.
     */
    public void setCurr(final org.jsii.tests.calculator.lib.Value value) {
        this.jsiiSet("curr", value);
    }
    /**
     * A map of per operation name of all operations performed.
     */
    public java.util.Map<java.lang.String, java.util.List<org.jsii.tests.calculator.lib.Value>> getOperationsMap() {
        return this.jsiiGet("operationsMap", java.util.Map.class);
    }
    /**
     * A log of all operations.
     */
    public java.util.List<org.jsii.tests.calculator.lib.Value> getOperationsLog() {
        return this.jsiiGet("operationsLog", java.util.List.class);
    }
    /**
     * The maximum value allows in this calculator.
     */
    public java.lang.Number getMaxValue() {
        return this.jsiiGet("maxValue", java.lang.Number.class);
    }
    /**
     * The maximum value allows in this calculator.
     */
    public void setMaxValue(final java.lang.Number value) {
        this.jsiiSet("maxValue", value);
    }
    /**
     * Returns the expression.
     */
    public org.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", org.jsii.tests.calculator.lib.Value.class);
    }
    /**
     * Example of a property that accepts a union of types.
     */
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }
    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.jsii.tests.calculator.Add value) {
        this.jsiiSet("unionProperty", value);
    }
    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", value);
    }
    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.jsii.tests.calculator.Power value) {
        this.jsiiSet("unionProperty", value);
    }
}
