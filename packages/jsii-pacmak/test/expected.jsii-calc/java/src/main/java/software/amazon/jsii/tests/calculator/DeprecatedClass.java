package software.amazon.jsii.tests.calculator;

/**
 *  (deprecated)
 * <p>
 * @deprecated a pretty boring class
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DeprecatedClass")
public class DeprecatedClass extends software.amazon.jsii.JsiiObject {

    protected DeprecatedClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DeprecatedClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated this constructor is "just" okay
     * @param readonlyString This parameter is required.
     * @param mutableNumber
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public DeprecatedClass(final @org.jetbrains.annotations.NotNull java.lang.String readonlyString, final @org.jetbrains.annotations.Nullable java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber });
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated this constructor is "just" okay
     * @param readonlyString This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public DeprecatedClass(final @org.jetbrains.annotations.NotNull java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") });
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated it was a bad idea
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public void method() {
        this.jsiiCall("method", software.amazon.jsii.NativeType.VOID);
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated this is not always "wazoo", be ready to be disappointed
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public @org.jetbrains.annotations.NotNull java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated shouldn't have been mutable
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public @org.jetbrains.annotations.Nullable java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     *  (deprecated)
     * <p>
     * @deprecated shouldn't have been mutable
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public void setMutableProperty(final @org.jetbrains.annotations.Nullable java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
