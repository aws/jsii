package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Thrower")
public class Thrower extends software.amazon.jsii.JsiiObject {
    protected Thrower(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Thrower() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public void throwError() {
        this.jsiiCall("throwError", Void.class);
    }
}
