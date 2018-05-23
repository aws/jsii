package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Thrower")
public class Thrower extends org.jsii.JsiiObject {
    protected Thrower(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Thrower() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public void throwError() {
        this.jsiiCall("throwError", Void.class);
    }
}
