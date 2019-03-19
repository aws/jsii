package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ImplementsInterfaceWithInternal")
public class ImplementsInterfaceWithInternal extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithInternal {
    protected ImplementsInterfaceWithInternal(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public ImplementsInterfaceWithInternal() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    @Override
    public void visible() {
        this.jsiiCall("visible", Void.class);
    }
}
