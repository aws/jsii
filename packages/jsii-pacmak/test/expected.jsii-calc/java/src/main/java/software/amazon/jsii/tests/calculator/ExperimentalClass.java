package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ExperimentalClass")
public class ExperimentalClass extends software.amazon.jsii.JsiiObject {
    protected ExperimentalClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ExperimentalClass(final java.lang.String readonlyString, @javax.annotation.Nullable final java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber });
    }
    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public ExperimentalClass(final java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void method() {
        this.jsiiCall("method", Void.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @javax.annotation.Nullable
    public java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMutableProperty(@javax.annotation.Nullable final java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
