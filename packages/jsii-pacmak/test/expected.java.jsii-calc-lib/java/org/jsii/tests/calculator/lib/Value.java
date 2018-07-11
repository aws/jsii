package org.jsii.tests.calculator.lib;
/**
 * Abstract class which represents a numeric value.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Value")
public abstract class Value extends org.jsii.JsiiObject {
    protected Value(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * String representation of the value.
     */
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }
    /**
     * Returns the name of the class (to verify native type names are created for derived classes).
     */
    public java.lang.Object typeName() {
        return this.jsiiCall("typeName", java.lang.Object.class);
    }
    /**
     * The value.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
