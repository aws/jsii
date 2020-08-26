package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AugmentableClass")
public class AugmentableClass extends software.amazon.jsii.JsiiObject {

    protected AugmentableClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AugmentableClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public AugmentableClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void methodOne() {
        this.jsiiCall("methodOne", software.amazon.jsii.NativeType.VOID);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void methodTwo() {
        this.jsiiCall("methodTwo", software.amazon.jsii.NativeType.VOID);
    }
}
