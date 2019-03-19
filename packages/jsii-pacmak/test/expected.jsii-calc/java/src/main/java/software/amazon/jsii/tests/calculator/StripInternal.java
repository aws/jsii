package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StripInternal")
public class StripInternal extends software.amazon.jsii.JsiiObject {
    protected StripInternal(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public StripInternal() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.String getYouSeeMe() {
        return this.jsiiGet("youSeeMe", java.lang.String.class);
    }

    public void setYouSeeMe(final java.lang.String value) {
        this.jsiiSet("youSeeMe", java.util.Objects.requireNonNull(value, "youSeeMe is required"));
    }
}
