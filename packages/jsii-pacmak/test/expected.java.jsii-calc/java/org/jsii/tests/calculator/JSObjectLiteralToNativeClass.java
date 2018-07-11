package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.JSObjectLiteralToNativeClass")
public class JSObjectLiteralToNativeClass extends org.jsii.JsiiObject {
    protected JSObjectLiteralToNativeClass(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public JSObjectLiteralToNativeClass() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String getPropA() {
        return this.jsiiGet("propA", java.lang.String.class);
    }
    public void setPropA(final java.lang.String value) {
        this.jsiiSet("propA", value);
    }
    public java.lang.Number getPropB() {
        return this.jsiiGet("propB", java.lang.Number.class);
    }
    public void setPropB(final java.lang.Number value) {
        this.jsiiSet("propB", value);
    }
}
