package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DoNotOverridePrivates")
public class DoNotOverridePrivates extends software.amazon.jsii.JsiiObject {
    protected DoNotOverridePrivates(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DoNotOverridePrivates() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void changePrivatePropertyValue(final java.lang.String newValue) {
        this.jsiiCall("changePrivatePropertyValue", Void.class, new Object[] { java.util.Objects.requireNonNull(newValue, "newValue is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String privateMethodValue() {
        return this.jsiiCall("privateMethodValue", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String privatePropertyValue() {
        return this.jsiiCall("privatePropertyValue", java.lang.String.class);
    }
}
