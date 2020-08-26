package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ImplementsInterfaceWithInternal")
public class ImplementsInterfaceWithInternal extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithInternal {

    protected ImplementsInterfaceWithInternal(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ImplementsInterfaceWithInternal(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public ImplementsInterfaceWithInternal() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public void visible() {
        this.jsiiCall("visible", software.amazon.jsii.NativeType.VOID);
    }
}
