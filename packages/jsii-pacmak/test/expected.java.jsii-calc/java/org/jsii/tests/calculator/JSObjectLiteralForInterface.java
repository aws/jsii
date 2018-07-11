package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralForInterface")
public class JSObjectLiteralForInterface extends org.jsii.JsiiObject {
    protected JSObjectLiteralForInterface(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralForInterface() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public org.jsii.tests.calculator.lib.IFriendly giveMeFriendly() {
        return this.jsiiCall("giveMeFriendly", org.jsii.tests.calculator.lib.IFriendly.class);
    }
    public org.jsii.tests.calculator.IFriendlyRandomGenerator giveMeFriendlyGenerator() {
        return this.jsiiCall("giveMeFriendlyGenerator", org.jsii.tests.calculator.IFriendlyRandomGenerator.class);
    }
}
