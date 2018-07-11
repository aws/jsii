package org.jsii.tests.calculator.lib;
/**
 * Represents a concrete number.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Number")
public class Number extends org.jsii.tests.calculator.lib.Value {
    protected Number(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a Number object.
     * @param value The number.
     */
    public Number(final java.lang.Number value) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(value).toArray());
    }
    /**
     * @param value The number.
     * The number.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
    /**
     * The number multiplied by 2.
     */
    public java.lang.Number getDoubleValue() {
        return this.jsiiGet("doubleValue", java.lang.Number.class);
    }
}
