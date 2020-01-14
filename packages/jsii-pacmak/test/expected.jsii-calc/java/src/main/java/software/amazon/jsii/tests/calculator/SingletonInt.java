package software.amazon.jsii.tests.calculator;

/**
 * Verifies that singleton enums are handled correctly.
 * <p>
 * https://github.com/aws/jsii/issues/231
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.SingletonInt")
public class SingletonInt extends software.amazon.jsii.JsiiObject {

    protected SingletonInt(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected SingletonInt(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean isSingletonInt(final java.lang.Number value) {
        return this.jsiiCall("isSingletonInt", software.amazon.jsii.NativeType.forClass(java.lang.Boolean.class), new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }
}
