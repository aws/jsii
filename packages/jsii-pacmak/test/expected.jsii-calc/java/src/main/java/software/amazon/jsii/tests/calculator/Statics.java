package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Statics")
public class Statics extends software.amazon.jsii.JsiiObject {
    protected Statics(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    static {
        BAR = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "BAR", java.lang.Number.class);
        CONST_OBJ = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "ConstObj", software.amazon.jsii.tests.calculator.DoubleTrouble.class);
        FOO = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "Foo", java.lang.String.class);
        ZOO_BAR = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "zooBar", java.util.Map.class);
    }
    public Statics(final java.lang.String value) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(java.util.Objects.requireNonNull(value, "value is required")).toArray());
    }
    /**
     * Jsdocs for static method
     * @param name The name of the person to say hello to
     */
    public static java.lang.String staticMethod(final java.lang.String name) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.Statics.class, "staticMethod", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(name, "name is required")).toArray());
    }
    public java.lang.String justMethod() {
        return this.jsiiCall("justMethod", java.lang.String.class);
    }
    /**
     * Constants may also use all-caps.
     */
    public final static java.lang.Number BAR;
    public final static software.amazon.jsii.tests.calculator.DoubleTrouble CONST_OBJ;
    /**
     * Jsdocs for static property.
     */
    public final static java.lang.String FOO;
    /**
     * Constants can also use camelCase.
     */
    public final static java.util.Map<java.lang.String, java.lang.String> ZOO_BAR;
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static software.amazon.jsii.tests.calculator.Statics getInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "instance", software.amazon.jsii.tests.calculator.Statics.class);
    }
    /**
     * Jsdocs for static getter.
     * Jsdocs for static setter.
     */
    public static void setInstance(final software.amazon.jsii.tests.calculator.Statics value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.Statics.class, "instance", java.util.Objects.requireNonNull(value, "instance is required"));
    }
    public static java.lang.Number getNonConstStatic() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.Statics.class, "nonConstStatic", java.lang.Number.class);
    }
    public static void setNonConstStatic(final java.lang.Number value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.Statics.class, "nonConstStatic", java.util.Objects.requireNonNull(value, "nonConstStatic is required"));
    }
    public java.lang.String getValue() {
        return this.jsiiGet("value", java.lang.String.class);
    }
}
