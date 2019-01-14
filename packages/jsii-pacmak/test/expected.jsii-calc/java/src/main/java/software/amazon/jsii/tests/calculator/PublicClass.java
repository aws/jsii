package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.PublicClass")
public class PublicClass extends software.amazon.jsii.JsiiObject {
    protected PublicClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public PublicClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public void hello() {
        this.jsiiCall("hello", Void.class);
    }
}
