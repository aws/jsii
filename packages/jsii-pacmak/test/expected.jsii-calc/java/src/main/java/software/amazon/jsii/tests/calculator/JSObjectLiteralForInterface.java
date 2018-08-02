package software.amazon.jsii.tests.calculator;
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralForInterface")
public class JSObjectLiteralForInterface extends software.amazon.jsii.JsiiObject {
    protected JSObjectLiteralForInterface(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralForInterface() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public software.amazon.jsii.tests.calculator.lib.IFriendly giveMeFriendly() {
        return this.jsiiCall("giveMeFriendly", software.amazon.jsii.tests.calculator.lib.IFriendly.class);
    }
    public software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator giveMeFriendlyGenerator() {
        return this.jsiiCall("giveMeFriendlyGenerator", software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator.class);
    }
}
