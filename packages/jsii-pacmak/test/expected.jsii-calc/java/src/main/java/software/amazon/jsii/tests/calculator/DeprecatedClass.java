package software.amazon.jsii.tests.calculator;

/**
 * This tests code generation of deprecation markers.
 * 
 * @deprecated without replacement
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
     * @deprecated this is unsafe
     * @param argument some string.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass(@javax.annotation.Nullable final java.lang.String argument) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { argument });
    }
    /**
     * @deprecated this is unsafe
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @deprecated throws unexpected errors
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void deprecatedMethod() {
        this.jsiiCall("deprecatedMethod", Void.class);
    }

    /**
     * @deprecated intentionally
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public java.lang.String getDeprecatedAttribute() {
        return this.jsiiGet("deprecatedAttribute", java.lang.String.class);
    }

    /**
     * @deprecated can be unexpectedly non-null!
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @javax.annotation.Nullable
    protected java.lang.String getDeprecatedProtected() {
        return this.jsiiGet("deprecatedProtected", java.lang.String.class);
    }

    /**
     * @deprecated can be unexpectedly non-null!
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    protected void setDeprecatedProtected(@javax.annotation.Nullable final java.lang.String value) {
        this.jsiiSet("deprecatedProtected", value);
    }
}
