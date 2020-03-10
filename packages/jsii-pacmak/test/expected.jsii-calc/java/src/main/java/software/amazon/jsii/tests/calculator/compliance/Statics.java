package software.amazon.jsii.tests.calculator.compliance;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.Statics")
public class Statics extends software.amazon.jsii.JsiiObject {

    protected Statics(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Statics(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    static {
        BAR = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "BAR", java.lang.Number.class);
        CONST_OBJ = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "ConstObj", software.amazon.jsii.tests.calculator.compliance.DoubleTrouble.class);
        FOO = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "Foo", java.lang.String.class);
        ZOO_BAR = java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "zooBar", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class))));
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param value This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Statics(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Jsdocs for static method.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @param name The name of the person to say hello to. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.lang.String staticMethod(final @org.jetbrains.annotations.NotNull java.lang.String name) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.Statics.class, "staticMethod", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(name, "name is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String justMethod() {
        return this.jsiiCall("justMethod", java.lang.String.class);
    }

    /**
     * Constants may also use all-caps.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static java.lang.Number BAR;

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static software.amazon.jsii.tests.calculator.compliance.DoubleTrouble CONST_OBJ;

    /**
     * Jsdocs for static property.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static java.lang.String FOO;

    /**
     * Constants can also use camelCase.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public final static java.util.Map<java.lang.String, java.lang.String> ZOO_BAR;

    /**
     * Jsdocs for static getter.
     * <p>
     * Jsdocs for static setter.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.Statics getInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "instance", software.amazon.jsii.tests.calculator.compliance.Statics.class);
    }

    /**
     * Jsdocs for static getter.
     * <p>
     * Jsdocs for static setter.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void setInstance(final @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.Statics value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "instance", java.util.Objects.requireNonNull(value, "instance is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.lang.Number getNonConstStatic() {
        return software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "nonConstStatic", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static void setNonConstStatic(final @org.jetbrains.annotations.NotNull java.lang.Number value) {
        software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.calculator.compliance.Statics.class, "nonConstStatic", java.util.Objects.requireNonNull(value, "nonConstStatic is required"));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getValue() {
        return this.jsiiGet("value", java.lang.String.class);
    }
}
