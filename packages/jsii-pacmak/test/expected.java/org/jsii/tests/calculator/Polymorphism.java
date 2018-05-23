package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Polymorphism")
public class Polymorphism extends org.jsii.JsiiObject {
    protected Polymorphism(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Polymorphism() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String sayHello(final org.jsii.tests.calculator.lib.IFriendly friendly) {
        return this.jsiiCall("sayHello", java.lang.String.class, friendly);
    }
}
