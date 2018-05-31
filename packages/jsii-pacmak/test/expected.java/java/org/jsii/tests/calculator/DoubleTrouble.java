package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.DoubleTrouble")
public class DoubleTrouble extends org.jsii.JsiiObject implements org.jsii.tests.calculator.IFriendlyRandomGenerator {
    protected DoubleTrouble(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DoubleTrouble() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    /**
     * Returns another random number.
     */
    public java.lang.Number next() {
        return this.jsiiCall("next", java.lang.Number.class);
    }
    /**
     * Say hello!
     */
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }
}
