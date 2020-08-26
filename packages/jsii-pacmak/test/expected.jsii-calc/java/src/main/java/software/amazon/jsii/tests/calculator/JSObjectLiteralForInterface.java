package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralForInterface")
public class JSObjectLiteralForInterface extends software.amazon.jsii.JsiiObject {

    protected JSObjectLiteralForInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSObjectLiteralForInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public JSObjectLiteralForInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.lib.IFriendly giveMeFriendly() {
        return this.jsiiCall("giveMeFriendly", software.amazon.jsii.tests.calculator.lib.IFriendly.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator giveMeFriendlyGenerator() {
        return this.jsiiCall("giveMeFriendlyGenerator", software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator.class);
    }
}
