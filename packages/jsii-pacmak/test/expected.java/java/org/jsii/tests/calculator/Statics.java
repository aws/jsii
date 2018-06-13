package org.jsii.tests.calculator;
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii$jsii_calc$.Statics")
public class Statics extends org.jsii.JsiiObject {
    protected Statics(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    static {
        FOO = org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "Foo", java.lang.String.class);
        BAR = org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "BAR", java.lang.Number.class);
        ZOO_BAR = org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "zooBar", java.util.Map.class);
        CONST_OBJ = org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "ConstObj", org.jsii.tests.calculator.DoubleTrouble.class);
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
    public final static java.lang.String FOO;
    /**
     * Constants may also use all-caps.
     */
    public final static java.lang.Number BAR;
    /**
     * Constants can also use camelCase.
     */
    public final static java.util.Map<java.lang.String, java.lang.String> ZOO_BAR;
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static org.jsii.tests.calculator.Statics getInstance() {
        return org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "instance", org.jsii.tests.calculator.Statics.class);
    }
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static void setInstance(final org.jsii.tests.calculator.Statics value) {
        org.jsii.JsiiObject.jsiiStaticSet(org.jsii.tests.calculator.Statics.class, "instance", value);
    }
    public static java.lang.Number getNonConstStatic() {
        return org.jsii.JsiiObject.jsiiStaticGet(org.jsii.tests.calculator.Statics.class, "nonConstStatic", java.lang.Number.class);
    }
    public static void setNonConstStatic(final java.lang.Number value) {
        org.jsii.JsiiObject.jsiiStaticSet(org.jsii.tests.calculator.Statics.class, "nonConstStatic", value);
    }
    public final static org.jsii.tests.calculator.DoubleTrouble CONST_OBJ;
}
