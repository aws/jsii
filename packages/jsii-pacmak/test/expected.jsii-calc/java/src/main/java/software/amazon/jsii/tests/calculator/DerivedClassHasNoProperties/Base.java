package software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedClassHasNoProperties.Base")
public class Base extends software.amazon.jsii.JsiiObject {
    protected Base(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Base() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String getProp() {
        return this.jsiiGet("prop", java.lang.String.class);
    }
    public void setProp(final java.lang.String value) {
        this.jsiiSet("prop", java.util.Objects.requireNonNull(value, "prop is required"));
    }
}
