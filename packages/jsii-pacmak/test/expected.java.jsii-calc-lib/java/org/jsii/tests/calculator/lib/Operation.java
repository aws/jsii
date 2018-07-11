package org.jsii.tests.calculator.lib;
/**
 * Represents an operation on values.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Operation")
public abstract class Operation extends org.jsii.tests.calculator.lib.Value {
    protected Operation(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * String representation of the value.
     */
    public abstract java.lang.String toString();
}
