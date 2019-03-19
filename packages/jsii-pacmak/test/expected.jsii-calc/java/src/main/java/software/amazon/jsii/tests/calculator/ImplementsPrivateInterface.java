package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ImplementsPrivateInterface")
public class ImplementsPrivateInterface extends software.amazon.jsii.JsiiObject {
    protected ImplementsPrivateInterface(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ImplementsPrivateInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.String getPrivate() {
        return this.jsiiGet("private", java.lang.String.class);
    }

    public void setPrivate(final java.lang.String value) {
        this.jsiiSet("private", java.util.Objects.requireNonNull(value, "private is required"));
    }
}
