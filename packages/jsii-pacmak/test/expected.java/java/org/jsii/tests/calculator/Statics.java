package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Statics")
public class Statics extends org.jsii.JsiiObject {
    protected Statics(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Statics(final java.lang.String value) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(value).toArray());
    }
    /**
     * Jsdocs for static method
     * @param name The name of the person to say hello to
     */
    public static java.lang.String staticMethod(final java.lang.String name) {
        return org.jsii.JsiiObject.jsiiStaticCall(org.jsii.tests.calculator.Statics.class, "staticMethod", java.lang.String.class, java.util.stream.Stream.of(name).toArray());
    }
    public java.lang.String justMethod() {
        return this.jsiiCall("justMethod", java.lang.String.class);
    }
    public java.lang.String getValue() {
        return this.jsiiGet("value", java.lang.String.class);
    }
    /**
     * Jsdocs for static property.
     */
    public static java.lang.String getFoo() {
        return org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "Foo", java.lang.String.class);
    }
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static org.jsii.tests.calculator.Statics getInstance() {
        return org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "Instance", org.jsii.tests.calculator.Statics.class);
    }
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static void setInstance(final org.jsii.tests.calculator.Statics value) {
        org.jsii.JsiiObject.jsiiStaticSet(org.jsii.tests.calculator.Statics.class, "Instance", value);
    }
}
