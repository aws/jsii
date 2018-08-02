package org.jsii.tests.calculator;
/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.UseCalcBase")
public class UseCalcBase extends org.jsii.JsiiObject {
    protected UseCalcBase(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public UseCalcBase() {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public org.jsii.tests.calculator.base.Base hello() {
        return this.jsiiCall("hello", org.jsii.tests.calculator.base.Base.class);
    }
}
