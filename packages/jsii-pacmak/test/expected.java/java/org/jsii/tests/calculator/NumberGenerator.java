package org.jsii.tests.calculator;
/**
 * This allows us to test that a reference can be stored for objects that
 * implement interfaces.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.NumberGenerator")
public class NumberGenerator extends org.jsii.JsiiObject {
    protected NumberGenerator(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public NumberGenerator(final org.jsii.tests.calculator.IRandomNumberGenerator generator) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(generator).toArray());
    }
    public java.lang.Number nextTimes100() {
        return this.jsiiCall("nextTimes100", java.lang.Number.class);
    }
    public java.lang.Boolean isSameGenerator(final org.jsii.tests.calculator.IRandomNumberGenerator gen) {
        return this.jsiiCall("isSameGenerator", java.lang.Boolean.class, java.util.stream.Stream.of(gen).toArray());
    }
    public org.jsii.tests.calculator.IRandomNumberGenerator getGenerator() {
        return this.jsiiGet("generator", org.jsii.tests.calculator.IRandomNumberGenerator.class);
    }
    public void setGenerator(final org.jsii.tests.calculator.IRandomNumberGenerator value) {
        this.jsiiSet("generator", value);
    }
}
