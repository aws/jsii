package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.JSObjectLiteralToNative")
public class JSObjectLiteralToNative extends org.jsii.JsiiObject {
    protected JSObjectLiteralToNative(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralToNative() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public org.jsii.tests.calculator.JSObjectLiteralToNativeClass returnLiteral() {
        return this.jsiiCall("returnLiteral", org.jsii.tests.calculator.JSObjectLiteralToNativeClass.class);
    }
}
