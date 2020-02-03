package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralToNativeClass")
public class JSObjectLiteralToNativeClass extends software.amazon.jsii.JsiiObject {

    protected JSObjectLiteralToNativeClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSObjectLiteralToNativeClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JSObjectLiteralToNativeClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getPropA() {
        return this.jsiiGet("propA", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setPropA(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("propA", java.util.Objects.requireNonNull(value, "propA is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Number getPropB() {
        return this.jsiiGet("propB", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setPropB(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        this.jsiiSet("propB", java.util.Objects.requireNonNull(value, "propB is required"));
    }
}
