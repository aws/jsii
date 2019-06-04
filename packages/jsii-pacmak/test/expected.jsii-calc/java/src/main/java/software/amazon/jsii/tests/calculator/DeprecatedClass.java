package software.amazon.jsii.tests.calculator;

/**
 * This tests code generation of deprecation markers.
 * 
 * @deprecated without replacement
 */
@Deprecated
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DeprecatedClass")
public class DeprecatedClass extends software.amazon.jsii.JsiiObject {
    protected DeprecatedClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * @deprecated this is unsafe
     * @param argument some string.
     */
    @Deprecated
    public DeprecatedClass(@javax.annotation.Nullable final java.lang.String argument) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { argument });
    }
    /**
     * @deprecated this is unsafe
     */
    @Deprecated
    public DeprecatedClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @deprecated throws unexpected errors
     */
    @Deprecated
    public void deprecatedMethod() {
        this.jsiiCall("deprecatedMethod", Void.class);
    }

    /**
     * @deprecated intentionally
     */
    @Deprecated
    public java.lang.String getDeprecatedAttribute() {
        return this.jsiiGet("deprecatedAttribute", java.lang.String.class);
    }

    /**
     * @deprecated can be unexpectedly non-null!
     */
    @Deprecated
    @javax.annotation.Nullable
    protected java.lang.String getDeprecatedProtected() {
        return this.jsiiGet("deprecatedProtected", java.lang.String.class);
    }

    /**
     * @deprecated can be unexpectedly non-null!
     */
    @Deprecated
    protected void setDeprecatedProtected(@javax.annotation.Nullable final java.lang.String value) {
        this.jsiiSet("deprecatedProtected", value);
    }
}
