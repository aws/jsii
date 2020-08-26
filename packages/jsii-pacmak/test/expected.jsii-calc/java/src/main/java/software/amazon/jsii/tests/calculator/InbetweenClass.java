package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InbetweenClass")
public class InbetweenClass extends software.amazon.jsii.tests.calculator.PublicClass implements software.amazon.jsii.tests.calculator.IPublicInterface2 {

    protected InbetweenClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected InbetweenClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public InbetweenClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @Override
    public @org.jetbrains.annotations.NotNull java.lang.String ciao() {
        return this.jsiiCall("ciao", java.lang.String.class);
    }
}
