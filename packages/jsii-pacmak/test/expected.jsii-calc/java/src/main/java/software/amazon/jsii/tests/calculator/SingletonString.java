package software.amazon.jsii.tests.calculator;

/**
 * Verifies that singleton enums are handled correctly.
 * 
 * https://github.com/aws/jsii/issues/231
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SingletonString")
public class SingletonString extends software.amazon.jsii.JsiiObject {
    protected SingletonString(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean isSingletonString(final java.lang.String value) {
        return this.jsiiCall("isSingletonString", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }
}
