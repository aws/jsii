package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AugmentableClass")
public class AugmentableClass extends software.amazon.jsii.JsiiObject {
    protected AugmentableClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AugmentableClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public void methodOne() {
        this.jsiiCall("methodOne", Void.class);
    }

    public void methodTwo() {
        this.jsiiCall("methodTwo", Void.class);
    }
}
