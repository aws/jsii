package software.amazon.jsii.tests.calculator.lib;

/**
 * Represents an operation on values.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.Operation")
public abstract class Operation extends software.amazon.jsii.tests.calculator.lib.Value {
    protected Operation(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * String representation of the value.
     */
    public abstract java.lang.String toString();
}
