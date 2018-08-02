package software.amazon.jsii.tests.calculator;
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralToNativeClass")
public class JSObjectLiteralToNativeClass extends software.amazon.jsii.JsiiObject {
    protected JSObjectLiteralToNativeClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralToNativeClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String getPropA() {
        return this.jsiiGet("propA", java.lang.String.class);
    }
    public void setPropA(final java.lang.String value) {
        this.jsiiSet("propA", java.util.Objects.requireNonNull(value, "propA is required"));
    }
    public java.lang.Number getPropB() {
        return this.jsiiGet("propB", java.lang.Number.class);
    }
    public void setPropB(final java.lang.Number value) {
        this.jsiiSet("propB", java.util.Objects.requireNonNull(value, "propB is required"));
    }
}
