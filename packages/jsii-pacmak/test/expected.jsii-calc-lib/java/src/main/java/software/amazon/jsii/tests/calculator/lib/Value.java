package software.amazon.jsii.tests.calculator.lib;

/**
 * Abstract class which represents a numeric value.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Value")
public abstract class Value extends software.amazon.jsii.tests.calculator.base.Base {
    protected Value(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
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
