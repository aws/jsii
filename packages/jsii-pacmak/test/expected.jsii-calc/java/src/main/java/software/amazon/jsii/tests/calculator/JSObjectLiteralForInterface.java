package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralForInterface")
public class JSObjectLiteralForInterface extends software.amazon.jsii.JsiiObject {

    protected JSObjectLiteralForInterface(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSObjectLiteralForInterface(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JSObjectLiteralForInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.IFriendly giveMeFriendly() {
        return this.jsiiCall("giveMeFriendly", software.amazon.jsii.tests.calculator.lib.IFriendly.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator giveMeFriendlyGenerator() {
        return this.jsiiCall("giveMeFriendlyGenerator", software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator.class);
    }
}
