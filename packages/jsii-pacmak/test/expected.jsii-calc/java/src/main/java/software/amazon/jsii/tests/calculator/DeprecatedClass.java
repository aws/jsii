package software.amazon.jsii.tests.calculator;

/**
 * @deprecated for the show
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DeprecatedClass")
public class DeprecatedClass extends software.amazon.jsii.JsiiObject {
    protected DeprecatedClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass(final java.lang.String readonlyString, @javax.annotation.Nullable final java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber });
    }
    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass(final java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") });
    }

    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void method() {
        this.jsiiCall("method", Void.class);
    }

    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @javax.annotation.Nullable
    public java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     * @deprecated for the show
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void setMutableProperty(@javax.annotation.Nullable final java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
