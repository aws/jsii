package org.jsii.tests.calculator;
/**
 * The negation operation ("-value")
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Negate")
public class Negate extends org.jsii.tests.calculator.UnaryOperation implements org.jsii.tests.calculator.IFriendlier {
    protected Negate(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Negate(final org.jsii.tests.calculator.lib.Value operand) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(operand).toArray());
    }
    /**
     * String representation of the value.
     */
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }
    /**
     * Say hello!
     */
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }
    /**
     * Say goodbye.
     */
    public java.lang.String goodbye() {
        return this.jsiiCall("goodbye", java.lang.String.class);
    }
    /**
     * Say farewell.
     */
    public java.lang.String farewell() {
        return this.jsiiCall("farewell", java.lang.String.class);
    }
    /**
     * The value.
     */
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
