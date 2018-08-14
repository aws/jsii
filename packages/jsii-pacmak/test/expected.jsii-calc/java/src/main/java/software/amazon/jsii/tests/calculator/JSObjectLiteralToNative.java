package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralToNative")
public class JSObjectLiteralToNative extends software.amazon.jsii.JsiiObject {
    protected JSObjectLiteralToNative(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralToNative() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass returnLiteral() {
        return this.jsiiCall("returnLiteral", software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass.class);
    }
}
