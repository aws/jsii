package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.OverrideReturnsObject")
public class OverrideReturnsObject extends org.jsii.JsiiObject {
    protected OverrideReturnsObject(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public OverrideReturnsObject() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.Number test(final org.jsii.tests.calculator.ReturnsNumber obj) {
        return this.jsiiCall("test", java.lang.Number.class, java.util.stream.Stream.of(obj).toArray());
    }
}
