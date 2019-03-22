package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InbetweenClass")
public class InbetweenClass extends software.amazon.jsii.tests.calculator.PublicClass implements software.amazon.jsii.tests.calculator.IPublicInterface2 {
    protected InbetweenClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public InbetweenClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @Override
    public java.lang.String ciao() {
        return this.jsiiCall("ciao", java.lang.String.class);
    }
}
